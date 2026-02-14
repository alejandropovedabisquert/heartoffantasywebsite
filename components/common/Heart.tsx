const HEART_LAYERS = [
    { src: "/heart/capa0.webp", className: "animate-float-up-less absolute [animation-delay:210ms]" },
    { src: "/heart/capa1.webp", className: "animate-float-up-less absolute [animation-delay:430ms]" },
    { src: "/heart/capa2.webp", className: "animate-float-up-less absolute [animation-delay:190ms]" },
    { src: "/heart/capa3.webp", className: "animate-float-up-less absolute [animation-delay:320ms]" },
    { src: "/heart/capa4.webp", className: "animate-float-up-less absolute [animation-delay:450ms]" },
    { src: "/heart/capa5.webp", className: "animate-float-up-less absolute [animation-delay:120ms]" },
    { src: "/heart/capa6.webp", className: "animate-float-up-less absolute [animation-delay:370ms]" },
    { src: "/heart/capa7.webp", className: "animate-float-up absolute [animation-delay:500ms] [animation-duration:2000ms]" },
    { src: "/heart/capa8.webp", className: "animate-float-up absolute [animation-delay:250ms] [animation-duration:2500ms]" },
    { src: "/heart/capa9.webp", className: "animate-float-up absolute [animation-delay:40ms] [animation-duration:2200ms]" },
    { src: "/heart/capa10.webp", className: "animate-float-up absolute [animation-delay:250ms] [animation-duration:3000ms]" },
    { src: "/heart/capa11.webp", className: "animate-float-up absolute [animation-delay:300ms] [animation-duration:2300ms]" },
    { src: "/heart/capa12.webp", className: "animate-float-up absolute [animation-delay:150ms] [animation-duration:2100ms]" },
    { src: "/heart/capa13.webp", className: "animate-float-up absolute [animation-delay:600ms] [animation-duration:2800ms]" },
    { src: "/heart/capa14.webp", className: "animate-float-up absolute [animation-delay:250ms] [animation-duration:2700ms]" },
    { src: "/heart/capa15.webp", className: "animate-float-up absolute [animation-delay:300ms] [animation-duration:2600ms]" },
    { src: "/heart/capa16.webp", className: "animate-float-up absolute [animation-delay:450ms] [animation-duration:2400ms]" },
    { src: "/heart/capa17.webp", className: "animate-float-up absolute [animation-delay:100ms] [animation-duration:2500ms]" },
    { src: "/heart/capa18.webp", className: "animate-float-up absolute [animation-delay:550ms] [animation-duration:2900ms]" },
    { src: "/heart/capa19.webp", className: "animate-float-up absolute [animation-delay:300ms] [animation-duration:2700ms]" },
    { src: "/heart/capa20.webp", className: "animate-float-up absolute [animation-delay:650ms] [animation-duration:3000ms]" },
    { src: "/heart/capa21.webp", className: "animate-float-up absolute [animation-delay:200ms] [animation-duration:2200ms]" },
    { src: "/heart/capa22.webp", className: "animate-float-up absolute [animation-delay:250ms] [animation-duration:2400ms]" },
    { src: "/heart/capa23.webp", className: "animate-float-up absolute [animation-delay:200ms] [animation-duration:2300ms]" },
    { src: "/heart/capa24.webp", className: "animate-float-up absolute [animation-delay:150ms] [animation-duration:2100ms]" },
    { src: "/heart/capa25.webp", className: "animate-float-up absolute [animation-delay:100ms] [animation-duration:2200ms]" },
    { src: "/heart/capa26.webp", className: "animate-float-up absolute [animation-delay:150ms] [animation-duration:2300ms]" },
    { src: "/heart/capa27.webp", className: "animate-float-up absolute [animation-delay:200ms] [animation-duration:2500ms]" },
    { src: "/heart/capa28.webp", className: "animate-float-up absolute [animation-delay:250ms] [animation-duration:2600ms]" },
    { src: "/heart/capa29.webp", className: "animate-float-up absolute [animation-delay:200ms] [animation-duration:2400ms]" },
    { src: "/heart/capa30.webp", className: "animate-float-up absolute [animation-delay:150ms] [animation-duration:2200ms]" },
    { src: "/heart/capa31.webp", className: "animate-float-up absolute [animation-delay:100ms] [animation-duration:2100ms]" },
    { src: "/heart/capa32.webp", className: "animate-float-up absolute [animation-delay:150ms] [animation-duration:2200ms]" },
    { src: "/heart/capa33.webp", className: "animate-float-up absolute [animation-delay:200ms] [animation-duration:2300ms]" },
    { src: "/heart/capa34.webp", className: "animate-float-up absolute [animation-delay:250ms] [animation-duration:2500ms]" },
    { src: "/heart/capa35.webp", className: "animate-float-up absolute [animation-delay:200ms] [animation-duration:2700ms]" },
    { src: "/heart/capa36.webp", className: "animate-float-up absolute [animation-delay:150ms] [animation-duration:2800ms]" },
    { src: "/heart/capa37.webp", className: "animate-float-up absolute [animation-delay:100ms] [animation-duration:2900ms]" },
    { src: "/heart/capa38.webp", className: "animate-float-up absolute [animation-delay:150ms] [animation-duration:3000ms]" },
    { src: "/heart/capa39.webp", className: "animate-float-up absolute [animation-delay:100ms] [animation-duration:2500ms]" },
    { src: "/heart/capa40.webp", className: "animate-float-up absolute [animation-delay:150ms] [animation-duration:2400ms]" },
    { src: "/heart/capa41.webp", className: "animate-float-up absolute [animation-delay:200ms] [animation-duration:2200ms]" },
];

export default function Heart() {
    return (
        <div className="relative">
            {HEART_LAYERS.map((layer, index) => (
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
