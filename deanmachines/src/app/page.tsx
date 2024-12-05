// src/app/page.tsx
import Image from "next/image";
import { useState } from "react";
import { Button, Card, Input, Spacer, Text, Container, Row, Col, Grid } from "@nextui-org/react";
import { motion, useAnimation } from "framer-motion";

// This function will be executed on the server
async function getDroneData() {


  /**
   * Renders the homepage with placeholder drone model data.
   * @returns A list of drone models with simplified features.
   * @example
   * [
   *   {
   *     name: "Raptor X10",
   *     image: "/drone1.jpg",
   *     description: "Blazing fast racing drone.",
   *     keyFeatures: ["300mph", "4K Camera", "15min Flight"]
   *   },
   *   ...
   * ]
   */
  export default function Home() {
  // Placeholder data for drone models (replace with actual data)
  const droneModels = [
    {
         name: "Raptor X10",
         image: "/drone1.jpg", // Replace with actual image URL
         description: "Blazing fast racing drone.",
         keyFeatures: ["300mph", "4K Camera", "15min Flight"], // Simplified features
       },
       {
         name: "Phantom V5",
         image: "/drone2.jpg", // Replace with actual image URL
         description: "Stunning aerial photography.",
         keyFeatures: ["8K Camera", "30min Flight", "Stabilization"], // Simplified features
       },
       {
         name: "Hover Scout S2",
         image: "/drone3.jpg", // Replace with actual image URL
         description: "Perfect for beginners.",
         keyFeatures: ["720p camera", "10min Flight", "Easy Controls"], // Simplified features
       },
      ];

      // Simulate a delay to demonstrate loading state
   await new Promise((resolve) => setTimeout(resolve, 1000)); // Remove this in production
 
   return droneModels;
 }   
 export default async function Home() {  // Now an async function
  const [email, setEmail] = useState("");



  // Fetch drone data on the server
  const droneModels = await getDroneData();
  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Hero Section */}
      <section className="relative h-[500px] w-full">
        <Image
          src="/hero.jpg" // Replace with actual image URL
          alt="FPV Drone in Action"
          fill
          className="object-cover"
          priority
        />

        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white">
          <h1 className="text-5xl font-bold mb-4">Experience the Thrill of Flight</h1>
          <p className="text-lg mb-8">Cutting-edge FPV drones for the ultimate adrenaline rush.</p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full">
            Explore Models
          </button>
        </div>

      </section>




      {/* Product Highlights */}
      <section className="container mx-auto p-8">  {/* Added container for centering and padding */}
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Drones</h2> {/* Centered title */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {droneModels.map((model) => (
            <div key={model.name} className="bg-white rounded-lg shadow-md p-6"> {/* Added background, rounded corners, and shadow */}
              <Image
                src={model.image}
                alt={model.name}
                width={400}  {/* Adjust width as needed */}
                height={200}  {/* Adjust height as needed */}
                className="w-full h-48 object-cover rounded-md mb-4"  {/* Added styling */}
              />
              <h3 className="text-xl font-bold mb-2 text-center">{model.name}</h3> {/* Centered title */}
              <p className="text-gray-600 mb-4 text-center">{model.description}</p> {/* Centered description */}
              <ul className="list-disc list-inside text-sm mb-4"> {/* Added styling */}
                {model.keyFeatures.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}

              </ul>
               <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mx-auto block">Learn More</button> {/* Added button, centered */}

            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-4 text-center mt-12"> {/* Added styling and top margin */}

          <p>© 2024 Your Company. All rights reserved.</p>

      </footer>
    </div>
  );
}
