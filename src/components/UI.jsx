import { atom, useAtom } from "jotai";
import { useEffect, useState } from "react";

const pictures = [
  "dot",
  "DSC00933",
  "DSC00966",
  "DSC00983",
  "DSC01011",
  "DSC01040",
  "DSC01064",
  "DSC01071",
  "DSC01103",
  "DSC01145",
  "DSC01420",
  "DSC01461",
  "DSC01489",
  "DSC02031",
  "DSC02064",
  "DSC02069",
];

export const pageAtom = atom(0);
export const bookOpenAtom = atom(false);

// Nội dung cho từng trang
const pageContents = {
  0: {
    title: "Chủ Tịch Hồ Chí Minh",
    content:
      "Chủ tịch Hồ Chí Minh (1890-1969) là vị lãnh tụ vĩ đại của dân tộc Việt Nam, người đã lãnh đạo nhân dân ta trong cuộc đấu tranh giành độc lập dân tộc và thống nhất đất nước. Người là biểu tượng của tinh thần yêu nước, ý chí kiên cường và đạo đức cách mạng cao cả.",
  },
  1: {
    title: "Cuộc Đấu Tranh Giải Phóng",
    content:
      "Cuộc đấu tranh giải phóng dân tộc Việt Nam là một trang sử hào hùng, thể hiện ý chí bất khuất của nhân dân ta trong việc giành lại độc lập, tự do. Từ những năm tháng gian khổ đến chiến thắng vẻ vang, mỗi bước đi đều ghi dấu sự hy sinh và cống hiến của các thế hệ.",
  },
  2: {
    title: "Độc Lập Dân Tộc",
    content:
      "Độc lập dân tộc là mục tiêu thiêng liêng mà toàn thể nhân dân Việt Nam đã đấu tranh để giành lấy. Đây không chỉ là quyền tự quyết của một dân tộc mà còn là nền tảng cho sự phát triển bền vững và thịnh vượng của đất nước.",
  },
  3: {
    title: "Tự Do và Dân Chủ",
    content:
      "Tự do và dân chủ là những giá trị cốt lõi mà nhân dân Việt Nam luôn hướng tới. Trong một xã hội tự do, mỗi công dân đều có quyền được sống, làm việc và phát triển trong môi trường công bằng và bình đẳng.",
  },
  4: {
    title: "Hạnh Phúc Nhân Dân",
    content:
      "Hạnh phúc của nhân dân là mục tiêu cao nhất của mọi chính sách và hành động. Đó là sự kết hợp hài hòa giữa phát triển kinh tế, công bằng xã hội và bảo vệ môi trường, tạo nên một cuộc sống đầy đủ và ý nghĩa cho mọi người dân.",
  },
};

export const pages = [
  {
    front: "HCM",
    back: pictures[0],
  },
];
for (let i = 1; i < pictures.length - 1; i += 2) {
  pages.push({
    front: pictures[i % pictures.length],
    back: pictures[(i + 1) % pictures.length],
  });
}

pages.push({
  front: pictures[pictures.length - 1],
  back: "Chủ Tịch Hồ Chí Minh",
});

// Component hiển thị nội dung trang
const PageContent = ({ pageNumber, isOpen }) => {
  const content = pageContents[pageNumber] || pageContents[0];
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!isOpen) return null;

  // Mobile layout: content ở dưới màn hình
  if (isMobile) {
    return (
      <div className="fixed bottom-0 left-0 right-0 h-[50vh] bg-gradient-to-t from-black/90 to-black/50 backdrop-blur-sm z-5 pointer-events-none flex items-center justify-center p-4 transform transition-transform duration-500 ease-in-out">
        <div className="text-white max-w-full pointer-events-auto w-full text-center">
          <h2 className="text-2xl font-bold mb-4 break-words">
            {content.title}
          </h2>
          <p className="text-base leading-relaxed break-words">
            {content.content}
          </p>
        </div>
      </div>
    );
  }

  // Desktop layout: content ở bên trái
  return (
    <div className="fixed left-0 top-0 h-full w-[30vw] min-w-[300px] max-w-[90vw] bg-gradient-to-r from-black/80 to-black/20 backdrop-blur-sm z-5 pointer-events-none flex items-center justify-center p-8 pb-28 transform transition-transform duration-500 ease-in-out">
      <div className="text-white max-w-lg pointer-events-auto w-full">
        <h2 className="text-4xl font-bold mb-6 text-center break-words">
          {content.title}
        </h2>
        <p className="text-lg leading-relaxed text-center break-words">
          {content.content}
        </p>
      </div>
    </div>
  );
};

export const UI = () => {
  const [page, setPage] = useAtom(pageAtom);
  const [bookOpen, setBookOpen] = useAtom(bookOpenAtom);
  const [bgKey, setBgKey] = useState("1");
  const [audioEnabled, setAudioEnabled] = useState(false);

  // Khởi tạo audio và enable sau user interaction
  useEffect(() => {
    const enableAudio = () => {
      setAudioEnabled(true);
      document.removeEventListener("click", enableAudio);
      document.removeEventListener("touchstart", enableAudio);
    };

    document.addEventListener("click", enableAudio);
    document.addEventListener("touchstart", enableAudio);

    return () => {
      document.removeEventListener("click", enableAudio);
      document.removeEventListener("touchstart", enableAudio);
    };
  }, []);

  useEffect(() => {
    if (!audioEnabled) return;

    const audio = new Audio("/audios/page-flip-01a.mp3");
    audio.volume = 0.3; // Giảm volume để không quá to

    const playAudio = async () => {
      try {
        await audio.play();
      } catch (error) {
        console.log("Audio play failed:", error.message);
        // Không hiển thị error để tránh làm phiền user
      }
    };

    playAudio();
  }, [page, audioEnabled]);

  // Tự động mở sách khi click vào trang
  const handlePageClick = (pageNumber) => {
    setPage(pageNumber);
    setBookOpen(true);
  };

  return (
    <>
      <main className="pointer-events-none select-none z-10 fixed inset-0 flex justify-between flex-col overflow-x-hidden">
        <a className="pointer-events-auto mt-10 ml-10" href="">
          <img
            className="w-20 max-w-full"
            src="/images/wawasensei-white.png"
            alt="WAWA SENSEI"
          />
        </a>
        {/* Switch background options - dropdown top-center */}
        <div className="pointer-events-auto fixed top-6 left-1/2 -translate-x-1/2 z-30">
          <select
            className="bg-black/40 text-white px-3 py-2 rounded-lg border border-white/30 backdrop-blur-sm text-sm md:text-base"
            value={bgKey}
            onChange={(e) => {
              const value = e.target.value;
              setBgKey(value);
              const map = {
                1: "/textures/background.jpg",
                2: "/textures/DSC01040.jpg",
                3: "/textures/DSC02064.jpg",
              };
              document.documentElement.style.setProperty(
                "--app-bg-image",
                `url('${map[value]}')`
              );
            }}
          >
            <option value="1">Hình nền 1</option>
            <option value="2">Hình nền 2</option>
            <option value="3">Hình nền 3</option>
          </select>
        </div>
        <div className="w-full overflow-x-auto pointer-events-auto flex justify-center">
          <div className="overflow-x-auto flex items-center gap-2 md:gap-4 max-w-full p-2 md:p-10">
            {[...pages].map((_, index) => (
              <button
                key={index}
                className={`border-transparent hover:border-white transition-all duration-300 px-2 py-1 md:px-4 md:py-3 rounded-full text-xs md:text-lg uppercase shrink-0 border min-h-[44px] ${
                  index === page
                    ? "bg-white/90 text-black"
                    : "bg-black/30 text-white"
                }`}
                onClick={() => handlePageClick(index)}
              >
                {index === 0 ? "Mặt trước" : `Trang ${index}`}
              </button>
            ))}
            <button
              className={`border-transparent hover:border-white transition-all duration-300 px-2 py-1 md:px-4 md:py-3 rounded-full text-xs md:text-lg uppercase shrink-0 border min-h-[44px] ${
                page === pages.length
                  ? "bg-white/90 text-black"
                  : "bg-black/30 text-white"
              }`}
              onClick={() => handlePageClick(pages.length)}
            >
              Mặt sau
            </button>
          </div>
        </div>
      </main>

      {/* Hiển thị nội dung trang khi sách mở */}
      <PageContent pageNumber={page} isOpen={bookOpen} />

      {/* Nút đóng sách */}
      {bookOpen && (
        <button
          className="fixed top-4 right-4 z-30 bg-white/90 text-black px-3 py-2 md:px-4 md:py-2 rounded-full hover:bg-white transition-all duration-300 text-sm md:text-base min-h-[44px] min-w-[44px] flex items-center justify-center"
          onClick={() => setBookOpen(false)}
        >
          ✕ Đóng
        </button>
      )}
    </>
  );
};
