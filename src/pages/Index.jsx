import { Mail, MapPin } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* 顶栏 */}
      <header className="fixed top-0 left-0 right-0 bg-transparent z-50">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img 
              src="https://s3plus.sankuai.com/mcopilot-pub/nocode_image/default/image-cxgcxem0eco83o5dkq5fnmqfck4ev1.png" 
              alt="Logo" 
              className="h-8 w-8" 
            />
            <span className="text-lg font-bold">MY TRAVEL</span>
          </div>
          <div className="flex items-center space-x-4">
            <MapPin className="h-5 w-5" />
            <Mail className="h-5 w-5" />
          </div>
        </nav>
      </header>

      {/* 第一楼层：主标题 */}
      <section className="h-screen relative flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src="https://s3plus.sankuai.com/v1/mss_550586fa454f41e7980b6520e3e2e6af/mcopilot-pub/nocode_image/default/image-cxgcxem0eco83o5dkq5fnmqfck4ev1.png"
            className="w-full h-full object-cover"
            alt="背景图片"
          />
        </div>
        <div className="relative text-center">
          <h1 className="text-6xl font-bold mb-8">跟我看世界</h1>
          <button className="bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full text-white hover:bg-white/30 transition">
            探索你的旅程 →
          </button>
        </div>
      </section>

      {/* 第二楼层：数据统计 */}
      <section className="py-20 bg-black">
        <div className="container mx-auto text-center">
          <div className="flex justify-center space-x-20">
            <div>
              <h2 className="text-4xl font-bold">15+</h2>
              <p className="text-gray-400">国家</p>
            </div>
            <div>
              <h2 className="text-4xl font-bold">50+</h2>
              <p className="text-gray-400">个地区</p>
            </div>
          </div>
        </div>
      </section>

      {/* 第三楼层：世界地图 */}
      <section className="py-20 bg-black">
        <div className="container mx-auto">
          <img
            src="https://s3plus.sankuai.com/v1/mss_550586fa454f41e7980b6520e3e2e6af/mcopilot-pub/nocode_image/default/image-cxgcxem0eco83o5dkq5fnmqfck4ev1.png"
            className="w-full max-w-4xl mx-auto opacity-70"
            alt="世界地图"
          />
        </div>
      </section>

      {/* 第四楼层：故事档案馆 */}
      <section className="py-20 bg-black">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">故事档案馆</h2>
          <div className="flex gap-4 overflow-x-auto pb-8">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="min-w-[300px] bg-gray-900 rounded-lg overflow-hidden">
                <img
                  src="https://s3plus.sankuai.com/v1/mss_550586fa454f41e7980b6520e3e2e6af/mcopilot-pub/nocode_image/default/image-cxgcxem0eco83o5dkq5fnmqfck4ev1.png"
                  className="w-full h-48 object-cover"
                  alt={`旅行故事 ${item}`}
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">格拉斯哥, 英国</h3>
                  <p className="text-gray-400">这是一段旅行故事的简短描述，记录下旅途中的精彩瞬间...</p>
                </div>
              </div>
            ))}
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
    </div>
  );
};

export default Index;
