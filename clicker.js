// ==UserScript==
// @name         Udemy keyboard integration
// @namespace    http://tampermonkey.net/
// @version      2025-10-24
// @description  Fix lack of keyboard controls for Udemy
// @author       kveola13
// @match        https://www.udemy.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=udemy.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    /**
     * Finds a button or a link-as-button by its visible text and clicks it.
     * This is more robust than using CSS selectors which can change frequently.
     * @param {string} text - The exact (case-insensitive) text on the button.
     */
    function findAndClickButtonByText(text) {
        const lowerCaseText = text.toLowerCase();
        let elements = document.querySelectorAll('button');
        for (const button of elements) {
            if (button.textContent.trim().toLowerCase() === lowerCaseText) {
                console.log(`Tampermonkey: Clicking <button> "${text}"`);
                button.click();
                return true;
            }
        }
        let spans = document.querySelectorAll('button span');
        for (const span of spans) {
            if (span.textContent.trim().toLowerCase() === lowerCaseText) {
                console.log(`Tampermonkey: Clicking <button> with <span> "${text}"`);
                span.closest('button').click();
                return true;
            }
        }
        let links = document.querySelectorAll('a');
        for (const link of links) {
             if (link.textContent.trim().toLowerCase() === lowerCaseText) {
                link.click();
                return true;
            }
        }
        return false;
    }

    document.addEventListener('keydown', function(event) {
        if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
            return;
        }
        if (event.key === 'Enter') {
            event.preventDefault();
            if (!findAndClickButtonByText('Check answer')) {
                findAndClickButtonByText('Check');
            }
        }
        if (event.key === 'Enter') {
            event.preventDefault();
            if (!findAndClickButtonByText('Next question')) {
                findAndClickButtonByText('Next');
            }
        }
        if (event.key === 'Enter') {
            event.preventDefault();
            if (!findAndClickButtonByText('Begin test')) {
                findAndClickButtonByText('Begin test');
            }
        }
        if (event.key === 'f') {
            event.preventDefault();
            if (!findAndClickButtonByText('Finish test')) {
                findAndClickButtonByText('Finish test');
            }
        }
        if (event.key === 'Backspace') {
            event.preventDefault();
            if (!findAndClickButtonByText('Back')) {
                findAndClickButtonByText('Back');
            }
        }
    });
})();
