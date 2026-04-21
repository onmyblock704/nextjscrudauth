import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, CirclePlay } from "lucide-react";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center overflow-hidden">
      <div className="container mx-auto grid w-full max-w-7xl gap-12 px-6 py-12 lg:grid-cols-2 lg:py-0">
        
        {/* Left Content */}
        <div className="flex flex-col justify-center">
          <Badge className="w-fit rounded-full border-none bg-gradient-to-br from-primary via-muted/30 to-primary py-1">
            Just released v1.0.0
          </Badge>

          <h1 className="mt-6 max-w-[17ch] text-4xl font-bold tracking-tight md:text-5xl lg:text-[2.75rem] xl:text-5xl leading-tight">
            Customized Shadcn UI Blocks & Components
          </h1>

          <p className="mt-6 max-w-[60ch] text-lg text-muted-foreground">
            Explore a collection of Shadcn UI blocks and components, ready to
            preview and copy. Streamline your development workflow with
            easy-to-implement examples.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button size="lg" className="rounded-full text-base">
              <span>Get Started</span>
              <ArrowUpRight className="ml-2 h-5 w-5" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="rounded-full text-base shadow-none"
            >
              <CirclePlay className="mr-2 h-5 w-5" />
              <span>Watch Demo</span>
            </Button>
          </div>
        </div>

        {/* Right Visual */}
        <div className="w-full aspect-video rounded-xl bg-accent lg:h-screen lg:w-full lg:rounded-none" />
      </div>
    </section>
  );
}