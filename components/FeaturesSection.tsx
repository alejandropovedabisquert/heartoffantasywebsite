import { Titulo } from "./common/Titulo";

const features = [
    {
        title: "Permadeath",
        description: "Every decision counts. Die, and you lose everything: character, gear, and progress. A high-stakes system that rewards strategy and turns every win into a legend. Dare to risk it all? 🗡️"
    },
    {
        title: "World Crafting",
        description: "Shape the world: build towns, terraform landscapes, design dungeons, and leave your mark. The environment evolves based on community actions, making every server unique! 🌱"
    },
    {
        title: "Cyclic Boss",
        description: "Bosses grow stronger when defeated: they return with upgraded skills, shifting attack patterns, and exclusive rewards. The battle—and glory—never ends! ⚔️"
    },
    {
        title: "Wraparound Map",
        description: "A borderless world: reach the edge, and you reappear on the opposite side. Explore endlessly, uncover hidden paths, and face looping dangers. Geography is an eternal loop! 🔄"
    },
];

export default function FeaturesSection() {
    return (
        <div className="my-24">
            <div data-aos="fade-right">
                <Titulo as={"h2"} position="left" className="text-4xl font-bold my-4">Features</Titulo>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {
                    features.map((feature, index) => (
                        <div key={index} className="col-span-1" data-aos="fade-up" data-aos-delay={(index + 1) * 50}>
                            <h3 className="font-bold text-2xl">
                                {feature.title}
                            </h3>
                            <p>
                                {feature.description}
                            </p>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}