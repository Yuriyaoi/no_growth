(function () {
    let score = 0; // ตัวแปรเก็บคะแนน เริ่มที่ 0

    // ส่วน Logic (Process)
    window.feedNo = function (event) {

        // 1. สร้างขนม
        const candy = document.createElement('div');
        candy.className = 'candy-fly';
        const sweets = ['🍪', '🍩', '🍰', '🧁', '🍭']; // สุ่มขนมจะได้ไม่เบื่อ
        candy.innerText = sweets[Math.floor(Math.random() * sweets.length)];
        document.body.appendChild(candy);
        const sound = document.getElementById('eat-sound');
        // 2. ฟังก์ชันช่วยหาตำแหน่งปัจจุบันของรูปน้อง
        const getTargetPos = () => {
            const img = document.getElementById('no-img').getBoundingClientRect();
            return {
                x: img.left + img.width / 2,
                y: img.top + img.height / 2
            };
        };
        const startPos = getTargetPos();
        // 3. จุดเริ่มต้น: อยู่ทางซ้ายของตำแหน่ง Y ปัจจุบัน
        candy.style.left = (startPos.x - 300) + 'px'; // ห่างออกมาหน่อย
        candy.style.top = startPos.y + 'px';
        candy.style.opacity = '0';

        // 4. สั่งให้บินไป (เช็คตำแหน่ง Y ใหม่อีกรอบเผื่อน้องอ้วนขึ้นขวางทาง)
        setTimeout(() => {
            const currentPos = getTargetPos(); // คำนวณ Y ใหม่
            candy.style.opacity = '1';
            candy.style.left = (currentPos.x - 50) + 'px';
            candy.style.top = currentPos.y + 'px'; // อัปเดต Y ให้ตรงปากพอดี
            sound.currentTime = 0; // Reset เสียงให้เริ่มใหม่ทุกครั้งที่กด (ป้องกันรัวปุ่มแล้วเสียงไม่ขึ้น)
            sound.play();
        }, 50);

        // 4. กินเสร็จแล้วลบออก
        setTimeout(() => {
            candy.classList.add('candy-fade'); // ค่อยๆ จาง
            setTimeout(() => candy.remove(), 500); // ลบออกจากหน้าเว็บ
            updateUI();

        }, 600);
    };
    // ดักจับการพยายามแฮ็กตัวแปร score
    Object.defineProperty(window, 'score', {
        set: function (value) {
            triggerNightmare();
        }
    });

    function updateUI() {
        score = score + 1; // บวกเพิ่มทีละหนึ่ง
        document.getElementById("score").innerText = score; // โชว์คะแนนใหม่

        let img = document.getElementById("no-img");
        let status = document.getElementById("status-text");

        // 🧠 นี่คือ Logic Range (0-50, 51-80, 81+)
        if (score <= 30) {
            // State: ผอมโซ
            img.src = "assets/images/no_thin.jpg";
            img.style.width = "250px";
            status.innerText = "กำลังหิวโหย...";
        } else if (score <= 80) {
            // State: เริ่มมีกิน
            img.src = "assets/images/no_normal.jpg";
            img.style.width = "300px"; // ขยายขนาดนิดหน่อย
            status.innerText = "เริ่มมีแก้มแล้ว!";
        } else {
            // State: SUPER FAT (เวอร์ชันพุงป่องอิ่มจนเดินไม่ไหว!)
            img.src = "assets/images/no_superfat.jpg";
            img.style.width = "400px"; // ขยายร่างใหญ่สุดๆ
            status.innerText = "อิ่มจนพุงกาง เดินไม่ไหวแล้ว!! (Super Fat)";
        }
    }

    function triggerNightmare() {
        // ถ้ามีใครพยายามเปลี่ยนคะแนนจาก Console...
        alert("แกพยายามโกงเหรอ?!");
        document.body.classList.add('nightmare-mode');
        document.getElementById('no-img').src = 'assets/images/cheat.jpg';
        document.getElementById('status-text').innerText = "แกทำอะไรลงไป...";
    }
})();

