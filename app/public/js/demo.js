// type = ['','info','success','warning','danger'];


demo = {
    showNotification: function( text,type){
        color = Math.floor((Math.random() * 4) + 1);
         
        $.notify({
            icon: "ti-gift",
            message: text

        },{
            type: type,
            timer: 4000,
            placement: {
                from: 'top',
                align: 'center'
            }
        });
    },

    initModal : function(setup){
        var content  ='';

        content = 
            '<form id="'+((setup.form === undefined) ? '':setup.form)+'">'+
            '<div id="'+setup.id+'" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="false" style="background-color: rgba(0, 0, 0, 0.5);" >'+
                '<div class="modal-dialog" role="document" style="width:60%">'+
                    '<div class="modal-content">'+
                      '<div class="modal-header">'+
                            '<h5 class="modal-title" id="exampleModalLabel">'+setup.title+'</h5>'+
                            '<button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
                                '<span aria-hidden="true">&times;</span>'+
                            '</button>'+
                        '</div>'+
                        '<div class="modal-body">'+
                            
                            setup.content+
                        '</div>'+
                      '<div class="modal-footer">'+
                            '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>'+
                            ((setup.btn_save === undefined) ? '':setup.btn_save) +                            
                      '</div>'+
                    '</div>'+
                '</div>'+
            '</div>'+
            '</form>';

        return content;
    }, 

    initDatatable: function(id,setup){

        var init =  {
                        "pagingType": "full_numbers",
                        responsive  : true,
                        language: {
                        search: "_INPUT_",
                            searchPlaceholder: "Search records",
                        },
                    };
                    
        $.each(setup, function( index , value) {
            init[index] = value;
        });
         
        var datatable = $(id).DataTable(init);
        return datatable;        
    },

    ajaxGet : function(url){
        var data = $.getJSON(url);
        return data;
    },

    putAjax : function(url,param,type){
        $.ajax({
            url: url,
            type: type !== '' ? type:'POST',
            dataType: 'json',
            data: param,
        })
        .done(function(result) {
            console.log(result[0].result);
        })
        .fail(function(err) {
            console.log(err);
        })
        .always(function() {
            console.log("complete");
        });
    },
    genHeader(head, actions = ''){
        var header = [];
        
        if(head.length > 0){
            $.each(head, function(index, val) {
                 header[index] = {"title":val};
            });
            header.push({"title":(actions !== '')? actions:"Actions"});
        }
        return header;
    },

    genHeaderCustom(head, actions){
        var header = [];
        
        if(head.length > 0 ){
            var n = 0;
            $.each(head, function(index, val) {
                 header[index] = {"title":val};
                 n = index;
            });

            $.each(actions, function(index, val) {
                 header[n+index] = val;
            });
        }else{

             $.each(actions, function(index, val) {
                header[index] = val;
            });
        }

        return header;
    },

    createDatatable(nmTbl,data, header){
        demo.initDatatable(nmTbl,{
            data: data,
            columns: header,
            columnDefs: [ {
                "targets": -1,
                "data": data,
                "render": function ( data, type, row, meta ) {
                          return '<button class="btn btn-default"  data-key="'+row[0]+'" id="view">View</button>'+
                                   '<button class="btn btn-default"  data-key="'+row[0]+'" id="edit">Edit</button>'+
                                   '<button class="btn btn-default"  data-key="'+row[0]+'" id="delete">Delete</button>'
                        }
                
            }],
        });
    },
    createDatatableInput(nmTbl,data, header,content = ''){
        var n = 0;
        demo.initDatatable(nmTbl,{
            data: data,
            columns: header,
            columnDefs: [ {
                "targets": -1,
                "data": data,
                "render": function ( data, type, row, meta ) {
                            return '<input type="number" class="form-control Qty" data-id="'+row[0]+'" data-price="'+row[2]+'" id="Qty_'+row[0]+'" style="width: 70px;">'+
                             '<div id="countQty_'+row[0]+'" style="display: inline-flex;padding-left: 13px;">0</div>'
                            
                          
                        }
                
            }],
        });
    },
    createModal(setup){
         var init = {}
                    
        $(setup.nameEl).html(demo.initModal({
                id : (setup.id !== undefined) ? setup.id : 'addForm',
                title : (setup.title !== undefined) ? setup.title :'Add Data Kategori',
                form : (setup.form !== undefined) ? setup.form :'kategori',
                content : (setup.content !== undefined) ? setup.content :'',
                btn_save: (setup.btn_save !== undefined) ? setup.btn_save :'<button type="submit" class="btn btn-primary" id="saveBtn">Save changes</button>'
            })
        );
    },

    genID(idGen, count){
        
        var num     = (idGen.length - count.toString().length);         

        return idGen.substring(0,num)+ (count+1);
    },

    CreateTableView(data,field){

        var head ='', body = '',content = '';

        var dataID = field[2].data;
        var header = field[1].header;

        $.each(header, function(index, val) {

            content += '<fieldset>'+
                        '<div class="form-group">'+
                            '<label class="col-sm-3 control-label">'+val+'</label>'+
                            '<div class="col-sm-8">'+
                                '<span class="help-block">'+dataID[0][index]+'</span>'+
                            '</div>'+
                        '</div>'+
                         '</fieldset>'
        });

        head += '<td>No</td>';
        $.each(data[1].header, function(index, val) {
            head += '<td>'+val+'</td>';
        });

        
        $.each(data[2].data, function(i, v) {
            body += '<tr>'
            body += '<td>'+(i+1)+'</td>';
            $.each(v, function(index, val) {
                 body += '<td>'+v[index]+'</td>';
            });
            body += '</tr>'
        });
        

        content +='<table class="table table-striped">'+
                    '<thead>'+
                        '<tr>'+
                           head
                        '</tr>'+
                    '</thead>'+
                    '<tbody>';
        content += body;
        content += '<tbody>'+
                '</table>';

        return content;
        
    },

    

}
