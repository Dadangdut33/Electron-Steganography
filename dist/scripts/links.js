// open link in browser (not in electron app)
document.body.addEventListener("click", function (event) {
    if (event.target.tagName.toLowerCase() === "a" || event.target.tagName.toLowerCase() === "span") {
        if (event.target.id === "ext") {
            event.preventDefault();
            var target = event.target.href ? event.target.href : event.target.parentElement.href;
            require("electron").shell.openExternal(target);
        }
    }
});
//# sourceMappingURL=links.js.map