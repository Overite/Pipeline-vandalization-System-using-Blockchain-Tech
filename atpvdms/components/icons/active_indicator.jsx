export default function Active_Indicator() {
    return (
        <svg className="w-full h-full" viewBox="0 0 79 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M39.134 20.3638C39.5189 19.6971 40.4811 19.6971 40.866 20.3638L42.1651 22.6138C42.55 23.2804 42.0688 24.1138 41.299 24.1138L38.701 24.1138C37.9312 24.1138 37.45 23.2804 37.8349 22.6138L39.134 20.3638Z" fill="white" />
            <g filter="url(#filter0_d_156_518)">
                <path d="M58.5 25.8638L20.5 25.8638C20.5 24.2069 21.8431 22.8638 23.5 22.8638L55.5 22.8638C57.1569 22.8638 58.5 24.2069 58.5 25.8638Z" fill="white" />
            </g>
            <defs>
                <filter id="filter0_d_156_518" x="0.5" y="0.86377" width="78" height="43" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feMorphology radius="1" operator="dilate" in="SourceAlpha" result="effect1_dropShadow_156_518" />
                    <feOffset dy="-2" />
                    <feGaussianBlur stdDeviation="9.5" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.87 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_156_518" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_156_518" result="shape" />
                </filter>
            </defs>
        </svg>

    )
}