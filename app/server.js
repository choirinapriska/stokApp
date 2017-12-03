var api_url = 'http://localhost:5000/';
var app = angular.module('npAdmin', ['ui.router']);

app.config(['$httpProvider', '$stateProvider', '$urlRouterProvider',
  function($httpProvider, $stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('common', {
        templateUrl: 'views/tpl.common.html',
        abstract: true,
      })
      .state('kategori', {
        url: '/kategori',
        parent: 'common',
        templateUrl: 'views/tpl.kategori.html',
        // controller: 'kategoriController'
      })
      .state('barang', {
        url: '/barang',
        parent: 'common',
        templateUrl: 'views/tpl.barang.html',
        // controller: 'kategoriController'
      })
      .state('dapur', {
        url: '/dapur',
        parent: 'common',
        templateUrl: 'views/tpl.dapur.html',
      })
      .state('departemen', {
        url: '/departemen',
        parent: 'common',
        templateUrl: 'views/tpl.departemen.html',
      })
      .state('gudang', {
        url: '/gudang',
        parent: 'common',
        templateUrl: 'views/tpl.gudang.html',
      })
      .state('supplier', {
        url: '/supplier',
        parent: 'common',
        templateUrl: 'views/tpl.supplier.html',
      })
      .state('permintaan_barang', {
        url: '/permintaan_barang',
        parent: 'common',
        templateUrl: 'views/tpl.permintaan_barang.html',
      })
      .state('purchase_order', {
        url: '/purchase_order',
        parent: 'common',
        templateUrl: 'views/tpl.purchase_order.html',
      })
      .state('bukti_pemakaian', {
        url: '/bukti_pemakaian',
        parent: 'common',
        templateUrl: 'views/tpl.bukti_pemakaian.html',
      })
      .state('pindah_gudang', {
        url: '/pindah_gudang',
        parent: 'common',
        templateUrl: 'views/tpl.pindah_gudang.html',
      })
      .state('penerimaaan_barang', {
        url: '/penerimaaan_barang',
        parent: 'common',
        templateUrl: 'views/tpl.penerimaan_barang.html',
      });

    $urlRouterProvider.otherwise('/');
  }
]);
