$(document).ready(function() {
    SetCurrentLanguage();

    //highlight the code on page load.
    $('pre code#code-formatted').each(function() {
        ReloadCodeContent();
    });

    //load the content of the textarea to the formatted area on every change.
    $('#code-input').on('input', function() {
        ReloadCodeContent();
    });

    //get the current size of the font after changing the slider.
    $('input#range-text-size').on('input', function() {
        ReloadView();
    });

    //get the language of the current selection after change.
    $('select#select-language').change(function() {
        SetCurrentLanguage();
        ReloadCodeContent();
    });

    //reload the view on image size change.
    $('select#select-image-size').on('input', function() {
        ReloadView();
    });

    //button click event to download the code.
    $("button#image-download").click(function() {
        html2canvas($("#code-formatted").get(0), {'logging': false}).then(canvas => {
            var itemHyperlink = document.createElement("a");
            itemHyperlink.href = canvas.toDataURL('image/png');
            itemHyperlink.setAttribute("download", 'code' + Date.now() + '.png');
            itemHyperlink.click();
        });
    });
});

/**
 * function to reload the content and highlight the code.
 */
function ReloadCodeContent() {
    $('pre code#code-formatted').text($('#code-input').val());
    hljs.highlightBlock($('pre code#code-formatted').get(0));
}

/**
 * function to set the selected language for syntax highlightning.
 */
function SetCurrentLanguage() {
    $('pre code#code-formatted').attr('class', 'lang-' + ($('select#select-language').find('option:selected').val() || ''));
}

/**
 * function to reload the view after changes on font size or image size.
 */
function ReloadView() {
    
    //get the image size from the select.
    var arrImageSizes = ($('select#select-image-size').val() || '').split('-');

    //get the font size from range slider.
    var strFontSize = ($('input#range-text-size').val() ||  '');

    //set the image size and font size to the pre and code element.
    $('pre').attr('style', 'width: ' + arrImageSizes[0] + 'px; height: ' + arrImageSizes[1] + 'px;');
    $('pre code').attr('style', 'width: ' + arrImageSizes[0] + 'px; height: ' + arrImageSizes[1] + 'px; font-size: ' + strFontSize + 'em;');
}