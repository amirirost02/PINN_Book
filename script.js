// ════════════════════════════════════════════════════════════
// اسکریپت‌های مشترک کتاب: ناوبری خودکار + دکمه‌ی کپی
// ════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', function () {

    // ──────────────────────────────────────────────────────
    // ۱. ناوبری خودکار بین فصل‌ها (بر اساس شماره فایل)
    // ──────────────────────────────────────────────────────

    const path = window.location.pathname;
    const currentFile = path.substring(path.lastIndexOf('/') + 1);
    const match = currentFile.match(/chapter(\d+)\.html/);

    if (match) {
        const currentChapter = parseInt(match[1]);
        const prevChapter = currentChapter - 1;
        const nextChapter = currentChapter + 1;

        let navHTML = `
            <div class="book-nav">
                <a href="index.html" class="nav-home">🏠 فهرست</a>
                <div class="nav-arrows">
        `;

        if (prevChapter >= 1) {
            navHTML += `<a href="chapter${prevChapter}.html" class="nav-prev">← فصل قبل</a>`;
        } else {
            navHTML += `<span class="nav-disabled">← فصل قبل</span>`;
        }

        if (nextChapter <= 99) {
            navHTML += `<a href="chapter${nextChapter}.html" class="nav-next">فصل بعد →</a>`;
        } else {
            navHTML += `<span class="nav-disabled">فصل بعد →</span>`;
        }

        navHTML += `
                </div>
            </div>
        `;

        const footer = document.querySelector('.footer-line');
        if (footer) {
            const navContainer = document.createElement('div');
            navContainer.innerHTML = navHTML;
            footer.parentNode.insertBefore(navContainer.firstElementChild, footer);
        }
    }

    // ──────────────────────────────────────────────────────
    // ۲. دکمه‌ی کپی کد برای بلوک‌های کد
    // ──────────────────────────────────────────────────────

    const codeBlocks = document.querySelectorAll('.codeblock');

    codeBlocks.forEach(function (block) {
        const copyBtn = document.createElement('button');
        copyBtn.textContent = '📋 کپی';
        copyBtn.className = 'copy-btn';

        copyBtn.addEventListener('click', function () {
            const codeContent = block.textContent;

            navigator.clipboard.writeText(codeContent).then(function () {
                const originalText = copyBtn.textContent;
                copyBtn.textContent = '✅ کپی شد!';
                setTimeout(function () {
                    copyBtn.textContent = originalText;
                }, 2000);
            }).catch(function () {
                // روش جایگزین برای مرورگرهای قدیمی
                const textarea = document.createElement('textarea');
                textarea.value = codeContent;
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);

                const originalText = copyBtn.textContent;
                copyBtn.textContent = '✅ کپی شد!';
                setTimeout(function () {
                    copyBtn.textContent = originalText;
                }, 2000);
            });
        });

        block.prepend(copyBtn);
    });

});