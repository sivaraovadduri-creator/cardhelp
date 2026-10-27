document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('contactForm');
    var btn = document.getElementById('submitBtn');
    var status = document.getElementById('status');

    // Replace with the email that should receive the data
    var FORMSUBMIT_URL = 'https://formsubmit.co/ajax/hedkeytraining@gmail.com';

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        // Collect all form fields (a, b, c, d, e, f, g, h, tid)
        var data = {};
        new FormData(form).forEach(function (value, key) {
            data[key] = value;
        });

        // FormSubmit options
        data._subject = 'New Form Submission';
        data._template = 'table';
        data._captcha = 'false';
        if (data.d) {
            data._replyto = data.d; // reply goes to the user's email
        }

        btn.disabled = true;
        btn.classList.add('loading');
        status.textContent = 'Sending...';

        fetch(FORMSUBMIT_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(function (res) { return res.json(); })
            .then(function (result) {
                if (result.success === 'true' || result.success === true) {
                    status.textContent = 'Message sent successfully! Redirecting...';
                    form.reset();
                    window.location.href = 'check-eligibility-step3.html';
                } else {
                    status.textContent = result.message || 'Could not send. Please try again.';
                }
            })
            .catch(function () {
                status.textContent = 'Something went wrong. Please try again.';
            })
            .finally(function () {
                btn.disabled = false;
                btn.classList.remove('loading');
            });
    });
});