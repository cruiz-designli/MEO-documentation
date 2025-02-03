import React from "react";
import { useColorMode } from '@docusaurus/theme-common'; //docs: https://v2.docusaurus.io/docs/2.0.0-alpha.69/theme-classic#usethemecontext
import useBaseUrl from '@docusaurus/useBaseUrl';

const ImageSwitcher = ({ lightImageSrc, darkImageSrc }) => {
	const { colorMode, setColorMode } = useColorMode();

	return (
		<img
			class="zoomable-image"
			src={useBaseUrl(colorMode === 'dark' ? darkImageSrc : lightImageSrc)}
		/>
	);
};

export default ImageSwitcher;
