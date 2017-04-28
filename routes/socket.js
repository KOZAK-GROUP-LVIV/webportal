var cookieParser = require('cookie-parser');
var cookie = require('cookie');
var chatModel = require('../models/chatModel');
var userModel = require('../models/userModel')
let flagConnect = false;
console.log(userModel)

module.exports = function(io, sessionStore, __dirname){

    io.on('connection', function(socket){
             console.log('a user connected');
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
        userModel.getUserById(idAddressee).then(user=>{
            console.log(user);
            console.log(socket.user);


                chatModel.setDualHistory({author: socket.user, addressee:user, body})
                    .then(responce=>{
                        socket.emit('setHistory', {isSucces:true});
                    }).catch(err=>{
                        socket.emit('setHistory', {isSucces:false, err})
                    });

         if(user.isOnline){

            let dataAdreesse =  {author: {          _id: socket.user._id, 
                                                    first_name : socket.user.first_name,
                                                     last_name: socket.user.last_name,
                                                     login: socket.user.login},

                                             addressee: {
                                                       _id: user._id, 
                                                     first_name : user.first_name,
                                                     last_name: user.last_name,
                                                     login: user.login},
                                             body, 
                                             date: new Date()};

          


            io.to(user.socketId).emit('incomDualMsg',dataAdreesse);
                       
            }
           // console.log(socket.user)
           // console.log('ISONLINE')
           // console.log(socket.user.isOnline)

                
          let dataAuthor = {author: {                _id: socket.user._id,        
                                                      first_name :socket.user.first_name,
                                                     last_name: socket.user.last_name,
                                                     login: socket.user.login},

                                             addressee: {
                                                     _id: socket.user._id,  
                                                    first_name : socket.user.first_name,
                                                     last_name: socket.user.last_name,
                                                     login: socket.user.login},
                                             body, 
                                             date: new Date()};

            socket.emit('incomDualMsg', dataAuthor);
            io.sockets.emit('refreshUsers');

        });        
    });



    socket.on('sendGeneralMsg', ({body})=>{  
        userModel.getFullUsersChat().then(users=>{

          //console.log('SENDGENERAL')
          //  console.log(users);
           // console.log(socket.user);
            

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


    socket.on('getDualHistory', ({myId, partnerId, padigation})=>{
        if(socket.user._id == partnerId){
          socket.emit('redirectGeneral');
          return
        }


        chatModel.getDualHistory({myId:socket.user._id, partnerId, padigation}, socket).then(history=>{
                socket.emit('getDualHistory', {isSucces:true, history});
        }).catch(err=>{
                socket.emit('getDualHistory', {isSucces:false, err});
        })
    });


    socket.on('getGeneralHistory', ({padigation})=>{

        chatModel.getGeneralHistory({padigation}).then(historyList=>{
          //console.log(historyList)
         // console.log(historyList[0].history)
                socket.emit('getGeneralHistory', {isSucces:true, history : historyList[0].history});
        }).catch(err=>{
                socket.emit('getGeneralHistory', {isSucces:false, err});
        })
    });







    socket.on('deleteHistory', (idAddressee)=>{  
        //console.log(socket.user);
        chatModel.deleteHistory(idAddressee).then(responce=>{
                console.log('asdasdasd')
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
            //  console.log('asdjalsd');
                socket.user = session.passport.user;    
                if(!socket.user){
                  return io.sockets.to(socket.id).emit('redirectLogin');
                }      

                socket.emit('authorization', {isSucces: !!socket.user, myProfile: socket.user})
                if(socket.user){
                  if(socket.user.isWorker){
                        initEvent(socket);
                        userModel.getUsersChat(socket).then(users=>{
                          socket.emit('getUsersChat', {isSucces:true, users});
                          io.sockets.emit('refreshUsers');
                        })


                  }
                }


            }
        });

      }
    










    });




};

