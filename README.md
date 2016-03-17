# bypassinstagramapi

O objetivo da api é buscar todas imagens/videos de um usuário do instagram através de seu nickname.


# Configurando ambiente
Existe a opção de usar o client_id e client_secret ou usar o access_token.
Esses dados devem ser sentados como variáveis de ambiente.

- client_id e client_secret 
```
export INSTAGRAM_API_CLIENT_ID=[client_id]
export INSTAGRAM_API_CLIENT_SECRET=[client_secret]
```
- token 
```
export INSTAGRAM_TOKEN=[access_token]
```

# Rotas disponíveis
É possível pegar toda as publicações do usuário, filtrar apenas por fotos ou, filtrar apenas por videos.
```
http://localhost:3000/timeline/{username}
http://localhost:3000/timeline/{username}/fotos
http://localhost:3000/timeline/{username}/videos
```

# Resposta
Total é o numero de publicações total do usuário.  
result são as publicações do usuário.  

###### Cada publicação pode ter 3 ou 4 campos.  
image_url é a url da imagem com a melhor resolução.  
thumb_url é a url da imagem com a menor resolução.  
video_url é a url do video com a melhor resulução (só existe se for um video).  
file_size é o tamanho do arquivo (TODO).  
```js
{
total: 69,
result: [
  {
    image_url: "https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/12314_123_n.jpg?ig_cache_key=MTA5NzgwODQ4OTY4NjE3MDY4Mg%3D%3D.2.l",
    thumb_url: "https://scontent.cdninstagram.com/t51.2885-15/s150x150/e35/c0.0.1080.1080/12378719_1234_x.jpg?ig_cache_key=MTA5NzgwODQ4OTY4NjE3MDY4Mg%3D%3D.2.c",
    file_size: ".."
  },
  {
    image_url: "https://scontent.cdninstagram.com/t51.2885-15/e15/12313_12313_n.jpg?ig_cache_key=MTAwOTczNTYzMTY0MzI3OTIwOA%3D%3D.2",
    thumb_url: "https://scontent.cdninstagram.com/t51.2885-15/s150x150/e15/12313_12313_n.jpg?ig_cache_key=MTAwOTczNTYzMTY0MzI3OTIwOA%3D%3D.2",
    file_size: ".."
  },
  {
    image_url: "https://scontent.cdninstagram.com/l/t51.2885-15/e15/123123_123132_n.jpg?ig_cache_key=ODM0MTk4NjgzMzgzMTY4NjM1.2",
    thumb_url: "https://scontent.cdninstagram.com/l/t51.2885-15/s150x150/e15/123123_12313_n.jpg?ig_cache_key=ODM0MTk4NjgzMzgzMTY4NjM1.2",
    video_url: "https://scontent.cdninstagram.com/t50.2886-16/12313_123123_n.mp4",
    file_size: ".."
  },
  ]
}
```



