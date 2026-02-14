const HEART_V2_LAYERS = [
    { src: "/heart/capa0.webp", className: "animate-float-inner-right absolute w-full h-auto" },
    { src: "/heart/capa1.webp", className: "animate-float-inner-up-right absolute [animation-delay:220ms] w-full h-auto" },
    { src: "/heart/capa2.webp", className: "animate-float-inner-up-left absolute [animation-delay:190ms] w-full h-auto" },
    { src: "/heart/capa3.webp", className: "animate-float-inner-left absolute [animation-delay:320ms] w-full h-auto" },
    { src: "/heart/capa4.webp", className: "animate-float-inner-down-left absolute [animation-delay:450ms] w-full h-auto" },
    { src: "/heart/capa5.webp", className: "animate-float-inner-down absolute [animation-delay:120ms] w-full h-auto" },
    { src: "/heart/capa6.webp", className: "animate-float-down absolute [animation-delay:370ms] [animation-duration:11000ms] w-full h-auto" },
    { src: "/heart/capa7.webp", className: "animate-float-down-left absolute [animation-delay:500ms] [animation-duration:10500ms] w-full h-auto" },
    { src: "/heart/capa8.webp", className: "animate-float-down-left absolute [animation-delay:250ms] [animation-duration:12000ms] w-full h-auto" },
    { src: "/heart/capa9.webp", className: "animate-float-down-left absolute [animation-delay:40ms] [animation-duration:10000ms] w-full h-auto" },
    { src: "/heart/capa10.webp", className: "animate-float-down-left absolute [animation-delay:250ms] [animation-duration:11400ms] w-full h-auto" },
    { src: "/heart/capa11.webp", className: "animate-float-down-left absolute [animation-delay:300ms] [animation-duration:10600ms] w-full h-auto" },
    { src: "/heart/capa12.webp", className: "animate-float-down-left absolute [animation-delay:150ms] [animation-duration:9600ms] w-full h-auto" },
    { src: "/heart/capa13.webp", className: "animate-float-down-left absolute [animation-delay:600ms] [animation-duration:9900ms] w-full h-auto" },
    { src: "/heart/capa14.webp", className: "animate-float-down-left absolute [animation-delay:250ms] [animation-duration:10400ms] w-full h-auto" },
    { src: "/heart/capa15.webp", className: "animate-float-down-left absolute [animation-delay:300ms] [animation-duration:11100ms] w-full h-auto" },
    { src: "/heart/capa16.webp", className: "animate-float-down-left absolute [animation-delay:450ms] [animation-duration:10200ms] w-full h-auto" },
    { src: "/heart/capa17.webp", className: "animate-float-down-left absolute [animation-delay:100ms] [animation-duration:10500ms] w-full h-auto" },
    { src: "/heart/capa18.webp", className: "animate-float-left absolute [animation-delay:550ms] [animation-duration:10600ms] w-full h-auto" },
    { src: "/heart/capa19.webp", className: "animate-float-left absolute [animation-delay:300ms] [animation-duration:10200ms] w-full h-auto" },
    { src: "/heart/capa20.webp", className: "animate-float-left absolute [animation-delay:650ms] [animation-duration:10700ms] w-full h-auto" },
    { src: "/heart/capa21.webp", className: "animate-float-left absolute [animation-delay:200ms] [animation-duration:10100ms] w-full h-auto" },
    { src: "/heart/capa22.webp", className: "animate-float-up-left absolute [animation-delay:250ms] [animation-duration:11300ms] w-full h-auto" },
    { src: "/heart/capa23.webp", className: "animate-float-up-left absolute [animation-delay:200ms] [animation-duration:10600ms] w-full h-auto" },
    { src: "/heart/capa24.webp", className: "animate-float-down-right absolute [animation-delay:150ms] [animation-duration:11200ms] w-full h-auto" },
    { src: "/heart/capa25.webp", className: "animate-float-down-right absolute [animation-delay:100ms] [animation-duration:10700ms] w-full h-auto" },
    { src: "/heart/capa26.webp", className: "animate-float-down-right absolute [animation-delay:150ms] [animation-duration:11000ms] w-full h-auto" },
    { src: "/heart/capa27.webp", className: "animate-float-down-right absolute [animation-delay:200ms] [animation-duration:10500ms] w-full h-auto" },
    { src: "/heart/capa28.webp", className: "animate-float-down-right absolute [animation-delay:250ms] [animation-duration:10900ms] w-full h-auto" },
    { src: "/heart/capa29.webp", className: "animate-float-right absolute [animation-delay:200ms] [animation-duration:10300ms] w-full h-auto" },
    { src: "/heart/capa30.webp", className: "animate-float-right absolute [animation-delay:150ms] [animation-duration:10000ms] w-full h-auto" },
    { src: "/heart/capa31.webp", className: "animate-float-up-right absolute [animation-delay:100ms] [animation-duration:10600ms] w-full h-auto" },
    { src: "/heart/capa32.webp", className: "animate-float-right absolute [animation-delay:150ms] [animation-duration:10700ms] w-full h-auto" },
    { src: "/heart/capa33.webp", className: "animate-float-up-right absolute [animation-delay:200ms] [animation-duration:10100ms] w-full h-auto" },
    { src: "/heart/capa34.webp", className: "animate-float-up-right absolute [animation-delay:250ms] [animation-duration:11000ms] w-full h-auto" },
    { src: "/heart/capa35.webp", className: "animate-float-up-right absolute [animation-delay:200ms] [animation-duration:10800ms] w-full h-auto" },
    { src: "/heart/capa36.webp", className: "animate-float-up-right absolute [animation-delay:150ms] [animation-duration:11300ms] w-full h-auto" },
    { src: "/heart/capa37.webp", className: "animate-float-up-right absolute [animation-delay:100ms] [animation-duration:10900ms] w-full h-auto" },
    { src: "/heart/capa38.webp", className: "animate-float-up-right absolute [animation-delay:150ms] [animation-duration:10300ms] w-full h-auto" },
    { src: "/heart/capa39.webp", className: "animate-float-up-right absolute [animation-delay:100ms] [animation-duration:10700ms] w-full h-auto" },
    { src: "/heart/capa40.webp", className: "animate-float-up-right absolute [animation-delay:150ms] [animation-duration:10500ms] w-full h-auto" },
    { src: "/heart/capa41.webp", className: "animate-float-up-right absolute [animation-delay:200ms] [animation-duration:10400ms] w-full h-auto" },
];

export default function HeartV2() {
    return (
        <div className="relative heart">
            {HEART_V2_LAYERS.map((layer, index) => (
                <img
                    key={index}
                    src={layer.src}
                    alt=""
                    className={layer.className}
                />
            ))}
        </div>
    );
}
