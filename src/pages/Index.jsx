import { EnvelopeIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { useState, useEffect, useRef } from "react";
import WorldMap from '../components/WorldMap';
import TravelStoryCard from '../components/TravelStoryCard';

const Index = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [opacity, setOpacity] = useState(0);
  const [count1, setCount1] = useState(1);
  const [count2, setCount2] = useState(1);
  const animationRef = useRef(null);
  const lastOpacityRef = useRef(0);

  useEffect(() => {
    if (isHovered) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      setOpacity(1);
      return;
    }

    let startTime = null;
    const duration = 3000; // 3 seconds total

    function animate(currentTime) {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = (elapsed % duration) / duration;

      // Calculate opacity based on the blink animation curve
      let newOpacity;
      if (progress < 0.33) {
        // 0 to 1 in first 1 second (33% of 3s)
        newOpacity = progress * 3;
      } else if (progress < 1) {
        // Stay at 1 for next 2 seconds (67% of 3s)
        newOpacity = 1;
      }

      lastOpacityRef.current = newOpacity;
      setOpacity(newOpacity);
      animationRef.current = requestAnimationFrame(animate);
    }

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isHovered]);

  useEffect(() => {
    let animationFrameId;
    const duration = 4000; // 动画持续时间（毫秒）
    let startTime = null;
    const target1 = 15;
    const target2 = 50;

    // 确保在浏览器环境中执行
    if (typeof window !== 'undefined') {
      // 创建 Intersection Observer
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // 元素进入视口时开始动画
            startTime = Date.now();
            animate();
          } else {
            // 元素离开视口时停止动画
            if (animationFrameId) {
              cancelAnimationFrame(animationFrameId);
            }
            // 重置数字
            setCount1(1);
            setCount2(1);
          }
        });
      }, {
        threshold: 0.1 // 当元素有10%进入视口时触发
      });

      // 观察数字容器
      const statsContainer = document.querySelector('.stats-container');
      if (statsContainer) {
        observer.observe(statsContainer);
      }

      function animate() {
        if (!startTime) return;
        
        const currentTime = Date.now();
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1); // 限制最大值为1，确保动画只执行一次

        // 使用缓动函数使动画更自然
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        
        // 确保最终值准确达到目标值
        const value1 = Math.round(1 + (target1 - 1) * easeOutQuart);
        const value2 = Math.round(1 + (target2 - 1) * easeOutQuart);
        
        setCount1(value1);
        setCount2(value2);

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(animate);
        }
      }

      return () => {
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }
        if (statsContainer) {
          observer.unobserve(statsContainer);
        }
      };
    }
  }, []);

  const scrollToSecondSection = () => {
    const secondSection = document.getElementById('second-section');
    if (secondSection) {
      const startPosition = window.pageYOffset;
      const targetPosition = secondSection.offsetTop;
      const distance = targetPosition - startPosition;
      const duration = 100; // 更快的滚动时间（毫秒）
      let start = null;

      function animation(currentTime) {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const progress = Math.min(timeElapsed / duration, 1);
        
        // 使用线性滚动，没有缓动效果
        window.scrollTo(0, startPosition + distance * progress);

        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        }
      }

      requestAnimationFrame(animation);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* 顶栏 */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full h-16">
        <div className="absolute inset-0 bg-black/[0.02]" style={{
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          maskImage: 'linear-gradient(180deg, rgba(0, 0, 0, 10) 0%, rgba(0, 0, 0, 0) 100%)',
          WebkitMaskImage: 'linear-gradient(180deg, rgba(0, 0, 0, 10) 0%, rgba(0, 0, 0, 0) 100%)'
        }} />
        <nav className="pl-10 h-16 flex justify-between items-center relative">
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              <span className="font-['Tamil_MN'] text-[22px] leading-[22px] tracking-[0.16em] text-white">MY</span>
              <img src="/logo.svg" alt="logo" className="ml-1" />
              <span className="ml-1 font-['Tamil_MN'] text-[22px] leading-[22px] tracking-[0.16em] text-white flex items-center">TRAVEL</span>
            </div>
          </div>
          <div className="flex items-center space-x-9 mr-10">
            <button className="font-['Source_Han_Sans'] text-[14px] font-[350] leading-[20px] tracking-[0em] text-white hover:opacity-80 transition">足迹画廊</button>
            <button className="font-['Source_Han_Sans'] text-[14px] font-[350] leading-[20px] tracking-[0em] text-white hover:opacity-80 transition">旅行故事</button>
            <button className="font-['Source_Han_Sans'] text-[14px] font-[350] leading-[20px] tracking-[0em] text-white hover:opacity-80 transition flex items-center">
              联系我
              <img src="/箭头_v_小_下.svg" alt="arrow" className="ml-1" />
            </button>
          </div>
        </nav>
      </header>

      {/* 第一楼层：主标题 */}
      <section className="h-screen relative">
        <div className="absolute inset-0">
          <video
            src="/media.mp4"
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          />
          <div 
            className="absolute left-0 bottom-0 w-full h-[160px]"
            style={{
              background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%)'
            }}
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <img src="/title.svg" alt="title" className="mx-auto mb-8 animate-fade-in" />
        </div>
        <div className="absolute bottom-[30px] left-0 right-0 flex justify-center">
          <button 
            onClick={scrollToSecondSection}
            className="text-white transition font-['Source_Han_Sans'] text-[14px] font-[350] leading-[20px] tracking-[0em] flex flex-col items-center animate-blink px-20 py-5"
            style={{
              animation: "blink 3s linear infinite"
            }}
          >
            即刻出发
            <img src="/箭头_双_下.svg" alt="arrow" className="w-4 h-4 mt-[10px]" />
          </button>
        </div>
      </section>

      {/* 第二楼层：数据统计和地图 */}
      <section id="second-section" className="py-20 bg-black relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center">
            <div className="flex justify-center space-x-20 mb-12 stats-container">
              <div>
                <div className="flex flex-row items-end gap-1">
                  <h2 className="text-[44px] font-[500] font-['DIN_Alternate'] leading-normal tracking-[0em] text-white" style={{ fontVariationSettings: '"opsz" auto' }}>{count1}</h2>
                  <p className="text-gray-400 mb-[12px]">个国家</p>
                </div>
              </div>
              <div>
                <div className="flex flex-row items-end gap-1">
                  <h2 className="text-[44px] font-[500] font-['DIN_Alternate'] leading-normal tracking-[0em] text-white" style={{ fontVariationSettings: '"opsz" auto' }}>{count2}+</h2>
                  <p className="text-gray-400 mb-[12px]">个地区</p>
                </div>
              </div>
            </div>
            <div className="w-full max-w-[1200px] mx-auto">
              <WorldMap />
            </div>
          </div>
        </div>
      </section>

      {/* 第三楼层：故事档案馆 */}
      <section className="py-20 bg-black">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">故事档案馆</h2>
          <div className="px-3">
            <div className="flex gap-5 overflow-x-auto pb-8">
              {[
                { city: "格拉斯哥", country: "英国" },
                { city: "爱丁堡", country: "英国" },
                { city: "伦敦", country: "英国" },
                { city: "巴黎", country: "法国" },
                { city: "罗马", country: "意大利" },
                { city: "威尼斯", country: "意大利" },
                { city: "巴塞罗那", country: "西班牙" },
                { city: "布拉格", country: "捷克" },
                { city: "维也纳", country: "奥地利" },
                { city: "布达佩斯", country: "匈牙利" }
              ].map((story, index) => (
                <div key={index} className="py-3 first:pl-3 last:pr-3">
                  <TravelStoryCard
                    city={story.city}
                    country={story.country}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 底部问答区域 */}
      <section className="py-10 bg-black">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4 justify-center">
            {[
              "几月份最最最划算?",
              "看评价说很比较划算但十天都没到?",
              "预约的攻略怎么买?",
              "2024年打算去哪里玩呢?",
              "什么时候去南国?",
              "我真是后悔有你有多惨?",
              "中秋消费真不错!",
              "年末测评,快来小海豹的评价吧!",
            ].map((question, index) => (
              <button
                key={index}
                className="px-4 py-2 rounded-full bg-gray-800 hover:bg-gray-700 transition"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="py-6 bg-black border-t border-gray-800">
        <div className="container mx-auto px-4 text-center text-gray-400 text-sm">
          <p>© Designed by mcopilot 2024</p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes blink {
          0% {
            opacity: 0;
          }
          33% {
            opacity: 1;
          }
          100% {
            opacity: 1;
          }
        }
        .animate-blink {
          animation: blink 3s linear infinite;
        }
        @keyframes breathe {
          0% {
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          40% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }
        .animate-breathe {
          animation: breathe 3s ease-in-out infinite;
        }
        .animate-breathe:hover {
          animation: none;
          opacity: 1 !important;
        }
        .transition {
          transition: opacity 0.1s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Index;
