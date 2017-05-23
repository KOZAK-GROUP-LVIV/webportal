var cookieParser = require('cookie-parser');
var cookie = require('cookie');
var userModel = require('../models/userModel');
var chatModel = require('../models/chatModel')(userModel);



module.exports = function(io, sessionStore, __dirname){

    io.on('connection', function(socket){
            // console.log('a user connected');
             getSession(socket);

    socket.on('login', ()=>{
        getSession(socket);

       })
    

    socket.on('getProfile', ()=>{ 
        socket.emit('profile', {isSucces:!!socket.user, user:socket.user});

      })


    socket.use(function(packet, next){
        //console.log('REVISION')
        //console.log(socket.user)

        if (socket.user){ 
          next();
        }
        
        if(!socket.user){
            getSession(socket);
        } 

       })

       




    function initEvent(socket){

    socket.on('addUsersFromChat', (idUser)=>{

        userModel.addUserChat(idUser).then(users=>{
                    socket.emit('addUsersFromChat', {isSucces: true});
                 }).catch(err=>{
                    socket.emit('addUsersFromChat', {isSucces: false, err});
                 })
        
    })



    socket.on('getUsersChat', ()=>{
        userModel.getUsersChat(socket)
                 .then(users=>{
                    socket.emit('getUsersChat', {isSucces:true, users});
                 }).catch(err=>{
                    socket.emit('getUsersChat', {isSucces:false, err})
                 })

    })
 


    socket.on('sendDualMsg', ({idAddressee, body})=>{  

        let dataAuthor = {author: {                _id: socket.user._id,        
                                                      first_name :socket.user.first_name,
                                                     last_name: socket.user.last_name,
                                                     login: socket.user.login,
                                                     avatar: socket.user.avatar
                                                   },

                                             addressee: {
                                                     _id: socket.user._id,  
                                                     first_name : socket.user.first_name,
                                                     last_name: socket.user.last_name,
                                                     login: socket.user.login,
                                                     avatar: socket.user.avatar},
                                             body, 
                                             date: new Date(),
                                             isRead:false
                                           };
       
            
                  
        socket.emit('incomDualMsg', dataAuthor);

        userModel.getUserById(idAddressee).then(user=>{
          //  console.log(user);
           // console.log(socket.user);

                chatModel.setDualHistory({author: socket.user, addressee:user, body})
                    .then(lastMessage=>{
                        sendMessage(lastMessage._id)
                    }).catch(err=>{
                        console.log(err)
                    });

                 function sendMessage(lastMessageId){

                     if(user.isOnline){

                      let dataAdreesse =  {author: {          _id: socket.user._id, 
                                                              first_name : socket.user.first_name,
                                                               last_name: socket.user.last_name,
                                                               login: socket.user.login,
                                                               avatar: socket.user.avatar},

                                                       addressee: {
                                                                 _id: user._id, 
                                                               first_name : user.first_name,
                                                               last_name: user.last_name,
                                                               login: user.login},
                                                       body, 
                                                       date: new Date(),
                                                       _id: lastMessageId};
                        socket.emit('refreshUsers');
                        io.to(user.socketId).emit('refreshUsers');
                        io.to(user.socketId).emit('incomDualMsg',dataAdreesse);
                                 
                      }

          
         }

        });        
    });



    socket.on('getGeneralConference',()=>{
        chatModel.getGeneralConferencePreview(socket.user._id).then((preview)=>{
          socket.emit('getGeneralConference' , preview);
        }).catch((err)=>{

        })
    })



    socket.on('sendGeneralMsg', ({body})=>{  

       userModel.getFullUsersChat(socket).then(users=>{

        let dataAuthor = {author: {              _id: socket.user._id,        
                                                     first_name :socket.user.first_name,
                                                     last_name: socket.user.last_name,
                                                     login: socket.user.login,
                                                     avatar: socket.user.avatar
                                                   },

                                             addressee: {
                                                     _id: socket.user._id,  
                                                     first_name : socket.user.first_name,
                                                     last_name: socket.user.last_name,
                                                     login: socket.user.login,
                                                     avatar: socket.user.avatar},
                                             body, 
                                             date: new Date(),
                                             isRead: true
                                           };

            socket.emit('incomGeneralMsg', dataAuthor);
            socket.emit('refreshUsers');

            chatModel.setGeneralHistory({author: socket.user, body})
                    .then(lastMessage=>{
                    // console.log('LAST MESSAGE');
                     //console.log(lastMessage);
                    
                      for(let user of users){

                            io.to(user.socketId).emit('incomGeneralMsg', {
                                             _id : lastMessage._id,
                                             author: {
                                                    _id: socket.user._id,        
                                                     first_name :socket.user.first_name,
                                                     last_name: socket.user.last_name,
                                                     login: socket.user.login,
                                                     avatar: socket.user.avatar
                                                   },

                                             addressee: {
                                                    _id: user._id,
                                                     first_name : user.first_name,
                                                     last_name: user.last_name,
                                                     login: user.login,
                                                     avatar:user.avatar
                                                   },
                                             body, 
                                             date: new Date(),
                                             isRead: true

                                                      });
                            io.to(user.socketId).emit('refreshUsers');
                      }

                    }).catch(err=>{
                      console.log(err);
                        socket.emit('sendGeneralMsg', {isSucces:false, err})
                    });

        }).catch(err=>{
             socket.emit('sendGeneralMsg', {isSucces:false, err});
        })   
    });


    socket.on('getDualHistory', ({partnerId, pagination})=>{

        chatModel.getDualHistory({myId:socket.user._id, partnerId, pagination}, socket).then(history=>{
               // console.log(history);
                socket.emit('getDualHistory', {isSucces:true, history});
        }).catch(err=>{
              //  console.log(err)
                socket.emit('getDualHistory', {isSucces:false, err});
        })
    });


    socket.on('getGeneralHistory', (pagination)=>{

      chatModel.getGeneralHistory(socket.user._id, pagination).then(history=>{
          socket.emit('getGeneralHistory', {isSucces:true, history});
      }).catch(err=>{
          socket.emit('getGeneralHistory', {isSucces:false, err});
        });

    });


    socket.on('readMessage', ({idMessage, authorId, readerId, isGeneral})=>{
      console.log(`is general ${isGeneral}`)

      chatModel.readMessage(idMessage, authorId, readerId, isGeneral).then(()=>{

        userModel.findById(authorId).then(user=>{
          if(user.isOnline){
            if(isGeneral){
             return socket.emit('readMessage', {reader: socket.user._id, writer: authorId});
            }
            io.to(user.socketId).emit('readMessage', {reader: socket.user._id, writer: authorId});
            socket.emit('readMessage', {reader: socket.user._id, writer: authorId});
            
          }
        });

      }).catch(()=>{

      });

    });



    socket.on('writeMessage', (id)=>{
        userModel.getUserById(id).then(user=>{

          if(user.isOnline){
            io.to(user.socketId)
            .emit('writeMessage', {_id: socket.user._id,
                                   first_name: socket.user.first_name,
                                   last_name: socket.user.last_name,
                                   login: socket.user.login});
          }
        })
    });




    socket.on('deleteHistory', (idAddressee)=>{  

        chatModel.deleteHistory(idAddressee).then(responce=>{
                
                socket.emit('deleteHistory', {isSucces:true})
        }).catch(err=>{
            socket.emit('deleteHistory', {isSucces:false, err})
        })
      })



    socket.on('disconnect', ()=>{
       // console.log('sdasda;sldjalksjdlasjldkjaslkjd')
      console.log(socket.user);
      userModel.offlineUser(socket)
      .then(models=>{
        io.sockets.emit('refreshUsers');
               
      }).catch(err=>{
        console.log(err);
      })
      
    

    })

    socket.on('logout', ()=>{
      io.sockets.to(socket.id).emit('redirectLogin');
      let soc = socket;
       userModel.offlineUser(socket)
      .then(models=>{
        socket.user = null;
        io.sockets.emit('refreshUsers');
               
      }).catch(err=>{
        console.log(err);
      })

    });



    

    };
  

        function getSession(socket){
        let cookies = cookie.parse(socket.handshake.headers.cookie);
        let sid = cookieParser.signedCookie(cookies['sid'], 'tasmanialDeywool');

        sessionStore.get(sid, (err, session)=>{
            if(err)
            {
                console.log(err);
            }
            //console.log()
             if(session.passport){
                if(!session.passport.user)
                  return false;

                userModel.findById(session.passport.user._id).then(user=>{
                   socket.user = user;   

                      if(!socket.user){
                  return io.sockets.to(socket.id).emit('redirectLogin');
                }      

                  socket.emit('authorization', {isSucces: !!socket.user, myProfile: socket.user})
                  if(socket.user){
                    if(socket.user.isWorker){
                          initEvent(socket);
                          socket.user.isOnline = true;
                          socket.user.socketId = socket.id;
                          userModel.getUsersChat(socket).then(users=>{
                            socket.emit('profile', {isSucces:!!socket.user, user:socket.user});
                            socket.broadcast.emit('refreshUsers');
                          })


                      }
                    }

                })

             


            }
        });

      }
    










    });




};

