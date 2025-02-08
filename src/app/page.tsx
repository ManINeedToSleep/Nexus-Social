import Link from "next/link";

export default function Home() {
  return (
    <main className="aurora-gradient absolute inset-0">
      <br></br>
      {/* Hero Section */}
      <div className="relative min-h-screen flex flex-col pt-16"> {/* pt-16 to account for navbar */}
        <div className="flex-1 flex items-center justify-center">
          <div className="max-w-4xl mx-auto space-y-8 px-4 text-center">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight">
              Connect, Share, and Engage with
              <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500">
                Nexus Social
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Join our community where ideas flow freely, connections are meaningful, 
              and every voice matters.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
              <Link href="/signup" className="btn-primary px-12 py-4 text-lg">
                Get Started
              </Link>
              <Link href="/about" className="btn-secondary px-12 py-4 text-lg">
                Learn More
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-20">
              <div className="space-y-2">
                <h3 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
                  10K+
                </h3>
                <p className="text-muted-foreground text-lg">Active Users</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-500">
                  50K+
                </h3>
                <p className="text-muted-foreground text-lg">Posts Shared</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-500">
                  24/7
                </h3>
                <p className="text-muted-foreground text-lg">Active Community</p>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Section */}
        <div className="container-custom py-24">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="card backdrop-blur-sm bg-card/30">
              <h3 className="text-xl font-semibold mb-2">Connect Globally</h3>
              <p className="text-muted-foreground">
                Build meaningful connections with people from around the world.
              </p>
            </div>
            <div className="card backdrop-blur-sm bg-card/30">
              <h3 className="text-xl font-semibold mb-2">Share Stories</h3>
              <p className="text-muted-foreground">
                Share your experiences and ideas with a supportive community.
              </p>
            </div>
            <div className="card backdrop-blur-sm bg-card/30">
              <h3 className="text-xl font-semibold mb-2">Engage Authentically</h3>
              <p className="text-muted-foreground">
                Participate in genuine conversations that matter to you.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
