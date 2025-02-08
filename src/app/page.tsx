'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import ShinyText from '@/components/ShinyText';

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <main className="aurora-gradient absolute inset-0">
      <br />
      {/* Hero Section */}
      <div className="relative min-h-screen flex flex-col pt-16">
        <motion.div 
          className="flex-1 flex items-center justify-center relative z-[2] pointer-events-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="max-w-4xl mx-auto space-y-8 px-4 text-center">
            <motion.h1 
              className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight"
              variants={itemVariants}
            >
              Connect, Share, and Engage with
              <motion.span 
                className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500"
                animate={{ 
                  backgroundPosition: ["0%", "100%", "0%"],
                }}
                transition={{ 
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{ backgroundSize: "200%" }}
              >
                Nexus Social
              </motion.span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto"
              variants={itemVariants}
            >
              Join our community where ideas flow freely, connections are meaningful, 
              and every voice matters.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center pt-8"
              variants={itemVariants}
            >
              <Link href="/auth" className="relative z-[2] cursor-pointer">
                <motion.span 
                  className="btn-primary px-12 py-4 text-lg inline-block"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Started
                </motion.span>
              </Link>
              <Link href="/auth" className="relative z-[2] cursor-pointer">
                <motion.span 
                  className="btn-secondary px-12 py-4 text-lg inline-block"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More
                </motion.span>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-20 relative z-[2]"
              variants={containerVariants}
            >
              {[
                { 
                  number: "10K+", 
                  text: "Active Users", 
                  gradient: "from-purple-500 to-blue-500",
                  speed: 4
                },
                { 
                  number: "50K+", 
                  text: "Posts Shared", 
                  gradient: "from-blue-500 to-cyan-500",
                  speed: 5
                },
                { 
                  number: "24/7", 
                  text: "Active Community", 
                  gradient: "from-purple-500 to-cyan-500",
                  speed: 6
                }
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  className="space-y-2"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                >
                  <ShinyText 
                    text={stat.number}
                    className="text-4xl font-bold"
                    gradient={stat.gradient}
                    speed={stat.speed}
                  />
                  <p className="text-muted-foreground text-lg">{stat.text}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Feature Section */}
        <motion.div 
          className="container-custom py-24 relative z-[2]"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                title: "Connect Globally",
                description: "Build meaningful connections with people from around the world."
              },
              {
                title: "Share Stories",
                description: "Share your experiences and ideas with a supportive community."
              },
              {
                title: "Engage Authentically",
                description: "Participate in genuine conversations that matter to you."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="card backdrop-blur-sm bg-card/30"
                variants={cardVariants}
                whileHover="hover"
              >
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
}