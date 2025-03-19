(function($) {
    $.spapp = function(options) {
        var settings = $.extend({
            defaultView: 'home',
            templateDir: './views/',
            pageNotFound: 'home.html'
        }, options);

        window.loadPage = function(href) {
            var $targetView = $('#' + href);
            
            if ($targetView.length) {
                $('[data-load]').removeClass('active');
                $targetView.addClass('active');
                
                $.get(settings.templateDir + href + '.html', function(data) {
                    $targetView.html(data);
                    $(document).trigger('spapp.page.ready');
                }).fail(function() {
                    $.get(settings.templateDir + settings.pageNotFound, function(data) {
                        $targetView.html(data);
                    });
                });
            }
        };

        $(window).on('hashchange', function() {
            var href = location.hash.slice(1) || settings.defaultView;
            loadPage(href);
        });

        // Initial load
        var href = location.hash.slice(1) || settings.defaultView;
        loadPage(href);

        return this;
    };
})(jQuery);