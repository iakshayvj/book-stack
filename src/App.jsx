import { Presentation } from './components/Presentation';
import { HLSVideo } from './components/HLSVideo';
import { Monitor, Brain, Briefcase, Lightbulb, Shield, Phone, Mail, MapPin } from 'lucide-react';

const HLS_SRC = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8';

const Logo = () => (
  <svg width="129" height="40" viewBox="0 0 129 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 20L30 10V30L10 20Z" fill="white"/>
    <text x="40" y="26" fill="white" fontSize="20" fontWeight="bold">Optimal AI</text>
  </svg>
);

const Header = ({ rightText }) => (
  <header className="absolute top-0 left-0 w-full px-[5.2%] pt-[4%] flex justify-between items-center z-20 pointer-events-none text-[clamp(12px,1.05vw,20px)] opacity-80">
    <Logo />
    <div className="absolute left-1/2 -translate-x-1/2">Pitch Deck</div>
    <div>{rightText}</div>
  </header>
);

const CoverSlide = () => (
  <div className="relative w-full h-full">
    <HLSVideo src={HLS_SRC} />
    <Header rightText="" />
    <div className="relative z-10 w-full h-full flex flex-col justify-center items-center text-center -mt-[3%]">
      <h1 className="text-[clamp(32px,5vw,96px)] tracking-[-0.02em] leading-[1.05] font-semibold">AI-Powered Data Analytics</h1>
      <h2 className="text-[clamp(20px,2.5vw,48px)] opacity-90 mt-[1.5%] font-medium">Unlocking Business Potential</h2>
      <p className="text-[clamp(14px,1.2vw,24px)] opacity-75 mt-[2%]">By John Doe</p>
    </div>
    <div className="absolute bottom-[4%] w-full text-center text-[clamp(12px,1.05vw,20px)] opacity-60 z-20">2024</div>
  </div>
);

const IntroSlide = () => (
  <div className="relative w-full h-full px-[5.2%] pt-[10%]">
    <HLSVideo src={HLS_SRC} />
    <Header rightText="Page 001" />
    <div className="relative z-10 w-full">
      <h2 className="text-[clamp(28px,3.5vw,64px)] tracking-[-0.02em] leading-[1.05] font-medium whitespace-pre-line">
        {"The Rise of AI\nin Data Analytics"}
      </h2>
      <div className="flex mt-[3.5%] gap-[4%] w-full items-start">
        <div className="flex-[0_0_22%]">
          <p className="text-[clamp(13px,1.1vw,20px)] opacity-90 leading-[1.5] mb-[4%]">The global AI analytics market is projected to skyrocket, moving swiftly from $150B.</p>
          <div className="flex items-baseline gap-[4%]">
            <span className="text-[clamp(28px,3.5vw,64px)] font-bold">$300B</span>
            <span className="text-[clamp(13px,1.1vw,20px)] text-white/80">2027</span>
          </div>
        </div>
        <div className="flex-[0_0_38%]">
          <p className="text-[clamp(13px,1.1vw,20px)] opacity-90 leading-[1.5]">
            Businesses across all sectors are rapidly adopting AI-driven analysis to transform raw data into actionable intelligence. This shift is not merely an operational upgrade; it represents a fundamental rethinking of how organizations predict market trends, understand consumer behavior, and maintain competitive advantage in an increasingly complex digital landscape.
          </p>
        </div>
        <div className="flex-[0_0_20%] flex flex-col">
          <span className="text-[clamp(28px,3.5vw,64px)] font-bold">25–40%</span>
          <p className="text-[clamp(13px,1.1vw,20px)] opacity-90 leading-[1.5] mb-[8%]">Increase in overall efficiency.</p>
          <svg viewBox="0 0 100 40" className="w-full h-auto overflow-visible">
            <defs>
              <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#D2FF55" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#D2FF55" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M 5 35 Q 30 10, 50 20 T 95 5 L 95 40 L 5 40 Z" fill="url(#chartGrad)" />
            <path d="M 5 35 Q 30 10, 50 20 T 95 5" fill="none" stroke="white" strokeWidth="2" />
            <circle cx="5" cy="35" r="3" fill="#B750B2" stroke="white" strokeWidth="1" />
            <circle cx="95" cy="5" r="3" fill="#B750B2" stroke="white" strokeWidth="1" />
          </svg>
        </div>
      </div>
    </div>
    <div className="absolute bottom-[4%] right-[5.2%] text-[clamp(12px,1.05vw,20px)] opacity-60 z-20">The Rise of AI</div>
  </div>
);

const GlassCard = ({ icon: Icon, title, desc }) => (
  <div className="flex-1 flex flex-col justify-end p-[clamp(20px,2.5vw,48px)] rounded-[clamp(16px,2vw,32px)] backdrop-blur-[24px] saturate-[1.4] bg-gradient-to-br from-[rgba(255,255,255,0.08)] to-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.12)] relative overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.15),transparent_40%)] pointer-events-none" />
    <Icon className="w-[clamp(32px,3vw,48px)] h-[clamp(32px,3vw,48px)] text-white mb-[clamp(16px,2vw,32px)] relative z-10" strokeWidth={1.5} />
    <h3 className="text-[clamp(18px,1.8vw,36px)] font-medium text-white mb-[clamp(8px,1vw,16px)] leading-tight relative z-10">{title}</h3>
    <p className="text-[clamp(12px,1.05vw,20px)] text-white/80 leading-[1.4] relative z-10">{desc}</p>
  </div>
);

const AnalyticsSlide = () => (
  <div className="relative w-full h-full flex flex-col pt-[10%] pb-[8%]">
    <HLSVideo src={HLS_SRC} />
    <Header rightText="Page 002" />
    <div className="relative z-10 w-full flex flex-col h-full">
      <div className="text-center mb-[4%]">
        <p className="text-[clamp(14px,1.2vw,24px)] opacity-90 mb-[0.5%]">Transforming Data into Intelligence with</p>
        <h2 className="text-[clamp(28px,3.5vw,64px)] font-semibold tracking-[-0.02em]">AI-Powered Analytics</h2>
      </div>
      <div className="flex flex-col gap-[clamp(10px,1.5vw,27px)] px-[5.2%] flex-1">
        <div className="flex w-full gap-[clamp(10px,1.5vw,27px)] flex-1">
          <GlassCard icon={Monitor} title="Advanced Capabilities" desc="Real-time processing, predictive analytics, and machine learning." />
          <GlassCard icon={Brain} title="Smarter Decision-Making" desc="Helping businesses unlock insights and optimize efficiency." />
          <GlassCard icon={Briefcase} title="Industry Leader" desc="Driving AI-driven data analytics innovation." />
        </div>
        <div className="flex w-full gap-[clamp(10px,1.5vw,25px)] flex-1">
          <GlassCard icon={Lightbulb} title="Future-Ready Solutions" desc="Empowering organizations to stay competitive in a data-driven world." />
          <GlassCard icon={Shield} title="Scalable & Secure" desc="Ensuring seamless AI integration with robust data protection." />
        </div>
      </div>
    </div>
  </div>
);

const QuoteSlide = () => (
  <div className="relative w-full h-full flex flex-col justify-center items-center text-center">
    <HLSVideo src={HLS_SRC} />
    <div className="relative z-10 max-w-[70%] flex flex-col gap-[12px]">
      <p className="text-[clamp(14px,1.2vw,20px)] opacity-90">Andrew Ng</p>
      <h2 className="text-[clamp(28px,3.5vw,64px)] tracking-[-0.02em] leading-[1.15] font-medium">
        &ldquo;Artificial Intelligence is the new electricity.&rdquo;
      </h2>
    </div>
  </div>
);

const InstagramIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[clamp(24px,2vw,32px)] h-[clamp(24px,2vw,32px)]">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const FacebookIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[clamp(24px,2vw,32px)] h-[clamp(24px,2vw,32px)]">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const OutroSlide = () => (
  <div className="relative w-full h-full flex items-center px-[5.2%]">
    <HLSVideo src={HLS_SRC} />
    <Header rightText="Page 020" />
    <div className="relative z-10 w-full">
      <h2 className="text-[clamp(28px,3.5vw,64px)] tracking-[-0.02em] leading-[1.05] font-semibold whitespace-pre-line">
        {"Contact Information &\nFinal Call to Action"}
      </h2>
      <p className="text-[clamp(13px,1.1vw,20px)] opacity-90 max-w-[38%] mt-[3%] leading-[1.5]">
        Ready to harness the power of AI for your analytics infrastructure? Reach out to our team to discover how we can transform your data strategy today.
      </p>

      <div className="flex flex-col gap-[clamp(12px,1.2vw,19px)] mt-[3%]">
        {[
          { icon: <InstagramIcon />, text: "Instagram.com/grapho" },
          { icon: <FacebookIcon />, text: "Facebook.com/grapho" },
          { icon: <Phone className="w-[clamp(24px,2vw,32px)] h-[clamp(24px,2vw,32px)]" strokeWidth={1.5} />, text: "+1 (415) 987-6543" },
          { icon: <Mail className="w-[clamp(24px,2vw,32px)] h-[clamp(24px,2vw,32px)]" strokeWidth={1.5} />, text: "contact@optimalai.com" },
          { icon: <MapPin className="w-[clamp(24px,2vw,32px)] h-[clamp(24px,2vw,32px)]" strokeWidth={1.5} />, text: "Headquarters: San Francisco, CA, USA" },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-[clamp(12px,1.2vw,16px)]">
            {item.icon}
            <span className="text-[clamp(13px,1.1vw,20px)]">{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default function App() {
  return (
    <Presentation>
      <CoverSlide />
      <IntroSlide />
      <AnalyticsSlide />
      <QuoteSlide />
      <OutroSlide />
    </Presentation>
  );
}
