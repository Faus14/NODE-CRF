$("#update_clases").submit(function (event) {
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {}

    $.map(unindexed_array, function(n, i){
        data[n['name']] = n['value']
    })

    var request = {
        "url" : `http://localhost:3000/api/clases/${data.id}`,
        "method" : "PUT",
        "data" : data
    }

    $.ajax(request).done(function(response){
        Swal.fire({
            title: "¡Actualización realizada correctamente!",
            icon: "success",
            timer: null, 
            showConfirmButton: tru
        });
    });
});




$("#add_user").submit(function(event){
    
    Swal.fire({
        title: "¡Usuario ingresado correctamente!",
        icon: "success",
        timer: null,
        showConfirmButton: true
        
    });
    location.reload();
});


$("#update_user").submit(function(event){
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {}

    $.map(unindexed_array, function(n, i){
        data[n['name']] = n['value']
    })

    var request = {
        "url" : `http://localhost:3000/api/users/${data.id}`,
        "method" : "PUT",
        "data" : data
    }

    $.ajax(request).done(function(response){
        Swal.fire({
            title: "¡Actualización realizada correctamente!",
            icon: "success",
            timer: null, 
            showConfirmButton: tru
        });
    });
});


if(window.location.pathname == "/home"){
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function(){
        var id = $(this).attr("data-id");

        Swal.fire({
            title: '¿Está seguro de eliminar este usuario?',
            text: "Esta acción no se puede deshacer.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminarlo',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                var request = {
                    "url": `http://localhost:3000/api/users/${id}`,
                    "method": "DELETE"
                }

                $.ajax(request).done(function(response){
                    Swal.fire({
                        title: "¡Eliminado correctamente!",
                        icon: "success",
                        timer: null,
                        showConfirmButton: true
                    });
                    location.reload();
                });
            }
        });
    });
}

