import { micromark } from 'micromark'
import { gfm, gfmHtml } from 'micromark-extension-gfm'

const stringToMarkdown = (string: string) => {
	const parsedMarkdown = micromark(string, {
		extensions: [gfm()],
		htmlExtensions: [gfmHtml()],
	})
	return parsedMarkdown
}

export { stringToMarkdown }
