<?php 
include('config.php');
header ('Access-Control-Allow-Origin: *');
header ('Access-Control-Allow-Credentials:true');
header ('Access-Control-Allow-Methods: PUT,GET,POST,DELETE,OPTIONS');
header ('Access-Control-Allow-Headers: Origin, Content-Type, Authorization, Accept, X-Requested-With, x-xsrf-token');
header ('ContentType:application/json; charset=utf-8');
$post= json_decode(file_get_contents("php://input"), true);
$respuesta="";

//cargar libros
if($post['accion']=="mlibros")
{
    $sentencia=sprintf("SELECT * FROM libros");

    $result=mysqli_query($mysqli, $sentencia);
    if(mysqli_num_rows($result)>0)
    {
        while($row= mysqli_fetch_array($result))
        {
            $datos[]=array(
                'codigo_libro'=>$row['id_libro'],
                'titulo'=>$row['titulo'],
                'descripcion'=>$row['descripcion']
                

            );
        }
        $respuesta=json_encode(array('estado'=>true, "info"=>$datos));
    }
    else
    {
        $respuesta=json_encode(array('estado'=>false, "mensaje"=>"No hay datos"));
    }
        echo $respuesta;
} 

//eliminar libros
if($post['accion']=="elibros")
{
    $sentencia=sprintf("DELETE FROM libros WHERE id_libro=%d", $post['codigo']);
    $result=mysqli_query($mysqli, $sentencia);
    if($result)
    {
        $respuesta=json_encode(array('estado'=>true, "mensaje"=>"Libro eliminado"));
    }
    else
    {
        $respuesta=json_encode(array('estado'=>false, "mensaje"=>"No se pudo eliminar el libro"));
    }
    echo $respuesta;
}

if ($post['accion'] == "llibro") {
    $sentencia = sprintf("SELECT id_libro, titulo, descripcion FROM libros WHERE id_libro = %s",
        $post['id_libro']
    );

    $result = mysqli_query($mysqli, $sentencia);
    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_array($result)) {
            $datos[] = array(
                'id_libro' => $row['id_libro'],
                'titulo' => $row['titulo'],
                'descripcion' => $row['descripcion']
            );
        }
        $respuesta = json_encode(array('estado' => true, "libro" => $datos));
    } else {
        $respuesta = json_encode(array('estado' => false, "mensaje" => "No hay datos"));
    }
    echo $respuesta;
}

if ($post['accion'] == "ilibro") {
    $titulo = $post['titulo'];
    $descripcion = $post['descripcion'];

    $sentencia = sprintf("INSERT INTO libros (titulo, descripcion) VALUES ('%s', '%s')",
        $titulo,
        $descripcion
    );

    $result = mysqli_query($mysqli, $sentencia);
    if ($result) {
        $respuesta = json_encode(array('estado' => true, 'mensaje' => "Libro agregado correctamente"));
    } else {
        $respuesta = json_encode(array('estado' => false, 'mensaje' => "Error al insertar el libro"));
    }
    
    echo $respuesta;
}

if ($post['accion'] == "ulibro") {
    $sentencia = sprintf("UPDATE libros SET titulo='%s', descripcion='%s' WHERE id_libro=%s",
        $post['titulo'],
        $post['descripcion'],
        $post['id_libro']
    );

    $result = mysqli_query($mysqli, $sentencia);
    if ($result) {
        $respuesta = json_encode(array('estado' => true, "mensaje" => "Datos actualizados correctamente"));
    } else {
        $respuesta = json_encode(array('estado' => false, "mensaje" => "Error al actualizar los datos"));
    }
    echo $respuesta;
}
if ($post['accion'] == "llibros") {
    $id_libro = $post['id_libro'];
    $sentencia = sprintf("SELECT titulo, descripcion FROM libros WHERE id_libro = '%s'", $id_libro);
    $result = mysqli_query($mysqli, $sentencia);
    if ($row = mysqli_fetch_assoc($result)) {
        $respuesta = json_encode(['estado' => true, 'libro' => [$row]]);
    } else {
        $respuesta = json_encode(['estado' => false, 'mensaje' => "Libro no encontrado"]);
    }
    echo $respuesta;
}

if ($post['accion'] == "mresenas") {
    $id_libro = $post['id_libro'];
    $sentencia = sprintf("SELECT id_resena, puntuacion, resena, fecha FROM resenas WHERE libro_id = '%s'", $id_libro);
    $result = mysqli_query($mysqli, $sentencia);
    $resenas = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $resenas[] = $row;
    }
    if (count($resenas) > 0) {
        $respuesta = json_encode(['estado' => true, 'resenas' => $resenas]);
    } else {
        $respuesta = json_encode(['estado' => false, 'mensaje' => "No hay reseñas"]);
    }
    echo $respuesta;
}

if ($post['accion'] == "vresena") {
    $sentencia = sprintf("SELECT id_resena, libro_id, puntuacion, resena FROM resenas WHERE id_resena = %s",
        $post['id_resena']
    );

    $result = mysqli_query($mysqli, $sentencia);
    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_array($result)) {
            $datos[] = array(
                'id_resena' => $row['id_resena'],
                'libro_id' => $row['libro_id'],
                'puntuacion' => $row['puntuacion'],
                'resena' => $row['resena']
            );
        }
        $respuesta = json_encode(array('estado' => true, "resena" => $datos[0]));
    } else {
        $respuesta = json_encode(array('estado' => false, "mensaje" => "No hay datos"));
    }
    echo $respuesta;
}

if ($post['accion'] == "nresena") {
    $libro_id = $post['libro_id'];
    $puntuacion = $post['puntuacion'];
    $resena = $post['resena'];

    $sentencia = sprintf("INSERT INTO resenas (libro_id, puntuacion, resena) VALUES ('%s', '%s', '%s')",
        $libro_id,
        $puntuacion,
        $resena
    );

    $result = mysqli_query($mysqli, $sentencia);
    if ($result) {
        $respuesta = json_encode(array('estado' => true, 'mensaje' => "Reseña agregada correctamente"));
    } else {
        $respuesta = json_encode(array('estado' => false, 'mensaje' => "Error al insertar la reseña"));
    }
    
    echo $respuesta;
}

if ($post['accion'] == "uresena") {
    $sentencia = sprintf("UPDATE resenas SET puntuacion='%s', resena='%s' WHERE id_resena=%s",
        $post['puntuacion'],
        $post['resena'],
        $post['id_resena']
    );

    $result = mysqli_query($mysqli, $sentencia);
    if ($result) {
        $respuesta = json_encode(array('estado' => true, "mensaje" => "Reseña actualizada correctamente"));
    } else {
        $respuesta = json_encode(array('estado' => false, "mensaje" => "Error al actualizar la reseña"));
    }
    echo $respuesta;
}

if($post['accion']=="eresena")
{
    $sentencia=sprintf("DELETE FROM resenas WHERE id_resena=%d", $post['codigo']);
    $result=mysqli_query($mysqli, $sentencia);
    if($result)
    {
        $respuesta=json_encode(array('estado'=>true, "mensaje"=>"Resena eliminada"));
    }
    else
    {
        $respuesta=json_encode(array('estado'=>false, "mensaje"=>"No se pudo eliminar el libro"));
    }
    echo $respuesta;
}