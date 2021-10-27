import React from "react";

const Heart = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="currentColor"
		className="bi bi-heart-fill"
		viewBox="0 0 16 16"
	>
		<defs>
			<linearGradient
				id="heartGradient"
				x1="100%"
				y1="0%"
				x2="0%"
				y2="100%"
				spreadMethod="pad"
			>
				<stop offset="0%" stopColor="#02df8a" />
				<stop offset="100%" stopColor="#66f0e1" />
			</linearGradient>
		</defs>
		<path
			fill="url(#heartGradient)"
			fillRule="evenodd"
			d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
		/>
	</svg>
);

export default Heart;
