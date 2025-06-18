window.addEventListener("load", () => {
  const canvas_eles = document.querySelectorAll("#sourceImg");
  canvas_eles.forEach((canvas_ele,index) => {
    function cropTransparentFromURL(...imageURL) {
        const img = new Image();
        img.crossOrigin = "anonymous"; // สำคัญถ้าภาพมาจากโดเมนอื่น
        img.src = imageURL[index];

        img.onload = () => {
            const ctx = canvas_ele.getContext("2d");

            canvas_ele.width = img.width;
            canvas_ele.height = img.height;
            ctx.drawImage(img, 0, 0);

            const imageData = ctx.getImageData(0, 0, canvas_ele.width, canvas_ele.height);
            const { data, width, height } = imageData;

            let top = null, left = null, right = null, bottom = null;

            for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const alpha = data[(width * y + x) * 4 + 3];
                if (alpha !== 0) {
                if (top === null) top = y;
                if (left === null || x < left) left = x;
                if (right === null || x > right) right = x;
                if (bottom === null || y > bottom) bottom = y;
                }
            }
            }

            if (top !== null) {
            const cropWidth = right - left + 1;
            const cropHeight = bottom - top + 1;
            const croppedImage = ctx.getImageData(left, top, cropWidth, cropHeight);

            // resize canvas_ele
            canvas_ele.width = cropWidth;
            canvas_ele.height = cropHeight;
            ctx.putImageData(croppedImage, 0, 0);

            } else {
            console.log("ไม่พบพิกเซลที่ไม่โปร่งใส");
            }
        };
    }

    // 🔽 เรียกใช้โดยใส่ URL ภาพ .png ที่มีพื้นหลังโปร่งใส
    cropTransparentFromURL("img/imgs_skill/html5-logo-31820.png","img/imgs_skill/html5-logo-31821.png","img/imgs_skill/javascript-39400.png"
        ,"img/imgs_skill/bootstrap-4-logo-png-transparent.png","img/imgs_skill/node-js-removebg-preview.png","img/imgs_skill/Adobe-Photoshop-Logo-700x394.png"
        ,"img/imgs_skill/PHP-Logo-Free-Download-PNG.png","img/imgs_skill/phpmyadmin-icon-5605.png","img/imgs_skill/GitHub-Logo-700x394.png"
        ,"img/imgs_skill/SweetAlert2.png"
    );
});

});