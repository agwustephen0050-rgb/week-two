// ===========================
// MOBILE NAVIGATION
// ===========================

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

if (menuToggle && mainNav) {

    menuToggle.addEventListener("click", function () {

        mainNav.classList.toggle("active");

        if (mainNav.classList.contains("active")) {
            menuToggle.textContent = "✕";
        } else {
            menuToggle.textContent = "☰";
        }

    });

}

// ===========================
// DARK / LIGHT MODE
// ===========================

const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {

    // Check if the user previously selected dark mode
    const savedTheme = localStorage.getItem("skillforge-theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
        themeToggle.textContent = "☀️";
    }

    // Toggle theme when button is clicked
    themeToggle.addEventListener("click", function () {

        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {

            themeToggle.textContent = "☀️";

            localStorage.setItem("skillforge-theme", "dark");

        } else {

            themeToggle.textContent = "🌙";

            localStorage.setItem("skillforge-theme", "light");

        }

    });

}

// ===========================
// MULTI-STEP REGISTRATION FORM
// ===========================

const registrationForm = document.getElementById("registrationForm");

if (registrationForm) {

    const formSteps = document.querySelectorAll(".form-step");
    const nextButtons = document.querySelectorAll(".form-next");
    const previousButtons = document.querySelectorAll(".form-prev");

    let currentStep = 0;


    // Show a specific step
    function showStep(step) {

        formSteps.forEach(function(formStep, index) {

            formStep.classList.toggle(
                "active-step",
                index === step
            );

        });

        // Update the progress indicators
        const progressSteps = document.querySelectorAll(".steps .step");

        progressSteps.forEach(function(progressStep, index) {

            progressStep.classList.toggle(
                "active",
                index === step
            );

        });

    }


    // Next button
    nextButtons.forEach(function(button) {

        button.addEventListener("click", function() {

            const currentFields =
                formSteps[currentStep].querySelectorAll(
                    "input, select, textarea"
                );

            let valid = true;

            currentFields.forEach(function(field) {

                if (!field.checkValidity()) {
                    field.reportValidity();
                    valid = false;
                }

            });

            if (!valid) {
                return;
            }

            if (currentStep < formSteps.length - 1) {

                currentStep++;

                showStep(currentStep);

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }

        });

    });


    // Previous button
    previousButtons.forEach(function(button) {

        button.addEventListener("click", function() {

            if (currentStep > 0) {

                currentStep--;

                showStep(currentStep);

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }

        });

    });


    // Password confirmation
    registrationForm.addEventListener("submit", function(event) {

        const password =
            document.getElementById("password").value;

        const confirmPassword =
            document.getElementById("confirmPassword").value;


        if (password !== confirmPassword) {

            event.preventDefault();

            alert("Passwords do not match. Please check again.");

            return;
        }

        alert("Registration form completed successfully!");

    });

}

// ===========================
// FAQ ACCORDION
// ===========================

const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach(function(question) {

    question.addEventListener("click", function() {

        const faqItem = question.parentElement;

        faqItem.classList.toggle("active");

    });

});

// ===========================
// ANIMATED STATISTICS
// ===========================

const counters = document.querySelectorAll(".counter");

let countersStarted = false;

function startCounters() {

    if (countersStarted) {
        return;
    }

    countersStarted = true;

    counters.forEach(function(counter) {

        const target = Number(counter.dataset.target);

        let current = 0;

        const increment = target / 100;

        const updateCounter = setInterval(function() {

            current += increment;

            if (current >= target) {

                counter.textContent = target;

                clearInterval(updateCounter);

            } else {

                counter.textContent = Math.floor(current);

            }

        }, 20);

    });

}

const statisticsSection = document.querySelector(".statistics");

if (statisticsSection) {

    const statisticsObserver = new IntersectionObserver(
        function(entries) {

            entries.forEach(function(entry) {

                if (entry.isIntersecting) {

                    startCounters();

                    statisticsObserver.unobserve(statisticsSection);

                }

            });

        },
        {
            threshold: 0.3
        }
    );

    statisticsObserver.observe(statisticsSection);

}
// ===========================
// SCROLL REVEAL ANIMATION
// ===========================

const revealElements = document.querySelectorAll(
    ".reveal"
);

if (revealElements.length > 0) {

    const revealObserver = new IntersectionObserver(
        function(entries, observer) {

            entries.forEach(function(entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.15
        }
    );

    revealElements.forEach(function(element) {

        revealObserver.observe(element);

    });

}

// ===========================
// BACK TO TOP BUTTON
// ===========================

const backToTop = document.getElementById("backToTop");

if (backToTop) {

    window.addEventListener("scroll", function() {

        if (window.scrollY > 400) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    });


    backToTop.addEventListener("click", function() {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}

// ===========================
// ACTIVE NAVIGATION LINK
// ===========================

const currentPage =
    window.location.pathname.split("/").pop() || "index.html";

const navLinks =
    document.querySelectorAll("#mainNav a");

navLinks.forEach(function(link) {

    const linkPage =
        link.getAttribute("href").split("#")[0];

    if (linkPage === currentPage) {

        link.classList.add("active-link");

    }

});

// ===========================
// PROGRAMME SEARCH & FILTER
// ===========================

const programmeSearch =
    document.getElementById("programmeSearch");

const filterButtons =
    document.querySelectorAll(".filter-btn");

const programmeCards =
    document.querySelectorAll(".programme-card");

const noResults =
    document.getElementById("noResults");


if (
    programmeSearch &&
    programmeCards.length > 0
) {

    let selectedFilter = "all";


    function filterProgrammes() {

        const searchText =
            programmeSearch.value.toLowerCase().trim();

        let visibleCount = 0;


        programmeCards.forEach(function(card) {

            const title =
                card.textContent.toLowerCase();

            const category =
                card.dataset.category;


            const matchesSearch =
                title.includes(searchText);

            const matchesCategory =
                selectedFilter === "all" ||
                category === selectedFilter;


            if (matchesSearch && matchesCategory) {

                card.classList.remove(
                    "hidden-programme"
                );

                visibleCount++;

            } else {

                card.classList.add(
                    "hidden-programme"
                );

            }

        });


        if (visibleCount === 0) {

            noResults.style.display = "block";

        } else {

            noResults.style.display = "none";

        }

    }


    // Search
    programmeSearch.addEventListener(
        "input",
        filterProgrammes
    );


    // Category buttons
    filterButtons.forEach(function(button) {

        button.addEventListener(
            "click",
            function() {

                filterButtons.forEach(
                    function(btn) {

                        btn.classList.remove(
                            "active-filter"
                        );

                    }
                );


                button.classList.add(
                    "active-filter"
                );


                selectedFilter =
                    button.dataset.filter;


                filterProgrammes();

            }
        );

    });

}

// ===========================
// CONTACT FORM
// ===========================

const contactForm =
    document.getElementById("contactForm");

const contactMessage =
    document.getElementById("contactMessage");

const messageCount =
    document.getElementById("messageCount");

const contactSuccess =
    document.getElementById("contactSuccess");

const newMessage =
    document.getElementById("newMessage");


if (
    contactForm &&
    contactMessage &&
    messageCount
) {

    // Character counters
    contactMessage.addEventListener(
        "input",
        function() {

            messageCount.textContent =
                contactMessage.value.length;

        }
    );


    // Form submission
    contactForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();

            // Check HTML validation
            if (!contactForm.checkValidity()) {

                contactForm.reportValidity();

                return;

            }


            // Show success message
            contactForm.style.display = "none";

            contactSuccess.classList.add("show");

            // Scroll to success message
            contactSuccess.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        }
    );


    // Send another message
    if (newMessage) {

        newMessage.addEventListener(
            "click",
            function() {

                contactForm.reset();

                messageCount.textContent = "0";

                contactSuccess.classList.remove("show");

                contactForm.style.display = "block";

                contactForm.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            }
        );

    }

}