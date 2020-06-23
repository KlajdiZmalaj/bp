$(document).ready(function () {

    //polyfill for .remove()
    if (!('remove' in Element.prototype)) {
        Element.prototype.remove = function() {
            if (this.parentNode) {
                this.parentNode.removeChild(this);
            }
        };
    }

    var Confronta = function () {

        this.current = {
            categoria: 0,
            listino: 0,
            listinoMax: 0,
            wait: 0
        };

        this.data = {};

        this.logCurrent = function () {
            console.log(this.current);
        };

        this.setRoute = function (categoria, listino) {
            return Routing.generate(
                'confronta_listini_data',
                {
                    categoryId: categoria,
                    listinoId: listino
                }
            );
        };

        this.util = {
            showPleaseWait: function () {
                $('#privacy').modal('show');
                this.current.wait = 1;
            },
            hidePleaseWait: function () {
                $('#privacy').modal('hide');
                this.current.wait = 0;
            }
        };

        this.retrieveMaxListini = function () {
            var route = Routing.generate('confronta_listini_max', true);
            var successFunction = function (xhr) {
                this.current.listinoMax = xhr['listiniMax'];
                this.util.hidePleaseWait.call(this);
            };

            var ajaxOpt = {
                type: 'GET',
                url: route,
                success: successFunction.bind(this),
                error: function (xhr, statusText, error) {
                    console.log('status:' + statusText + '\n\nerror:' + error +
                        '\n\nxhr obj\n\n' + xhr);
                    console.log(xhr)
                }
            };
            $.ajax(ajaxOpt);
        };

        this.renderData = function () {

            var titoloCategoria = $('#page > div:nth-child(4) > div > div > ul > li > table > tbody > tr:nth-child(1) > td:nth-child(1) > h3');
            var titoloListino1 = $('.table > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(3)');
            var titoloListino2 = $('.table > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(4)');
            titoloListino1.html(this.data.nome_listino[1]);
            titoloListino2.html(this.data.nome_listino[2]);
            titoloCategoria.html(this.data.nome_categoria);

            var comparazione = this.data.comparazione;
            var index = [];
            for (i in comparazione) {
                index.push(i);
            }

            var lineMin = 3;
            var i = 0;
            var lines = document.querySelectorAll('.listino-confronto table tr');

            function renderLine(label, item, flag) {
                var prodCell = '<td colspan="2" class="voce-prod-tr">';
                var content = $('<tr>'+(flag?prodCell:'</tr><td colspan="2">') + label + '</td><td>' + item.imponibile[0] + '</td><td>' + item.anticipazione[0] + '</td><td>' + item.imponibile[1] + '</td><td>' + item.anticipazione[1] + '</td><td>' + item.imponibile[2] + '</td><td>' + item.anticipazione[2] + '</td>'+'</tr>');
                if(item.Type=='Error') {
                    item.append('<tr>'+ item.ErrorCode+'</tr>');
                }
                //$('table> tbody:last').append(item);
                return content;
            }

            function cycleComparazione(items) {
                var maxProd = Object.keys(items).length;
                for(var i = 0; i < maxProd; i++) {
                    var item = Object.keys(items)[i];
                    var obj = items[item];
                    var tr = document.querySelector('.listino-confronto table').insertRow(-1);
                    var content = renderLine(item, obj, true);
                    if(tr) {
                        $(tr).replaceWith(content);
                    }
                    if(typeof obj['opzioni'] != 'undefined') {
                        var maxOpz = Object.keys(obj['opzioni']).length;
                        for(var j = 0; j < maxOpz; j++) {
                            var opz = Object.keys(obj['opzioni'])[j];
                            var objOpz = obj['opzioni'][opz];
                            tr = document.querySelector('.listino-confronto table').insertRow(-1);
                            content = renderLine(opz, objOpz, false);
                            if(tr) {
                                $(tr).replaceWith(content);
                            }
                        }
                    }
                }
            }

            i = lineMin;
            var ln;
            while(ln = lines[i]) {
                ln.remove();
                i++;
            }

            cycleComparazione(comparazione);

            this.util.hidePleaseWait.call(this);
            console.log(this.data);

        };

        this.renderLine = function (values) {

        };

        this.contentUpdate = function () {
            var route = this.setRoute(this.current.categoria, this.current.listino);
            var successFunction = function (xhr) {
                this.data = xhr;
                this.renderData();
            };

            var ajaxOpt = {
                type: 'GET',
                url: route,
                success: successFunction.bind(this),
                error: function (xhr, statusText, error) {
                    console.log('status:' + statusText + '\n\nerror:' + error +
                        '\n\nxhr obj\n\n' + xhr);
                    console.log(xhr)
                }
            };
            $.ajax(ajaxOpt);
        };

        this.update = function () {
            this.logCurrent();
            this.util.showPleaseWait.call(this);
            this.contentUpdate.call(this);
        };

        this.next = function () {
            var max = this.current.listinoMax - 3;
            if (this.current.listino < max)
                this.current.listino += 1;
            else
                this.current.listino = 0;
            this.update();
        };


        this.prev = function () {
            var max = this.current.listinoMax - 3;
            if (this.current.listino > 0)
                this.current.listino -= 1;
            else
                this.current.listino = max;
            this.update();
        };

        this.categoria = function (which) {
            this.current.categoria = which.target.selectedIndex;
            this.update();
        };

        this.util.showPleaseWait.call(this);
        this.retrieveMaxListini();

    };

    var confronta = new Confronta();

    document.getElementById('category-select-id').value = "Seleziona Categoria";
    $('#next').click(confronta.next.bind(confronta));
    $('#prev').click(confronta.prev.bind(confronta));
    $('.category-select').on('change', confronta.categoria.bind(confronta));


    var elementPosition = $("#sticky").offset();
    //var elementPosition2 = $("#page > div:nth-child(4) > div > div > ul > li > table > tbody > tr:nth-last-child(-n+5)").offset();
    var $window = $(window);
    var windowsize = $window.width();

    function toggleFixed () {
        var parentwidth = $(".responsive-table").width();
        $("#sticky").toggleClass("fixed").width(parentwidth + 10);
    }

    function changeStickyBody() {
        var name1 = $('.responsive-table > tbody > tr:first-child > td:nth-child(3)').text();
        var name2 = $('.responsive-table > tbody > tr:first-child > td:nth-child(4)').text();
        var nameCategory = $('.responsive-table > tbody > tr:first-child > td:nth-child(1)').text();
        $('.text1').html(name1);
        $('.text2').html(name2);
        $('.name-category').html(nameCategory);
    }

    $(window).scroll(function () {
        var elementPosition2 = $('.footer').offset();
        if ($(window).scrollTop() > elementPosition.top && $(window).scrollTop() < elementPosition2.top - 160) {
            $("#sticky").css("display", "block");
            changeStickyBody();
            if (windowsize <= 1024) {
                $("#sticky").css("position", "fixed");
            } else {
                $("#sticky").css("position", "fixed");
            }
        } else {
            $("#sticky").css("display", "none");
        }
    });

    toggleFixed();
    $(window).bind('resize', function() {
        toggleFixed();
    });

});