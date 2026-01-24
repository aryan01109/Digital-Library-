        const faqItems = document.querySelectorAll('.faq-item');

        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            const icon = item.querySelector('.icon i');

            question.addEventListener('click', () => {
                // Check if this item is already active
                const isActive = item.classList.contains('active');

                // Close all other items (optional - keeps it clean)
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').style.maxHeight = null;
                    otherItem.querySelector('.icon i').classList.replace('fa-xmark', 'fa-plus');
                });

                // Toggle current item
                if (!isActive) {
                    item.classList.add('active');
                    answer.style.maxHeight = answer.scrollHeight + "px"; // Smooth animation height
                    icon.classList.replace('fa-plus', 'fa-xmark'); // Change icon to X
                } else {
                    item.classList.remove('active');
                    answer.style.maxHeight = null;
                    icon.classList.replace('fa-xmark', 'fa-plus'); // Change icon back to +
                }
            });
        });