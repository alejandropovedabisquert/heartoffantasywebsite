import { Titulo } from "./common/Titulo";
import GridVideo from "./GridVideo";

export default function VideosSection() {
    return (
        <div className="relative my-24">
            <div data-aos="fade-right">
                <Titulo as={"h2"} position="left" className="text-4xl font-bold my-4">Devblogs</Titulo>
            </div>
            <GridVideo/>
        </div>
    );
}
