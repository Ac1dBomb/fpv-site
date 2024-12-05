// src/app/page.tsx
import Image from "next/image";
import { useState } from "react";
import { Button, Card, Input, Spacer, Text, Container, Row, Col, Grid } from "@nextui-org/react";
import { motion, useAnimation } from "framer-motion";

export default function Home() {
  const [email, setEmail] = useState("");
  const controls = useAnimation()
  const droneModels = [
    {
      name: "Raptor X10",
      image: "/drone1.jpg",
      description: "Blazing fast racing drone.",
      keyFeatures: ["300mph", "4K Camera", "15min Flight"],
    },
    {
      name: "Phantom V5",
      image: "/drone2.jpg",
      description: "Stunning aerial photography.",
      keyFeatures: ["8K Camera", "30min Flight", "Stabilization"],
    },
    {
      name: "Hover Scout S2",
      image: "/drone3.jpg",
      description:
        "The perfect drone for beginners.",
      keyFeatures: ["720p camera", "10min Flight", "Easy Controls"],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, type: "easeInOut" }, // Improved transition
    },
  };

  const itemVariants = {
      hidden: {opacity: 0, scale:0.8},
      show: {opacity: 1, scale:1}
  }


  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 font-sans"> {/* Gradient background */}
      {/* Hero Section */}
      <section className="relative h-[600px] w-full overflow-hidden"> {/* Increased height */}
        <Image
          src="/hero.jpg"
          alt="FPV Drone"
          fill
          className="object-cover"
          priority
          quality={100} // Improved image quality
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent flex flex-col items-center justify-center text-white" // Gradient overlay
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <h1 className="text-6xl sm:text-8xl font-bold mb-4 text-shadow-lg">
            {/* Larger text, text shadow */}
            Experience Flight
          </h1>


        <motion.div
            variants={itemVariants}
        >
          <Input
            type="email"
            placeholder="Get Updates"
            className="w-80 md:w-96 mb-6 bg-gray-200/70 rounded-lg" // Improved styling
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            size="lg"
          />
        </motion.div>

        <motion.div
            variants={itemVariants}
        >
          <Button
            color="gradient"
            auto
            size="lg"
            className="text-lg shadow-lg"
            onClick={() => alert(`Subscribed with ${email}`)} // Placeholder alert
          > {/* Larger button, added shadow */}
            Subscribe
          </Button>
        </motion.div>


        </motion.div>
      </section>

      {/* Product Highlights */}
      <motion.div
          initial="hidden"
          whileInView="show"
          variants={{
              hidden: {opacity: 0},
              show: {
                  opacity: 1,
                  transition: {
                      staggerChildren: 0.15,
                      when:"beforeChildren"
                  }
              }
          }}
          viewport={{once: true}}

      >

      <Container className="py-12"> {/* Increased padding */}

        <Text h2 size="$3xl" className="mb-12 text-center font-bold">
           Featured Drones
        </Text>

        <Grid.Container gap={4} justify="center">
          {droneModels.map((model) => (
            <motion.div key={model.name} variants={containerVariants}>
            <Grid xs={12} sm={6} md={4}> {/* Responsive grid */}

              <Card isPressable className="p-4">

                <Card.Header>
                  <Image
                    src={model.image}
                    alt={model.name}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover rounded-md mb-2"
                  />
                  <Text h4 size="$2xl" className="text-center font-bold">
                    {model.name}
                  </Text>
                </Card.Header>
                <Card.Body>
                  <Text className="text-center">{model.description}</Text>
                <ul className="list-disc list-inside mt-2 text-center"> {/* Centered key features */}

                    {model.keyFeatures.map((feature) => (
                      <li key={feature} className="font-bold text-gray-700">
                        {feature}
                      </li>
                    ))}
                  </ul>
                </Card.Body>

                <Card.Footer className="justify-center">
                <Button size="sm" color="primary">Learn More</Button>
                </Card.Footer>


              </Card>
            </Grid>
            </motion.div>
          ))}
        </Grid.Container>


      </Container>
        </motion.div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white p-4 text-center mt-12">
        <p>© 2024 Your Company</p>
      </footer>
    </div>
  );
}