import {Story} from "../interfaces";
import {useEffect, useState} from "react"


// Caches given Story[] using HTMLImageElement and HTMLVideoElement
const cacheContent = async (contents) => {
	const promises = contents.map((content) => {
		return new Promise(function (resolve, reject) {
			if(!content.url) return

			if(content.type === 'video') {
				const video = document.createElement('video');
				video.src = content.url;
				video.onloadeddata = resolve;
				video.onerror = reject;
				return;
			}

			const img = new Image();
			img.src = content.url;
			img.onload = resolve;
			img.onerror = reject;

		})
	})

	await Promise.all(promises);
}

// Keeps track of urls that have been loaded
const urlsLoaded = new Set<string>();

// Pushes urls to urlsLoaded
const markUrlsLoaded = (contents: Content[]) => {
	contents.forEach((content) => {
		urlsLoaded.add(content.url)
	})
}


// Returns true if given Story should be preloaded
type Content = {url: string, type: string, preloadResource: boolean}

const shouldPreload = (content: Content) => {
	if (!content.url) return false
	if (urlsLoaded.has(content.url)) return false
	if (content.preloadResource !== undefined) return content.preloadResource
	if (content.type === 'video') return false

	return true
}

// Preloads images and videos from given Story[] using a cursor and preloadCount
// Preload count is the number of images/videos to preload after the cursor
// Cursor is the current index to start preloading from
export const usePreLoader = (contents: Content[]) => {

	const [didPreload, setDidPreload] = useState(false)

	useEffect(() => {

		markUrlsLoaded(contents)
		cacheContent(contents).then(() => {
			setDidPreload(true)
		})
	}, [contents])


	return {didPreload}
}
