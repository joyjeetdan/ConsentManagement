
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  BarChart3, 
  Shield, 
  Zap, 
  TrendingUp, 
  Settings,
  Database,
  Brain,
  Puzzle
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const navigationItems = [
  {
    title: "Overview",
    url: createPageUrl("Dashboard"),
    icon: BarChart3,
    description: "Performance insights"
  },
  {
    title: "Consent Hub",
    url: createPageUrl("ConsentHub"),
    icon: Shield,
    description: "Data compliance center"
  },
  {
    title: "Integrations",
    url: createPageUrl("Integrations"),
    icon: Puzzle,
    description: "Connect platforms & CRMs"
  },
  {
    title: "Predictive Engine",
    url: createPageUrl("PredictiveEngine"),
    icon: Brain,
    description: "AI-driven optimization"
  },
  {
    title: "Campaign Manager",
    url: createPageUrl("CampaignManager"),
    icon: TrendingUp,
    description: "Budget optimization"
  }
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();

  return (
    <SidebarProvider>
      <style>{`
        :root {
          --primary-950: #0F172A;
          --primary-900: #1E293B;
          --primary-800: #334155;
          --primary-600: #475569;
          --primary-500: #64748B;
          --accent-500: #3B82F6;
          --accent-600: #2563EB;
          --accent-400: #60A5FA;
          --success-500: #10B981;
          --warning-500: #F59E0B;
          --error-500: #EF4444;
        }
        
        .gradient-bg {
          background: linear-gradient(135deg, var(--primary-950) 0%, var(--primary-900) 100%);
        }
        
        .glass-effect {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .luxury-shadow {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
      
      <div className="min-h-screen flex w-full bg-slate-50">
        <Sidebar className="border-r-0 shadow-2xl">
          <div className="gradient-bg h-full">
            <SidebarHeader className="border-b border-slate-700 p-6">
              <div className="flex items-center gap-3">
                <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/4bddf8da9_Gemini_Generated_Image_ws8p1zws8p1zws8p.jpg" alt="OptdConsnt Logo" className="h-8 object-contain" />
              </div>
            </SidebarHeader>
            
            <SidebarContent className="p-4">
              <SidebarGroup>
                <SidebarGroupLabel className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-3 py-2">
                  Platform
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu className="space-y-2">
                    {navigationItems.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton 
                          asChild 
                          className={`group hover:bg-slate-700/50 transition-all duration-300 rounded-xl p-3 ${
                            location.pathname === item.url 
                              ? 'bg-gradient-to-r from-blue-500/20 to-blue-600/20 border-l-4 border-blue-500' 
                              : ''
                          }`}
                        >
                          <Link to={item.url} className="flex items-center gap-4">
                            <div className={`p-2 rounded-lg transition-colors ${
                              location.pathname === item.url 
                                ? 'bg-blue-500/20 text-blue-400' 
                                : 'bg-slate-700/50 text-slate-400 group-hover:bg-slate-600/50 group-hover:text-white'
                            }`}>
                              <item.icon className="w-4 h-4" />
                            </div>
                            <div>
                              <span className={`font-medium ${
                                location.pathname === item.url ? 'text-white' : 'text-slate-300'
                              }`}>
                                {item.title}
                              </span>
                              <p className="text-xs text-slate-500">{item.description}</p>
                            </div>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>

              <SidebarGroup className="mt-8">
                <SidebarGroupLabel className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-3 py-2">
                  System Status
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <div className="px-3 py-2 space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">Platform Health</span>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-green-400 font-medium">Optimal</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">Data Sync</span>
                      <div className="flex items-center gap-2">
                        <Zap className="w-3 h-3 text-blue-400" />
                        <span className="text-blue-400 font-medium">Real-time</span>
                      </div>
                    </div>
                  </div>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="border-t border-slate-700 p-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-slate-600 to-slate-700 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-sm">U</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-white text-sm truncate">Admin User</p>
                  <p className="text-xs text-slate-400 truncate">Platform Administrator</p>
                </div>
              </div>
            </SidebarFooter>
          </div>
        </Sidebar>

        <main className="flex-1 flex flex-col bg-slate-50">
          <header className="bg-white border-b border-gray-200 px-6 py-4 md:hidden shadow-sm">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="hover:bg-gray-100 p-2 rounded-lg transition-colors duration-200" />
              <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/4bddf8da9_Gemini_Generated_Image_ws8p1zws8p1zws8p.jpg" alt="OptdConsnt Logo" className="h-8 object-contain" />
            </div>
          </header>

          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
