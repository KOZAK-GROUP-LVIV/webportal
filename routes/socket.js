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
                        console.log(`LAST MESSAGE`);
                        //console.log(lastMessage)
                        sendMessage(lastMessage._id)
                        socket.emit('setHistory', {isSucces:true});
                    }).catch(err=>{
                        console.log(err)
                        socket.emit('setHistory', {isSucces:false, err})
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



    socket.on('sendGeneralMsg', ({body})=>{  
        userModel.getFullUsersChat().then(users=>{

            chatModel.setGeneralHistory({author: socket.user, body})
                    .then(responce=>{
                        socket.emit('sendGeneralMsg', {isSucces:true});
                    }).catch(err=>{
                      console.log(err);
                        socket.emit('sendGeneralMsg', {isSucces:false, err})
                    });

            for(let user of users){
              if(user.isOnline){
                io.to(user.socketId)
                            .emit('incomGeneralMsg', {author: {first_name : socket.user.first_name,
                                                     last_name: socket.user.last_name,
                                                     login: socket.user.login},

                                             addressee: {first_name : user.first_name,
                                                     last_name: user.last_name,
                                                     login: user.login},
                                             body, 
                                             date: new Date()
                                                      });
              }
            }
                io.sockets.emit('refreshUsers');

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


    socket.on('getGeneralHistory', ({padigation})=>{

      chatModel.getGeneralHistory({padigation}).then(historyList=>{
          socket.emit('getGeneralHistory', {isSucces:true, history : historyList[0].history});
      }).catch(err=>{
          socket.emit('getGeneralHistory', {isSucces:false, err});
        });

    });


    socket.on('readMessage', ({idMessage, authorId, readerId})=>{

      chatModel.readMessage(idMessage, authorId, readerId).then(()=>{

        userModel.findById(authorId).then(user=>{
          if(user.isOnline){
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
       // console.log(socket.user);
      userModel.offlineUser(socket)
      .then(models=>{
        io.sockets.emit('refreshUsers');
               
      }).catch(err=>{
        console.log(err);
      })
      
    

    })

    socket.on('logout', ()=>{
      io.sockets.to(socket.id).emit('redirectLogin');
     // io.sockets.connected[socket.id].disconnect();
      let soc = socket;
      //  socket.disconnect();
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
             if(session.passport){
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
                            socket.emit('getUsersChat', {isSucces:true, users});
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

