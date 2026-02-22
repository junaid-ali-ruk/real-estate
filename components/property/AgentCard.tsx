"use client";

import { Building, Mail, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { urlFor } from "@/lib/sanity/image";
import type { Agent } from "@/types";

interface AgentCardProps {
  agent: Agent;
  children?: ReactNode;
}

export function AgentCard({ agent, children }: AgentCardProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <Avatar className="h-16 w-16 border-2 border-border/50">
            {agent.photo?.asset ? (
              <AvatarImage
                src={urlFor(agent.photo).width(128).height(128).url()}
                alt={agent.name}
              />
            ) : null}
            <AvatarFallback className="text-lg font-bold bg-accent text-accent-foreground">
              {getInitials(agent.name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-heading font-bold text-lg leading-none mb-1">
              {agent.name}
            </h3>
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">
              Real Estate Agent
            </p>
            {agent.agency && (
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1">
                <Building className="h-3.5 w-3.5" />
                <span>{agent.agency}</span>
              </div>
            )}
          </div>
        </div>

        {agent.bio && !agent.bio.toLowerCase().includes("test good") && (
          <p className="text-sm text-muted-foreground mb-6 line-clamp-4 leading-relaxed italic">
            &quot;{agent.bio}&quot;
          </p>
        )}

        <div className="space-y-2 mb-4">
          {agent.email && (
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <a
                href={`mailto:${agent.email}`}
                className="text-primary hover:underline"
              >
                {agent.email}
              </a>
            </div>
          )}
          {agent.phone && (
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <a
                href={`tel:${agent.phone}`}
                className="text-primary hover:underline"
              >
                {agent.phone}
              </a>
            </div>
          )}
        </div>

        {children}
      </CardContent>
    </Card>
  );
}
