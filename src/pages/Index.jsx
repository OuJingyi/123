import { EnvelopeIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { useState, useEffect, useRef } from "react";
import WorldMap from '../components/WorldMap';
import TravelStoryCard from '../components/TravelStoryCard';
import { Mail, MapPin, ChevronLeft, ChevronRight } from "lucide-react";

const Index = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [opacity, setOpacity] = useState(0);
  const [count1, setCount1] = useState(1);
  const [count2, setCount2] = useState(1);
  const animationRef = useRef(null);
  const lastOpacityRef = useRef(0);
  const scrollContainerRef = useRef(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [currentCard, setCurrentCard] = useState(null);
  const [marqueeItems1, setMarqueeItems1] = useState([
    { text: "✈️ 几月份最最最划算?", isNew: false },
    { text: "🏰 看评价说很比较划算但十天都没到?", isNew: false },
    { text: "🎫 预约的攻略怎么买?", isNew: false },
    { text: "🗺️ 2024年打算去哪里玩呢?", isNew: false },
    { text: "🌅 什么时候去南国?", isNew: false },
    { text: "😅 我真是后悔有你有多惨?", isNew: false },
    { text: "🌕 中秋消费真不错!", isNew: false },
    { text: "🎄 年末测评,快来小海豹的评价吧!", isNew: false },
  ]);

  const [marqueeItems2, setMarqueeItems2] = useState([
    { text: "🍜 日本拉面真的那么好吃吗?", isNew: false },
    { text: "🏖️ 马尔代夫什么时候去最合适?", isNew: false },
    { text: "🎭 欧洲哪个国家最值得去?", isNew: false },
    { text: "🌋 冰岛火山喷发还能去吗?", isNew: false },
    { text: "🎡 迪士尼乐园哪个最好玩?", isNew: false },
    { text: "🏔️ 瑞士滑雪季什么时候开始?", isNew: false },
    { text: "🌊 巴厘岛雨季影响游玩吗?", isNew: false },
    { text: "🎪 环球影城哪个最值得去?", isNew: false },
  ]);

  // 定义一组基础卡片数据
  const baseCards = [
    { 
      city: "格拉斯哥", 
      country: "英国",
      description: "漫步在格拉斯哥的街头，哥特式建筑与现代艺术完美融合。在凯尔文格罗夫艺术博物馆，感受苏格兰艺术的独特魅力。",
      imageUrl: "/IMG_1341 2.jpg"
    },
    { 
      city: "爱丁堡", 
      country: "英国",
      description: "爱丁堡城堡巍峨耸立，皇家英里大道上飘荡着风笛声。在亚瑟王座俯瞰整座城市，感受苏格兰历史的厚重。",
      imageUrl: "/IMG_8538.jpg"
    },
    { 
      city: "伦敦", 
      country: "英国",
      description: "泰晤士河畔，大本钟的钟声回荡。在伦敦眼上俯瞰城市全景，感受这座国际化大都市的活力与魅力。",
      imageUrl: "/IMG_2861.JPG"
    },
    { 
      city: "特罗姆瑟", 
      country: "挪威",
      description: "北极圈内的极光之城，在特罗姆瑟大教堂仰望绚丽的极光。乘坐缆车登上斯托尔斯泰纳山，俯瞰峡湾与极夜中的城市灯火。",
      imageUrl: "/DSCF1372.JPG",
      link: "https://www.bilibili.com/video/BV18T411Z7G6/?share_source=copy_web&vd_source=79948e39e1e700f557036a46ac04c4a0"
    },
    { 
      city: "巴塞罗那", 
      country: "西班牙",
      description: "高迪的建筑艺术在这里绽放，圣家堂的彩色玻璃折射出梦幻光芒。在兰布拉大道感受加泰罗尼亚的热情。",
      imageUrl: "/IMG_1703.JPG",
      link: "https://www.bilibili.com/video/BV1vN41167H5/?share_source=copy_web"
    },
    { 
      city: "雷克雅未克", 
      country: "冰岛",
      description: "在雷克雅未克感受极地的纯净与神秘。蓝湖温泉的蒸汽在寒风中升腾，极光在夜空中舞动，冰岛的自然奇观令人心驰神往。",
      imageUrl: "/IMG_9275.JPG",
      link: "https://www.bilibili.com/video/BV1A34y1f7nV/?share_source=copy_web&vd_source=79948e39e1e700f557036a46ac04c4a0"
    },
    {
      city: "布拉格",
      country: "捷克",
      description: "查理大桥上，古老的雕像诉说着历史。在布拉格城堡俯瞰红屋顶的海洋，感受这座童话之城的魅力。",
      imageUrl: "/IMG_1396.JPG",
      link: "https://www.bilibili.com/video/BV1n84y1M7Bq/?share_source=copy_web&vd_source=79948e39e1e700f557036a46ac04c4a0"
    },
    { 
      city: "维也纳", 
      country: "奥地利",
      description: "在金色大厅聆听古典音乐，在美泉宫感受哈布斯堡王朝的辉煌。维也纳的咖啡文化，让时光慢下来。",
      imageUrl: "/IMG_1394.JPG",
      link: "https://www.bilibili.com/video/BV1mk4y1i7vN/?share_source=copy_web&vd_source=79948e39e1e700f557036a46ac04c4a0"
    },
    { 
      city: "布达佩斯", 
      country: "匈牙利",
      description: "多瑙河将布达与佩斯分隔，链子桥连接两岸。在渔人堡俯瞰城市全景，在温泉浴场感受匈牙利人的悠闲。",
      imageUrl: "/IMG_2157.jpg",
      link: "https://www.bilibili.com/video/BV16c411T7KF/?share_source=copy_web&vd_source=79948e39e1e700f557036a46ac04c4a0"
    }
  ];

  // 创建三组卡片数据
  const allCards = [...baseCards, ...baseCards, ...baseCards];

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

  // 设置初始滚动位置
  useEffect(() => {
    if (scrollContainerRef.current) {
      const containerWidth = scrollContainerRef.current.offsetWidth;
      const cardWidth = containerWidth / 3;
      // 计算第二组起始位置，确保三张卡片居中
      const secondGroupStart = containerWidth + cardWidth;
      scrollContainerRef.current.scrollLeft = secondGroupStart;
    }
  }, []);

  const scrollLeft = () => {
    if (scrollContainerRef.current && !isScrolling) {
      setIsScrolling(true);
      const containerWidth = scrollContainerRef.current.offsetWidth;
      const currentScroll = scrollContainerRef.current.scrollLeft;
      const scrollWidth = scrollContainerRef.current.scrollWidth;
      const cardWidth = containerWidth / 3;
      
      // 计算下一个目标位置
      let nextPosition = Math.floor(currentScroll / cardWidth) * cardWidth - cardWidth;
      
      // 如果即将滚动到第一组之前，跳转到最后一组
      if (nextPosition < 0) {
        // 先执行滚动动画
        scrollContainerRef.current.scrollTo({
          left: nextPosition,
          behavior: 'smooth'
        });
        
        // 在动画即将结束时跳转
        setTimeout(() => {
          scrollContainerRef.current.scrollTo({
            left: scrollWidth - containerWidth * 2,
            behavior: 'auto'
          });
        }, 400);
      } else {
        // 正常滚动
        scrollContainerRef.current.scrollTo({
          left: nextPosition,
          behavior: 'smooth'
        });
      }
      
      setTimeout(() => setIsScrolling(false), 500);
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current && !isScrolling) {
      setIsScrolling(true);
      const containerWidth = scrollContainerRef.current.offsetWidth;
      const currentScroll = scrollContainerRef.current.scrollLeft;
      const scrollWidth = scrollContainerRef.current.scrollWidth;
      const cardWidth = containerWidth / 3;
      
      // 计算下一个目标位置
      let nextPosition = Math.ceil(currentScroll / cardWidth) * cardWidth + cardWidth;
      
      // 如果即将滚动到最后一组之后，跳转到第一组
      if (nextPosition > scrollWidth - containerWidth) {
        // 先执行滚动动画
        scrollContainerRef.current.scrollTo({
          left: nextPosition,
          behavior: 'smooth'
        });
        
        // 在动画即将结束时跳转
        setTimeout(() => {
          scrollContainerRef.current.scrollTo({
            left: containerWidth,
            behavior: 'auto'
          });
        }, 400);
      } else {
        // 正常滚动
        scrollContainerRef.current.scrollTo({
          left: nextPosition,
          behavior: 'smooth'
        });
      }
      
      setTimeout(() => setIsScrolling(false), 500);
    }
  };

  // 监听滚动事件，处理循环滚动
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const containerWidth = container.offsetWidth;
      const scrollWidth = container.scrollWidth;
      const currentScroll = container.scrollLeft;
      
      // 如果滚动到最右边，跳转到第一组
      if (currentScroll >= scrollWidth - containerWidth - 10) {
        // 使用 requestAnimationFrame 确保在下一帧执行跳转
        requestAnimationFrame(() => {
          container.scrollTo({
            left: containerWidth,
            behavior: 'auto'
          });
        });
      }
      // 如果滚动到最左边，跳转到最后一组
      else if (currentScroll <= 10) {
        requestAnimationFrame(() => {
          container.scrollTo({
            left: scrollWidth - containerWidth * 2,
            behavior: 'auto'
          });
        });
      }

      // 处理卡片缩放效果和当前卡片检测
      const containerRect = container.getBoundingClientRect();
      const containerCenter = containerRect.left + containerRect.width / 2;
      
      const cards = container.querySelectorAll('.card-item');
      let closestCard = null;
      let minDistance = Infinity;
      
      cards.forEach(card => {
        const cardRect = card.getBoundingClientRect();
        const cardCenter = cardRect.left + cardRect.width / 2;
        const distance = Math.abs(containerCenter - cardCenter);
        const maxDistance = containerRect.width / 2;
        
        // 修改缩放比例计算，最大缩放为1.2
        const scale = 1.2 - (distance / maxDistance) * 0.4;
        card.style.transform = `translate3d(0, 0, 0) scale3d(${scale}, ${scale}, 1)`;
        card.style.opacity = scale;
        card.style.willChange = 'transform, opacity';

        // 更新当前卡片
        if (distance < minDistance) {
          minDistance = distance;
          closestCard = card;
        }
      });

      // 更新当前卡片状态
      if (closestCard) {
        const cardIndex = Array.from(cards).indexOf(closestCard);
        setCurrentCard(allCards[cardIndex % baseCards.length]);
      }
    };

    container.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSendMessage = (message) => {
    if (message.trim()) {
      const newItem = { text: message.trim(), isNew: true };
      // 将新消息添加到第一行
      setMarqueeItems1(prev => {
        const currentItems = [...prev];
        // 在队列开头添加新消息
        currentItems.unshift(newItem);
        return currentItems;
      });
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
              <span className="font-['Tamil_MN'] text-[22px] leading-[22px] tracking-[0.16em] text-white flex items-center">
                <span className="text-[#ffffff]">MY</span>
              </span>
              <img 
                src="/logo.svg" 
                alt="Logo" 
                className="h-8 w-8 mx-1" 
              />
              <span className="font-['Tamil_MN'] text-[22px] leading-[22px] tracking-[0.16em] text-white flex items-center">
                TRAVEL
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-9 mr-10">
            <div className="relative group">
              <button className="font-['Source_Han_Sans'] text-[14px] font-[350] leading-[20px] tracking-[0em] text-white hover:opacity-80 transition flex items-center group-hover:opacity-100">
                联系我
                <img src="/箭头_v_小_下.svg" alt="arrow" className="ml-1 transition-transform duration-300 group-hover:rotate-180" />
              </button>
              {/* 浮窗 */}
              <div className="absolute right-0 top-full mt-2 z-50 hidden group-hover:flex flex-col items-center">
                <div className="bg-white rounded-lg shadow-lg border border-gray-200 flex flex-row justify-center items-center" style={{ width: '450px', padding: '16px 8px', gap: '8px' }}>
                  <img src="/code.png" alt="二维码" style={{ width: '400px', height: 'auto' }} className="object-contain mx-auto" />
                  {/* 你可以在这里添加其他内容，如说明文字等 */}
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* 第一楼层：主标题 */}
      <section className="h-screen relative">
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/media.mp4" type="video/mp4" />
          </video>
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

      {/* 第四楼层：故事档案馆 */}
      <section className="py-20 bg-black">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-['Source_Han_Sans'] text-[32px] font-normal leading-normal tracking-[0.08em] text-white" style={{ fontVariationSettings: '"opsz" auto', fontFeatureSettings: '"kern" on' }}>
              故事在
              {currentCard && (
                <span className="ml-2">{currentCard.city}</span>
              )}
            </h2>
          </div>
          <div className="flex items-center justify-center gap-4">
            <button 
              onClick={scrollLeft}
              className="bg-black/50 hover:bg-black/70 p-2 rounded-full transition-colors flex-shrink-0"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <div className="w-[1200px] overflow-hidden">
              <div 
                ref={scrollContainerRef}
                className="flex gap-10 overflow-x-auto overflow-y-hidden snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] py-5"
                style={{
                  scrollSnapType: 'x mandatory',
                  scrollPadding: '0 400px'
                }}
              >
                {allCards.map((story, index) => (
                  <div 
                    key={index} 
                    className="card-item w-[calc((1200px-80px)/3)] snap-center flex-shrink-0 origin-center"
                    style={{
                      padding: '20px 0',
                      transform: 'translate3d(0, 0, 0)',
                      backfaceVisibility: 'hidden',
                      perspective: '1000px',
                      transformStyle: 'preserve-3d',
                      willChange: 'transform, opacity'
                    }}
                  >
                    <TravelStoryCard
                      city={story.city}
                      country={story.country}
                      imageUrl={story.imageUrl}
                      link={story.link}
                    />
                  </div>
                ))}
              </div>
            </div>

            <button 
              onClick={scrollRight}
              className="bg-black/50 hover:bg-black/70 p-2 rounded-full transition-colors flex-shrink-0"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
          {currentCard && (
            <div className="mt-10 text-center">
              <p className="text-gray-400">{currentCard.description}</p>
            </div>
          )}
        </div>
      </section>

      {/* 底部问答区域 */}
      <section className="py-10 bg-black overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="relative space-y-4">
            {/* 第一行弹幕 */}
            <div className="flex gap-4 animate-marquee-1 whitespace-nowrap">
              <div className="flex gap-4">
                {marqueeItems1.map((item, index) => (
                  <button
                    key={index}
                    className={`px-4 py-2 rounded-full transition flex-shrink-0 ${
                      item.isNew 
                        ? 'bg-gray-800/50 hover:bg-gray-700/50' 
                        : 'bg-gray-800 hover:bg-gray-700'
                    }`}
                    style={item.isNew ? {
                      opacity: 1,
                      border: '2px solid rgba(255, 255, 255, 0.15)',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)'
                    } : {}}
                  >
                    {item.text}
                  </button>
                ))}
              </div>
              <div className="flex gap-4">
                {marqueeItems1.map((item, index) => (
                  <button
                    key={`duplicate-1-${index}`}
                    className={`px-4 py-2 rounded-full transition flex-shrink-0 ${
                      item.isNew 
                        ? 'bg-gray-800/50 hover:bg-gray-700/50' 
                        : 'bg-gray-800 hover:bg-gray-700'
                    }`}
                    style={item.isNew ? {
                      opacity: 1,
                      border: '2px solid rgba(255, 255, 255, 0.15)',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)'
                    } : {}}
                  >
                    {item.text}
                  </button>
                ))}
              </div>
            </div>

            {/* 第二行弹幕 */}
            <div className="flex gap-4 animate-marquee-2 whitespace-nowrap">
              <div className="flex gap-4">
                {marqueeItems2.map((item, index) => (
                  <button
                    key={index}
                    className={`px-4 py-2 rounded-full transition flex-shrink-0 ${
                      item.isNew 
                        ? 'bg-gray-800/50 hover:bg-gray-700/50' 
                        : 'bg-gray-800 hover:bg-gray-700'
                    }`}
                    style={item.isNew ? {
                      opacity: 1,
                      border: '2px solid rgba(255, 255, 255, 0.15)',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)'
                    } : {}}
                  >
                    {item.text}
                  </button>
                ))}
              </div>
              <div className="flex gap-4">
                {marqueeItems2.map((item, index) => (
                  <button
                    key={`duplicate-2-${index}`}
                    className={`px-4 py-2 rounded-full transition flex-shrink-0 ${
                      item.isNew 
                        ? 'bg-gray-800/50 hover:bg-gray-700/50' 
                        : 'bg-gray-800 hover:bg-gray-700'
                    }`}
                    style={item.isNew ? {
                      opacity: 1,
                      border: '2px solid rgba(255, 255, 255, 0.15)',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)'
                    } : {}}
                  >
                    {item.text}
                  </button>
                ))}
              </div>
            </div>

            {/* 输入框 */}
            <div className="relative flex justify-center" style={{ marginTop: '80px', marginBottom: '80px' }}>
              <div className="relative">
                <input
                  type="text"
                  placeholder="向我提问/建议我去/分享给我..."
                  className="w-[600px] h-[40px] rounded-[20px] pl-[18px] pr-12 text-white placeholder-gray-400 focus:outline-none focus:border-[rgba(53,241,156,0.3)] transition-all"
                  style={{
                    background: 'rgba(76, 164, 124, 0.15)',
                    border: '2px solid rgba(53, 241, 156, 0.15)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    fontFamily: 'PingFang SC',
                    fontSize: '14px',
                    fontWeight: 'normal',
                    lineHeight: 'normal',
                    letterSpacing: '0em',
                    fontVariationSettings: '"opsz" auto',
                    color: 'rgba(255, 255, 255, 0.65)',
                  }}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && e.target.value.trim()) {
                      handleSendMessage(e.target.value);
                      e.target.value = '';
                    }
                  }}
                />
                <button 
                  className="absolute right-[18px] top-1/2 -translate-y-1/2 hover:opacity-80 transition-opacity"
                  onClick={() => {
                    const input = document.querySelector('input[type="text"]');
                    if (input && input.value.trim()) {
                      handleSendMessage(input.value);
                      input.value = '';
                    }
                  }}
                >
                  <img src="/纸飞机_竖_面型.svg" alt="发送" className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="py-6 bg-black border-t border-gray-800">
        <div className="container mx-auto px-4 text-center text-gray-400 text-sm">
          <p>© Designed by JINGYI OU 2025</p>
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
        @keyframes marquee-1 {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes marquee-2 {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-marquee-1 {
          animation: marquee-1 12s linear infinite;
          will-change: transform;
        }
        .animate-marquee-2 {
          animation: marquee-2 12s linear infinite;
          will-change: transform;
        }
        .animate-marquee-1:hover,
        .animate-marquee-2:hover {
          animation-play-state: paused;
        }
        /* 优化卡片缩放效果 */
        .card-item {
          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
          perspective: 1000px;
          transform-style: preserve-3d;
          will-change: transform, opacity;
          transition: transform 0.3s ease-out, opacity 0.3s ease-out;
          padding: 20px 0;
        }

        /* 确保卡片内容完全显示 */
        .card-item > div {
          height: 100%;
          display: flex;
          flex-direction: column;
        }
      `}</style>
    </div>
  );
};

export default Index;
