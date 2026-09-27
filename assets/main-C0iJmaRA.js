const Os=[{name:"llave de laton",kind:"key",value:111},{name:"cristal magico",kind:"key",value:1112},{name:"llave de casa",kind:"key",value:1314},{name:"llave de la verja",kind:"key",value:2636},{name:"llave del puente",kind:"key",value:3444},{name:"llave del gnomo",kind:"key",value:4636},{name:"barca",kind:"key",value:3233},{name:"llave de la despensa",kind:"key",value:2010},{name:"diario",kind:"weapon",value:1},{name:"matamoscas",kind:"weapon",value:2},{name:"espada de madera",kind:"weapon",value:4},{name:"espada",kind:"weapon",value:8},{name:"espada venenosa",kind:"weapon",value:12},{name:"Thurmei",kind:"weapon",value:16},{name:"camisa",kind:"shield",value:2},{name:"escudo de madera",kind:"shield",value:4},{name:"escudo de escamas",kind:"shield",value:8},{name:"escudo",kind:"shield",value:12},{name:"Rharmei",kind:"shield",value:16},{name:"caramelo",kind:"food",value:2},{name:"judia",kind:"food",value:4},{name:"manzana",kind:"food",value:8},{name:"naranja",kind:"food",value:12},{name:"pocima",kind:"food",value:16}],Ps=[{name:"mosca acida",attack:4,defence:0,drops:"cristal magico"},{name:"mosca",attack:0,defence:0,drops:"caramelo"},{name:"mosquito",attack:2,defence:0,drops:"matamoscas"},{name:"polilla",attack:1,defence:1,drops:"camisa"},{name:"cucaracha",attack:1,defence:1,drops:"llave de casa"},{name:"raton",attack:2,defence:2,drops:"judia"},{name:"rana venenosa",attack:2,defence:1,drops:"espada de madera"},{name:"planta carnivora",attack:1,defence:3,drops:"escudo de madera"},{name:"raton salvaje",attack:3,defence:3,drops:"llave de la verja"},{name:"escorpion dorado",attack:12,defence:2,drops:"espada venenosa"},{name:"trucha",attack:3,defence:3,drops:"manzana"},{name:"trucha asesina",attack:4,defence:7,drops:"escudo de escamas"},{name:"minimonstruo aquatico",attack:8,defence:4,drops:"llave del puente"},{name:"lobo",attack:8,defence:6,drops:"manzana"},{name:"lobo asesino",attack:12,defence:7,drops:"escudo"},{name:"ogro",attack:6,defence:10,drops:"naranja"},{name:"gnomo de puente",attack:11,defence:11,drops:"llave del gnomo"},{name:"murcielago",attack:8,defence:8,drops:"judia"},{name:"aranya",attack:14,defence:4,drops:"Thurmei"},{name:"vampiro",attack:12,defence:13,drops:"Rharmei"},{name:"aranya gigante",attack:14,defence:14,drops:"barca"},{name:"monstruo aquatico enorme",attack:32,defence:15,drops:"llave de la despensa"}],Ns={"0,0":{name:"Bienvenida",exits:[-1,-1,0,-1],holds:"diario",text:`Bienvenido a este juego de aventura. 
Esta es la habitacion de bienvenida, donde aprenderas a moverte. 
Los comandos son:
 'norte',
 'sur',
 'este',
 'oeste'. 
Prueba de ir a la siguiente habitacion al 'este', y volver al 'oeste'.`},"0,1":{name:"Usa las llaves",exits:[111,-1,-1,0],holds:"llave de laton",text:`En esta sala aprenderas a coger objetos y abrir puertas con llave. 
Los comandos son:
 'coger',
 y los de movimiento.
Si vas al norte directamente no podras, intentalo.
Despues coge la llave ('coger') y ves hacia el norte.`},"0,2":{name:"Comedor sur",exits:[0,-1,0,-1],holds:"mosca",text:`Es el ala sur de tu comedor. La luz entra difusa desde la salita y
las sillas esperan a tus invitados.`},"0,3":{name:"Salita",exits:[0,-1,-1,0],holds:"polilla",text:`Es la salita de tu casa, la luz entra por la ventana y las cortinas
desdibujan el exterior. Puedes ver tu sillon, una mesita con un 
candelabro y estanterias con varios libros.`},"0,4":{name:"Huerto de pepinos",exits:[0,-1,0,-1],holds:"nada",text:`Junto a la verja sur de tu granja tienes el huerto de pepinos. 
Apenas levantan un dedo del suelo, pero ya te relames pensando
en su sabor.`},"0,5":{name:"Huerto de tomates",exits:[0,-1,0,0],holds:"nada",text:`Junto a la verja sur de tu granja tienes el huerto de tomates. Aun
estan verdes, pero parece que este anyo tendras muy buena cosecha.`},"0,6":{name:"Caminito",exits:[-1,-1,0,0],holds:"nada",text:`Un bonito caminito se alarga hacia el este, la parte mas alejada 
de tu granja.`},"0,7":{name:"Caminito",exits:[0,-1,-1,0],holds:"planta carnivora",text:`Es el fin de tu caminito, al norte tienes las plantaciones frutales.
Siempre te gusta pasear en primavera y ver las flores.`},"1,0":{name:"Despensa",exits:[0,-1,-1,-1],holds:"nada",text:`Al fin has podido entrar en la despensa!
Ahora ya puedes empezar a preparar la comida para tus comensales.
FELICIDADES!`},"1,1":{name:"Aprende a atacar",exits:[-1,0,1112,-1],holds:"mosca acida",text:`Es hora de que aprendas a atacar a tus enemigos. Debes ir con cuidado
ya que ellos se defenderan.
Solo hay un comando:
 'atacar'.
Para ello debes conseguir primero un arma. Busca una, cogela y ataca.
Cuando venzas podras continuar.`},"1,2":{name:"Comedor",exits:[0,0,0,-1],holds:"nada",text:`Estas en el comedor de tu casa, fuera hace un dia fantastico y
esperas visita. Hoy tienes decidido preparar un buen banquete!
La entrada esta al oeste, la salita al sur, y la cocina al oeste.`},"1,3":{name:"Recibidor",exits:[0,0,1314,0],holds:"mosca",text:`Es un recibidor pequenyo pero acogedor. Esta decorado austeramente
pero dispone de colgarropas para dejar la chaqueta.
Desde el puedes acceder directamente a la salita, al comedor y a la
cocina.`},"1,4":{name:"Patio",exits:[0,0,0,0],holds:"nada",text:`Hace un dia esplendido y estas en el jardin de tu granja. Aqui puedes
ver varias flores que has plantado y una fuente. Te rodean varios 
huertos y mas lejos al este tienes los frutales.`},"1,5":{name:"Huerto de Judias",exits:[-1,0,-1,0],holds:"raton salvaje",text:`Un bonito huerto de judias se abre delante de ti. Hace apenas unas
semanas que las plantaste, pero ya estan florecidas. El fuerte color
amarillo de las flores contrastan con el verde de las plantas.`},"1,6":{name:"Manzanos",exits:[0,-1,0,-1],holds:"raton",text:`Este es tu cultivo de manzanas. Este anyo las lluvias han sido 
generosas y tendras una buena cosecha. Hay ya alguna manzana, pero
a mayoria demasiado verdes.`},"1,7":{name:"Ciruelos",exits:[0,0,-1,0],holds:"nada",text:`Siempre te ha gustado esta parte de la granja. Los ciruelos tienen
hojas rojas y le dan un aspecto muy fresco. El rio esta hacia el norte,
y tu casa hacia el suroeste.`},"2,0":{name:"Banyo",exits:[-1,2010,0,-1],holds:"mosca",text:`Este es el banyo de tu casa. Es mas bien rustico pero funcional. La 
banyera la compraste recientemente y al lado tienes bien ordenadas
las toallas. Al sur esta la despensa.`},"2,1":{name:"Habitacion",exits:[-1,-1,0,0],holds:"mosquito",text:`Es la habitacion donde duermes. Tienes una cama de madera trabajada,
con numerosas mantas que te protegen del frio, y un tocador donde 
guardas tu ropa. Dese la habitacion puedes acceder al comedor y al
lavabo.`},"2,2":{name:"Comedor norte",exits:[-1,0,0,0],holds:"nada",text:`Es la parte norte de tu gran comedor. La mesa para la ocasion se 
extiende y todos los servicios estan en su sitio. Desde aqui puedes
acceder a la cocina y a tu habitacion.`},"2,3":{name:"Cocina",exits:[-1,0,-1,0],holds:"cucaracha",text:`Esta es tu cocina. Estas contento con tu nuevo horno de lenya, cocina
a las mil maravillas. Tienes todo preparado para hacer la comida, 
pero te faltan los ingredientes. Tendrias que recogerlos de la 
despensa.`},"2,4":{name:"Huerto de calabazas",exits:[-1,0,-1,-1],holds:"escorpion dorado",text:`Este es tu huerto de calabazas. Apenas han empezado a crecer pero 
dependes de ellas para comer este otonyo. No puedes evitar pensar
si te has de llevar alguna a tus padres.`},"2,5":{name:"Naranjos",exits:[-1,-1,0,-1],holds:"naranja",text:`Aqui tienes uno de los cultivos mas sufridos. No sueles tener 
demasiadas naranjas, pero te gustan demasiado. Su color y aroma
te resultan estupendas.`},"2,6":{name:"Entrada",exits:[2636,0,0,0],holds:"rana venenosa",text:`Aqui esta la entrada norte de tu granja. La coronan dos magnificos 
cipreses y numerosos arbustos. La reja la sueles tener cerrada, 
nunca te ha gustado adentrarte en el bosque. Al norte esta el rio.`},"2,7":{name:"Nogal",exits:[-1,0,-1,0],holds:"raton",text:`Unos grandes nogales se extienden es este cultivo de tu granja. 
Son especialmente interesantes, porque, aunque su fruto no sea tan
bueno como las manzanas, son resistentes y te permiten superar los
inviernos.`},"3,0":{name:"Cueva",exits:[0,-1,0,-1],holds:"murcielago",text:`Sigue el tunel de la cueva oscura y sombria. Las paredes estan 
humedas y se escucha un rumor de agua a lo lejos. Has de caminar
con cuidado para no resbalar o tropezar.`},"3,1":{name:"Cueva",exits:[0,-1,-1,0],holds:"nada",text:`Sigue el tunel de la cueva oscura y sombria. Las paredes estan 
humedas y se escucha un rumor de agua a lo lejos. Has de caminar
con cuidado para no resbalar o tropezar.`},"3,2":{name:"Lago interno",exits:[0,-1,3233,-1],holds:"nada",text:`Un inmenso lago interior se abre delante tuyo. Esta oscuro y 
apenas se ve bien, pero intuyes que algo se mueve al este. 
Necesitas una barca para ir al centro del lago.`},"3,3":{name:"Centro del lago",exits:[-1,-1,-1,0],holds:"monstruo aquatico enorme",text:`Estas en el centro del lago con una pequenya y fragil barca.
Es hogar de Troildhem, un increible monstruo misterioso. 
Ya habias visto otro igual antes, pero mas pequenyo.
Troildhem tiene varios metros de altura, y una decena de 
tentaculos con hojos.`},"3,4":{name:"Rio salvaje",exits:[3444,-1,0,-1],holds:"espada",text:`Aqui el rio se hace mas salvaje, sin embargo hay un puente que 
te permite pasar con segurida a la otra orilla. El puente se debe
desbloquear con una llave para poder pasar.`},"3,5":{name:"Rio",exits:[-1,-1,0,0],holds:"trucha asesina",text:`Por aqui discurre el rio. No puedes cruzar, pero mas al oeste
hay un puente.`},"3,6":{name:"Rio",exits:[-1,0,0,0],holds:"nada",text:`Tu granja va a parar a este rio. En el norte esta el bosque 
misterioso pero no puedes cruzar por aqui.`},"3,7":{name:"Rio",exits:[-1,-1,-1,0],holds:"minimonstruo aquatico",text:`El rio se ensancha y sus aguas se tranquilizan, hay numerosos
peces pero algo se remueve enre las aguas.`},"4,0":{name:"Cueva",exits:[0,0,-1,-1],holds:"nada",text:`Sigue el tunel de la cueva oscura y sombria. Las paredes estan 
humedas y se escucha un rumor de agua a lo lejos. Has de caminar
con cuidado para no resbalar o tropezar.`},"4,1":{name:"Cueva",exits:[0,0,-1,-1],holds:"murcielago",text:`Sigue el tunel de la cueva oscura y sombria. Las paredes estan 
humedas y se escucha un rumor de agua a lo lejos. Has de caminar
con cuidado para no resbalar o tropezar.`},"4,2":{name:"Cueva",exits:[0,0,-1,-1],holds:"nada",text:`Sigue el tunel de la cueva oscura y sombria. Las paredes estan 
humedas y se escucha un rumor de agua a lo lejos. Has de caminar
con cuidado para no resbalar o tropezar.`},"4,3":{name:"Bosque oscuro",exits:[0,-1,-1,-1],holds:"lobo",text:`A pesar de ser de dia apenas llega un apice de luz. Arbustos, 
arboles y zarzas dificultan el paso. Algo se mueve en la 
oscuridad.`},"4,4":{name:"Rio salvaje",exits:[-1,0,0,-1],holds:"nada",text:`La orilla norte del rio es lugubre. Se escuchan extranyos ruidos
y se intuye una maldicion. Aqui esta el punte que cruza a la 
orilla sur, el ambiente parece hostil e invita cruzarlo.`},"4,5":{name:"Rio oscuro",exits:[-1,-1,0,0],holds:"trucha",text:`El rio fluye bajo las rocas y raizes de los arboles del bosque.
Los sonios del bosque se intensifican y te sientes vigilado.`},"4,6":{name:"Bosque tenebroso",exits:[0,-1,-1,0],holds:"nada",text:`Una brecha entre zarzas y arbustos te da la entrada al bosque
tenebroso. La luz escasea y las sombras son amenazadoras.`},"4,7":{name:"Bosque oscuro",exits:[0,-1,-1,-1],holds:"ogro",text:`A pesar de ser de dia apenas llega un apice de luz. Arbustos, 
arboles y zarzas dificultan el paso. Algo se mueve en la 
oscuridad.`},"5,0":{name:"Cueva",exits:[0,0,-1,-1],holds:"aranya gigante",text:`Sigue el tunel de la cueva oscura y sombria. Una gran telaranya
dificulta el paso hacia el sud. Un movimiento poco cuidadoso te
podria hacer presa de ella.`},"5,1":{name:"Cueva",exits:[-1,0,0,-1],holds:"nada",text:`Sigue el tunel de la cueva oscura y sombria. Las paredes estan 
humedas y se escucha un rumor de agua a lo lejos. Has de caminar
con cuidado para no resbalar o tropezar.`},"5,2":{name:"Cueva",exits:[-1,0,-1,0],holds:"vampiro",text:`Sigue el tunel de la cueva oscura y sombria. Las paredes estan 
humedas, y el rumor de agua se magnifica. Has de caminar con cuidado 
para no resbalar o tropezar.`},"5,3":{name:"Bosque sombrio",exits:[0,0,-1,-1],holds:"nada",text:`El bosque es oscuro y junto a ti has descubierto un gran pared 
de roca solida al oeste, probablemente la montanya.`},"5,4":{name:"Bosque humedo",exits:[0,-1,0,-1],holds:"nada",text:`La luz escasea entre las hojas de los arboles. Zarzas y arbustos
dan paso a un pequenyo riachuelo. Algo se mueve en la oscuridad.`},"5,5":{name:"Bosque",exits:[-1,-1,0,0],holds:"nada",text:`El bosque se extiende oscuro y misterioso. La luz se desdibuja a
traves de las hojas. Se escuchan los ruidos de los animales y
sus otros habitantes.`},"5,6":{name:"Claro del Bosque",exits:[0,0,-1,0],holds:"nada",text:`El bosque se extiende oscuro y misterioso. Estas en un pequenyo
claro del bosque donde se puede contemplar el cielo. Notas que
el bosque esta agitado.`},"5,7":{name:"Bosque",exits:[0,0,-1,-1],holds:"nada",text:`El bosque se extiende oscuro y misterioso. La luz se desdibuja a
traves de las hojas. Se escuchan los ruidos de los animales y
sus otros habitantes.`},"6,0":{name:"Cueva",exits:[0,0,-1,-1],holds:"nada",text:`Sigue el tunel de la cueva oscura y sombria. Las paredes estan 
humedas y se escucha un rumor de agua a lo lejos. Has de caminar
con cuidado para no resbalar o tropezar.`},"6,1":{name:"Cueva",exits:[0,-1,0,-1],holds:"nada",text:`Sigue el tunel de la cueva oscura y sombria. Las paredes estan 
humedas y se escucha un rumor de agua a lo lejos. Has de caminar
con cuidado para no resbalar o tropezar.`},"6,2":{name:"Cueva",exits:[0,-1,-1,0],holds:"murcielago",text:`Estas dentro de la cueva, es oscura y sombria. Las paredes estan 
humedas y se escucha un rumor de agua a lo lejos. Intentas mirar
pero parece que no tiene fin.`},"6,3":{name:"Bosque sombrio",exits:[0,0,0,-1],holds:"nada",text:`El bosque es oscuro y junto a ti has descubierto un gran pared 
de roca solida al oeste, probablemente la montanya. Notas que la
roca esta humeda, muy probablemente haya alguna cueva.`},"6,4":{name:"Puente del bosque",exits:[0,0,-1,0],holds:"gnomo de puente",text:`La luz escasea entre las hojas de los arboles. Zarzas y arbustos
dan paso a un pequenyo riachuelo. Un puente cruza el riachuelo y
permite alcanzar la parte este del bosque, alli, bajo un arbol
hay la casa de un troll que tenras que atravesar si quieres ir
al este.`},"6,5":{name:"Bosque oscuro",exits:[-1,-1,0,-1],holds:"lobo asesino",text:`A pesar de ser de dia apenas llega un apice de luz. Arbustos, 
arboles y zarzas dificultan el paso. Algo se mueve en la 
oscuridad.`},"6,6":{name:"Claro del Bosque",exits:[-1,0,0,0],holds:"nada",text:`El bosque se extiende oscuro, misterioso y agitado. Estas en un 
pequenyo claro del bosque donde se puede contemplar el cielo.`},"6,7":{name:"Bosque",exits:[0,0,-1,0],holds:"nada",text:`En esta parte del bosque la luz empieza a escasear. Maranyas de
arbustos y zarzales dificultan tus pasos. Notas que algo se mueve
entre las sombras.`},"7,0":{name:"Cueva",exits:[-1,0,0,-1],holds:"nada",text:`Sigue el tunel de la cueva oscura y sombria. Las paredes estan 
humedas y se escucha un rumor de agua a lo lejos. Has de caminar
con cuidado para no resbalar o tropezar.`},"7,1":{name:"Cueva",exits:[-1,0,-1,0],holds:"aranya",text:`Sigue el tunel de la cueva oscura y sombria. Las paredes estan 
humedas y se escucha un rumor de agua a lo lejos. Has de caminar
con cuidado para no resbalar o tropezar.`},"7,2":{name:"Cueva",exits:[-1,0,0,-1],holds:"nada",text:`Estas en los primeros pasos dentro de la cueva. Aire frio y
humedo te invade de su interior. Intentas ver donde se acaba, 
pero no puedes. Oyes murmullos provinientes de lo mas profundo.`},"7,3":{name:"Bosque",exits:[-1,0,-1,0],holds:"nada",text:`La luz escasea entre las hojas de los arboles. Un grupo de 
plantas trepadoras se mueven al oeste, es la entrada a una 
cueva. Sientes una presencia que te observa.`},"7,4":{name:"Bosque humedo",exits:[-1,0,0,-1],holds:"nada",text:`La luz escasea entre las hojas de los arboles. Zarzas y arbustos
dan paso a un pequenyo riachuelo. Algo se mueve en la oscuridad.`},"7,5":{name:"Bosque",exits:[-1,-1,0,0],holds:"lobo",text:`El bosque se extiende oscuro y misterioso. La luz se desdibuja a
traves de las hojas. Se escuchan los ruidos de los animales y
sus otros habitantes.`},"7,6":{name:"Bosque",exits:[-1,-1,0,0],holds:"nada",text:`El bosque se extiende oscuro y misterioso. La luz se desdibuja a
traves de las hojas. Se escuchan los ruidos de los animales y
sus otros habitantes.`},"7,7":{name:"Bosque",exits:[-1,0,-1,0],holds:"lobo",text:`El bosque se extiende oscuro y misterioso. La luz se desdibuja a
traves de las hojas. Se escuchan los ruidos de los animales y
sus otros habitantes.`}},bn={"llave de laton":"brass key","cristal magico":"magic crystal","llave de casa":"house key","llave de la verja":"gate key","llave del puente":"bridge key","llave del gnomo":"gnome's key",barca:"boat","llave de la despensa":"pantry key",diario:"newspaper",matamoscas:"fly swatter","espada de madera":"wooden sword",espada:"sword","espada venenosa":"poisoned sword",Thurmei:"Thurmei",camisa:"shirt","escudo de madera":"wooden shield","escudo de escamas":"scale shield",escudo:"shield",Rharmei:"Rharmei",caramelo:"sweet",judia:"bean",manzana:"apple",naranja:"orange",pocima:"potion"},yo={"mosca acida":"acid fly",mosca:"fly",mosquito:"mosquito",polilla:"moth",cucaracha:"cockroach",raton:"mouse","rana venenosa":"poison frog","planta carnivora":"carnivorous plant","raton salvaje":"wild mouse","escorpion dorado":"golden scorpion",trucha:"trout","trucha asesina":"killer trout","minimonstruo aquatico":"small water monster",lobo:"wolf","lobo asesino":"killer wolf",ogro:"ogre","gnomo de puente":"bridge gnome",murcielago:"bat",aranya:"spider",vampiro:"vampire","aranya gigante":"giant spider","monstruo aquatico enorme":"enormous water monster"},Ls={Bienvenida:"Welcome","Usa las llaves":"Use the keys","Comedor sur":"Dining room, south",Salita:"Sitting room","Huerto de pepinos":"Cucumber patch","Huerto de tomates":"Tomato patch",Caminito:"Little path",Despensa:"Pantry","Aprende a atacar":"Learn to attack",Comedor:"Dining room",Recibidor:"Hall",Patio:"Yard","Huerto de Judias":"Bean patch",Manzanos:"Apple trees",Ciruelos:"Plum trees",Banyo:"Bathroom",Habitacion:"Bedroom","Comedor norte":"Dining room, north",Cocina:"Kitchen","Huerto de calabazas":"Pumpkin patch",Naranjos:"Orange trees",Entrada:"Gate",Nogal:"Walnut trees",Cueva:"Cave","Lago interno":"Underground lake","Centro del lago":"Middle of the lake","Rio salvaje":"Wild river",Rio:"River","Bosque oscuro":"Dark forest","Rio oscuro":"Dark river","Bosque tenebroso":"Gloomy forest","Bosque sombrio":"Shadowy forest","Bosque humedo":"Damp forest",Bosque:"Forest","Claro del Bosque":"Forest clearing","Puente del bosque":"Forest bridge"},Z=`The tunnel of the dark, gloomy cave goes on. The walls are damp and
water can be heard running somewhere far off. Walk carefully, or you
will slip or trip.`,Ae=`The forest stretches out, dark and mysterious. The light blurs
through the leaves. You can hear the animals and the forest's other
inhabitants.`,Tt=`Though it is day, barely a glimmer of light gets in. Bushes, trees
and brambles make the going hard. Something moves in the dark.`,Un=`Little light comes through the leaves of the trees. Brambles and
bushes give way to a small stream. Something moves in the dark.`,Fs={"0,0":`Welcome to this adventure game.
This is the welcome room, where you will learn to move.
The commands are:
 'north',
 'south',
 'east',
 'west'.
Try going to the next room to the 'east', and coming back 'west'.`,"0,1":`In this room you will learn to take things and open locked doors.
The commands are:
 'take',
 and the ones for moving.
If you go north straight away you will not be able to; try it.
Then take the key ('take') and go north.`,"0,2":`It is the south end of your dining room. Soft light comes in from the
sitting room, and the chairs are waiting for your guests.`,"0,3":`It is the sitting room of your house; the light comes in through the
window and the curtains blur the outside. You can see your armchair,
a small table with a candlestick, and shelves with several books.`,"0,4":`By the south fence of your farm you have the cucumber patch. They
barely lift a finger off the ground, but you are already licking your
lips at the thought of them.`,"0,5":`By the south fence of your farm you have the tomato patch. They are
still green, but it looks like a very good harvest this year.`,"0,6":`A pretty little path runs off to the east, the farthest part of your
farm.`,"0,7":`This is the end of your little path; to the north are the fruit trees.
You have always liked walking here in spring to see the blossom.`,"1,0":`At last you have got into the pantry!
Now you can start cooking for your guests.
CONGRATULATIONS!`,"1,1":`It is time you learnt to attack your enemies. Go carefully, because
they will defend themselves.
There is only one command:
 'attack'.
For that you first need a weapon. Find one, take it, and attack.
When you win you can go on.`,"1,2":`You are in the dining room of your house; outside it is a glorious day
and you are expecting company. Today you have decided to lay on a
feast! The hall is to the west, the sitting room to the south, and the
kitchen to the west.`,"1,3":`It is a small hall, but a welcoming one. It is plainly decorated but
has a coat rack to leave a jacket on.
From here you can go straight to the sitting room, the dining room and
the kitchen.`,"1,4":`It is a splendid day and you are in the garden of your farm. Here you
can see several flowers you planted, and a fountain. Vegetable patches
surround you, and farther east are the fruit trees.`,"1,5":`A pretty bean patch opens up in front of you. You planted them only a
few weeks ago, but they are already in flower. The strong yellow of
the flowers stands out against the green of the plants.`,"1,6":`These are your apple trees. The rains have been generous this year and
you will have a good harvest. There are already a few apples, but most
are too green.`,"1,7":`You have always liked this part of the farm. The plum trees have red
leaves and give it a very fresh look. The river is to the north, and
your house to the south-west.`,"2,0":`This is the bathroom of your house. It is rustic, but it works. You
bought the bath recently, and beside it the towels are neatly folded.
To the south is the pantry.`,"2,1":`It is the room where you sleep. You have a bed of worked wood, with
plenty of blankets against the cold, and a dresser where you keep your
clothes. From the bedroom you can reach the dining room and the
bathroom.`,"2,2":`It is the north end of your big dining room. The table is extended for
the occasion and every place is laid. From here you can reach the
kitchen and your bedroom.`,"2,3":`This is your kitchen. You are pleased with your new wood-fired oven;
it cooks wonderfully. You have everything ready to make the meal, but
the ingredients are missing. You would have to fetch them from the
pantry.`,"2,4":`This is your pumpkin patch. They have barely begun to grow, but you
depend on them to eat this autumn. You cannot help wondering whether
to take one to your parents.`,"2,5":`Here you have one of your hardest-suffering crops. You do not usually
get many oranges, but you like them far too much. Their colour and
scent are wonderful to you.`,"2,6":`Here is the north gate of your farm. Two magnificent cypresses and
plenty of bushes crown it. You usually keep the gate shut; you have
never liked going into the forest. To the north is the river.`,"2,7":`Big walnut trees spread over this part of your farm. They are
especially interesting because, though their fruit is not as good as
the apples, they are hardy and get you through the winters.`,"3,0":Z,"3,1":Z,"3,2":`An immense underground lake opens up before you. It is dark and you
can barely see, but you sense something moving to the east.
You need a boat to get to the middle of the lake.`,"3,3":`You are in the middle of the lake in a small, fragile boat.
It is the home of Troildhem, an incredible, mysterious monster.
You had seen one like it before, but smaller.
Troildhem is several metres tall, with a dozen tentacles with eyes
on them.`,"3,4":`Here the river turns wild, but there is a bridge that lets you cross
safely to the other bank. The bridge has to be unlocked with a key
before you can cross.`,"3,5":`The river runs through here. You cannot cross, but farther west there
is a bridge.`,"3,6":`Your farm runs down to this river. To the north is the mysterious
forest, but you cannot cross here.`,"3,7":`The river widens and its waters grow calm; there are plenty of fish,
but something stirs beneath the surface.`,"4,0":Z,"4,1":Z,"4,2":Z,"4,3":Tt,"4,4":`The north bank of the river is dismal. Strange noises can be heard,
and you sense a curse. Here is the bridge that crosses to the south
bank; the air feels hostile and urges you across.`,"4,5":`The river flows under the rocks and the roots of the forest's trees.
The sounds of the forest grow louder and you feel watched.`,"4,6":`A gap between brambles and bushes lets you into the gloomy forest.
Light is scarce and the shadows are threatening.`,"4,7":Tt,"5,0":`The tunnel of the dark, gloomy cave goes on. A great cobweb blocks
the way south. One careless move could make you its prey.`,"5,1":Z,"5,2":`The tunnel of the dark, gloomy cave goes on. The walls are damp, and
the sound of water grows louder. Walk carefully, or you will slip or
trip.`,"5,3":`The forest is dark, and beside you you have found a great wall of
solid rock to the west: the mountain, probably.`,"5,4":Un,"5,5":Ae,"5,6":`The forest stretches out, dark and mysterious. You are in a small
clearing where the sky can be seen. You notice the forest is
restless.`,"5,7":Ae,"6,0":Z,"6,1":Z,"6,2":`You are inside the cave; it is dark and gloomy. The walls are damp and
water can be heard running somewhere far off. You try to look ahead,
but it seems to have no end.`,"6,3":`The forest is dark, and beside you you have found a great wall of
solid rock to the west: the mountain, probably. You notice the rock
is damp; there is very likely a cave.`,"6,4":`Little light comes through the leaves of the trees. Brambles and
bushes give way to a small stream. A bridge crosses the stream to the
eastern part of the forest; there, under a tree, is the house of a
troll you will have to get past if you want to go east.`,"6,5":Tt,"6,6":`The forest stretches out, dark, mysterious and restless. You are in a
small clearing where the sky can be seen.`,"6,7":`In this part of the forest the light begins to fail. Tangles of
bushes and brambles slow your steps. You notice something moving
among the shadows.`,"7,0":Z,"7,1":Z,"7,2":`You are a few steps inside the cave. Cold, damp air reaches you from
within. You try to see where it ends, but you cannot. You hear
murmurs from deep inside.`,"7,3":`Little light comes through the leaves of the trees. A tangle of
climbing plants stirs to the west: it is the mouth of a cave. You
feel a presence watching you.`,"7,4":Un,"7,5":Ae,"7,6":Ae,"7,7":Ae},be=(t,e)=>t[e]??e,Zt=Os.map(t=>({...t,name:be(bn,t.name)})),Rs=Ps.map(t=>({...t,name:be(yo,t.name),drops:be(bn,t.drops)})),bo=Object.fromEntries(Object.entries(Ns).map(([t,e])=>[t,{...e,name:be(Ls,e.name),holds:be(bn,be(yo,e.holds)),text:Fs[t]??e.text}])),Jn=["norte","sur","este","oeste"],Ds={norte:"north",sur:"south",este:"east",oeste:"west"},Bs={norte:[1,0],sur:[-1,0],este:[0,1],oeste:[0,-1]},Kn=16,Vn=[0,0],Xn=[1,0],ut=(t,e)=>t.find(n=>n.name===e);function Zn(t){const e=ut(Zt,t);if(e)return{item:e};const n=ut(Rs,t);return n?{monster:n}:null}class $e{places=new Map;at=[Vn[0],Vn[1]];life=Kn;weapon=null;shield=null;key=null;visited=new Set;constructor(){for(const[e,n]of Object.entries(bo))this.places.set(e,{room:n,exits:[...n.exits],holds:Zn(n.holds)});this.visited.add(this.here())}here(){return`${this.at[0]},${this.at[1]}`}place(){const e=this.places.get(this.here());if(!e)throw new Error(`no room at ${this.here()}`);return e}get won(){return this.at[0]===Xn[0]&&this.at[1]===Xn[1]}get spent(){return this.life<=0}save(){return JSON.stringify({at:this.at,life:this.life,held:[this.weapon?.name??null,this.shield?.name??null,this.key?.name??null],visited:[...this.visited],places:[...this.places].map(([e,n])=>[e,n.exits,n.holds?"item"in n.holds?n.holds.item.name:n.holds.monster.name:null])})}static load(e){const n=JSON.parse(e),a=new $e;a.at=n.at,a.life=n.life,[a.weapon,a.shield,a.key]=n.held.map(o=>o?ut(Zt,o)??null:null),a.visited.clear();for(const o of n.visited)a.visited.add(o);for(const[o,s,r]of n.places){const i=a.places.get(o);i&&Object.assign(i,{exits:s,holds:r?Zn(r):null})}return a}look(){const{room:e,exits:n,holds:a}=this.place();return{name:e.name,text:e.text,...a&&"monster"in a?{monster:a.monster.name}:{},...a&&"item"in a?{item:a.item.name}:{},exits:Jn.flatMap((o,s)=>(n[s]??-1)>=0?[{direction:o,locked:(n[s]??0)>0}]:[]),at:[this.at[0],this.at[1]],life:this.life,...this.weapon?{weapon:this.weapon.name}:{},...this.shield?{shield:this.shield.name}:{},...this.key?{key:this.key.name}:{}}}go(e){const n=this.place(),a=Jn.indexOf(e),o=n.exits[a]??-1;if(o<0)return"There is no way out that way.";if(o>0){if(!this.key||this.key.value!==o)return"The way is locked and you are not carrying the key.";n.exits[a]=0,this.key=null}const[s,r]=Bs[e];return this.at=[this.at[0]+s,this.at[1]+r],this.visited.add(this.here()),""}take(){const e=this.place();if(!e.holds||!("item"in e.holds))return"There is nothing here to take!";const{item:n}=e.holds;if(n.kind==="food")return this.life=Math.min(Kn,this.life+n.value),e.holds=null,"Yum yum!";const a=n.kind,o=this[a];return this[a]=n,e.holds=o?{item:o}:null,{weapon:"You have taken a weapon.",shield:"You have taken a shield.",key:"You have taken a key."}[a]}attack(){const e=this.place();if(!e.holds||!("monster"in e.holds))return"There is no monster to attack!";if(!this.weapon)return"You have no weapon to attack with!";const{monster:n}=e.holds,a=[];if(this.weapon.value-n.defence>0){const s=ut(Zt,n.drops);e.holds=s?{item:s}:null,a.push("The monster has been defeated!")}const o=n.attack-(this.shield?.value??0);return o>0&&(this.life-=o,a.push("OUCH!")),a.join(" ")||"Neither of you gets anywhere."}run(e){const n=e.trim().toLowerCase(),a={norte:"norte",north:"norte",n:"norte",sur:"sur",south:"sur",s:"sur",este:"este",east:"este",e:"este",oeste:"oeste",west:"oeste",w:"oeste"}[n];return a?this.go(a):n==="coger"||n==="take"||n==="get"?this.take():n==="atacar"||n==="attack"||n==="hit"?this.attack():n==="mirar"||n==="look"||n==="l"||n===""?"":"I do not understand you."}}const Hs={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"};function S(t){return t.replace(/[&<>"]/g,e=>Hs[e]??e)}const ze=8;function Ws(t,e){const n=[];for(let a=ze-1;a>=0;a-=1)for(let o=0;o<ze;o+=1){const s=`${a},${o}`,r=bo[s],i=t.has(s),h=e[0]===a&&e[1]===o,l=["cell",i?"seen":"",h?"here":""].filter(Boolean).join(" ");n.push(`<span class="${l}" title="${i&&r?S(r.name):""}">${i&&r?S(r.name):""}</span>`)}return`<div class="map" role="img" aria-label="The map: ${t.size} of ${ze*ze} rooms seen">${n.join("")}</div>`}function qs(t){const e=t.exits.map(({direction:a,locked:o})=>`${Ds[a]}${o?" (locked)":""}`),n=[t.weapon&&`weapon:${t.weapon}`,t.shield&&`shield:${t.shield}`,t.key&&`key:${t.key}`].filter(Boolean).join(" ");return`<div class="seen"><h4>===== ${S(t.name)} =====</h4><p>${S(t.text).replace(/\n/g,"<br>")}</p>`+(t.monster?`<p class="monster">There is a monster here: ${S(t.monster)}</p>`:"")+(t.item?`<p class="item">There is: ${S(t.item)}</p>`:"")+`<p class="exits">Exits: ${e.length?e.join(", "):"none"}.</p><p class="status">(${t.at[1]},${t.at[0]})| ${S(n)} ${t.life}&gt;</p></div>`}function vo(t){return`<div class="adventure">${Ws(t.visited,t.look().at)}${qs(t.look())}</div>`}const _s=()=>vo(new $e);function f(t,e={},...n){const a=document.createElement(t);for(const[o,s]of Object.entries(e))s===void 0||s===!1||(typeof s=="function"?a.addEventListener(o.slice(2).toLowerCase(),s):s===!0?a.setAttribute(o,""):a.setAttribute(o,String(s)));for(const o of n)o==null||o===!1||a.append(o);return a}const ko="adventure",zs=["north","south","east","west","take","attack"];function Ys(t){let e=Gs()??new $e;const n=f("div"),a=f("p",{class:"said"}),o=f("input",{type:"text",autocomplete:"off",spellcheck:!1,placeholder:"north, south, east, west, take, attack"});function s(c=""){n.innerHTML=vo(e),a.textContent=e.spent&&!c?"Game over; better luck next time.":c,e.won&&(a.textContent="CONGRATULATIONS! You have reached the pantry."),i()}function r(c){const d=e.run(c);s(d),o.value="",o.focus()}function i(){try{localStorage.setItem(ko,e.save())}catch{}}const h=f("form",{onsubmit:c=>(c.preventDefault(),r(o.value))},f("span",{class:"ps1"},"> "),o),l=f("div",{class:"row"},...zs.map(c=>f("button",{type:"button",onclick:()=>r(c)},c)),f("button",{type:"button",class:"quiet",onclick:()=>(e=new $e,s(""))},"start again"));return t.replaceChildren(n,a,h,l),s(""),()=>i()}function Gs(){try{const t=localStorage.getItem(ko);return t?$e.load(t):null}catch{return null}}const Us={name:"adventure",apps:{adventure:Ys},stills:{adventure:_s}},Js=["January","February","March","April","May","June","July","August","September","October","November","December"];function gt(t){const[e,n,a]=t.refreshed.split("-").map(Number),o=`${a} ${Js[(n??1)-1]} ${e}`,s=`${Math.min(...t.years)} to ${Math.max(...t.years)}`;return`<p class="source">Source: ${S(t.attribution)} <a href="${S(t.dataset)}">The dataset, at its source.</a> This site keeps sums of the finished years ${s}, last added to on ${o}.</p>`}function vn(t,e){const n=t.querySelector("p.source");if(n)return n;const a=document.createElement("div");return fetch(e).then(o=>o.json()).then(o=>{a.innerHTML=gt(o)}).catch(()=>{}),a}const we=[{code:"08019004",name:"Barcelona (Poblenou)",kind:"background",area:"urban"},{code:"08019043",name:"Barcelona (Eixample)",kind:"traffic",area:"urban"},{code:"08019044",name:"Barcelona (Gràcia - Sant Gervasi)",kind:"traffic",area:"urban"},{code:"08019057",name:"Barcelona (Palau Reial)",kind:"background",area:"urban"},{code:"08019058",name:"Barcelona (Observatori Fabra)",kind:"background",area:"suburban"},{code:"08015021",name:"Badalona",kind:"background",area:"urban"},{code:"08187012",name:"Sabadell",kind:"traffic",area:"urban"},{code:"17079003",name:"Girona (Escola de Música)",kind:"traffic",area:"urban"},{code:"25120001",name:"Lleida",kind:"traffic",area:"urban"},{code:"43148028",name:"Tarragona (Parc de la Ciutat)",kind:"background",area:"urban"},{code:"08137001",name:"Montseny (La Castanya)",kind:"background",area:"rural"}];function Qt(t,e){return e==="workdays"?[t.workdays]:e==="weekends"?[t.weekends]:[t.workdays,t.weekends]}const Ks=t=>(t%4===0&&t%100!==0||t%400===0?366:365)*24,St=t=>t.reduce((e,n)=>e+n.reduce((a,o)=>a+o,0),0);function Vs(t,e){return Object.entries(t.years).map(([n,a])=>{const o=Qt(a,e),s=o.reduce((h,l)=>h+St(l.counts),0),r=o.reduce((h,l)=>h+St(l.sums),0),i=Qt(a,"all").reduce((h,l)=>h+St(l.counts),0);return{year:Number(n),mean:s>0?r/s:Number.NaN,measured:i/Ks(Number(n))}}).filter(({mean:n})=>!Number.isNaN(n)).sort((n,a)=>n.year-a.year)}function Xs(t,e){const n=Object.entries(t.years).filter(([a])=>Number(a)>=e.from&&Number(a)<=e.to).flatMap(([,a])=>Qt(a,e.days));return Array.from({length:24},(a,o)=>Array.from({length:12},(s,r)=>{const i=n.reduce((l,c)=>l+(c.sums[r]?.[o]??0),0),h=n.reduce((l,c)=>l+(c.counts[r]?.[o]??0),0);return{mean:h>0?i/h:null,count:h}}))}const me=[[0,[0,255,0]],[20,[225,225,0]],[40,[255,0,0]],[60,[225,0,225]],[80,[64,0,64]],[230,[16,0,8]]],Zs=([t,e,n])=>(.299*t+.587*e+.114*n)/255;function kn(t){const e=Math.max(0,Math.min(t,230)),n=Math.max(1,me.findIndex(([l])=>l>=e)),[a,o]=me[n-1]??me[0],[s,r]=me[n]??me[me.length-1],i=(e-a)/(s-a),h=o.map((l,c)=>Math.round(l+((r[c]??0)-l)*i));return{background:`rgb(${h.join(",")})`,light:Zs(h)<.45}}const lt=80,xo=["January","February","March","April","May","June","July","August","September","October","November","December"],$o=t=>String(t+1).padStart(2,"0");function Qs(t,e,n){if(t.mean===null)return'<td class="none"></td>';const{background:a,light:o}=kn(t.mean),s=o?' class="deep"':"",r=`${xo[n]}, hour ${$o(e)}: ${t.mean.toFixed(1)} µg/m³, the mean of ${t.count} measurements`;return`<td${s} style="background:${a}" title="${r}">${Math.round(t.mean)}</td>`}function er(t){const e=`<tr><th></th>${xo.map(a=>`<th scope="col">${a.slice(0,3)}</th>`).join("")}</tr>`,n=t.map((a,o)=>`<tr><th scope="row">${$o(o)}</th>${a.map((s,r)=>Qs(s,o,r)).join("")}</tr>`);return`<table class="heat graded"><thead>${e}</thead><tbody>${n.join("")}</tbody></table>`}function xn(t){if(t<=0)return[0];const e=10**Math.floor(Math.log10(t)),n=t/e>=5?e:t/e>=2?e/2:e/5,a=[];for(let o=0;o<=t;o+=n)a.push(Math.round(o*100)/100);return a}const Ye=720,Mt=190,J={top:14,right:8,bottom:22,left:34},D=t=>t.toFixed(1);function To(t,e,n){const a=Math.min(...t),o=Math.max(...t),s=Ye-J.left-J.right,r=Mt-J.top-J.bottom,i=s/Math.max(1,o-a+1),h=u=>J.left+(u-a)*i,l=u=>J.top+r-(u-e)/Math.max(1e-9,n-e)*r,d=xn(n-e).map(u=>Math.round((u+e)*100)/100).map(u=>`<line class="grid" x1="${J.left}" x2="${Ye-J.right}" y1="${D(l(u))}" y2="${D(l(u))}"/><text x="${J.left-4}" y="${D(l(u)+3)}" text-anchor="end">${u}</text>`).join(""),p=o-a>12?5:1,m=Array.from({length:o-a+1},(u,g)=>a+g).filter(u=>u%p===0).map(u=>`<text x="${D(h(u)+i/2)}" y="${Mt-6}" text-anchor="middle">${u}</text>`).join("");return{slot:i,x:h,y:l,left:J.left,right:Ye-J.right,top:J.top,height:r,levels:u=>u.map(({from:g,to:k,value:w,label:v})=>`<line class="span" x1="${D(h(g))}" x2="${D(h(k)+i)}" y1="${D(l(w))}" y2="${D(l(w))}"/><text class="span" x="${D((h(g)+h(k)+i)/2)}" y="${D(l(w)-5)}" text-anchor="middle">${v}</text>`).join(""),wrap:(u,g)=>`<svg class="years" viewBox="0 0 ${Ye} ${Mt}" role="img" aria-label="${u}">${d}${m}${g}</svg>`}}function en(t,e){const n=Math.max(e.top??0,...t.map(({value:c})=>c),1),a=To(t.map(({year:c})=>c),0,n),{x:o,y:s,slot:r}=a,i=t.map(({year:c,value:d,title:p,chosen:m,partial:u,colour:g})=>`<rect class="${["bar",m?"chosen":"",u?"partial":""].filter(Boolean).join(" ")}" data-year="${c}"${g?` style="--bar:${g}"`:""} x="${D(o(c)+r*.15)}" y="${D(s(d))}" width="${D(r*.7)}" height="${D(s(0)-s(d))}"/><rect class="hit" data-year="${c}" x="${D(o(c))}" y="${a.top}" width="${D(r)}" height="${a.height}"><title>${p}</title></rect>`).join(""),h=(e.references??[]).map(({value:c,label:d})=>`<line class="reference" x1="${a.left}" x2="${a.right}" y1="${D(s(c))}" y2="${D(s(c))}"/><text class="reference" x="${a.right-2}" y="${D(s(c)-3)}" text-anchor="end">${d}</text>`).join(""),l=a.levels(e.spans??[]);return a.wrap(e.label,`${i}${h}${l}`)}const tr=.75,nr=[{value:40,label:"EU limit, 40"},{value:10,label:"WHO guideline, 10"}];function ar(t,e){const n=t.map(({year:a,mean:o,measured:s})=>{const r=s<tr,i=r?`, from only ${Math.round(s*100)}% of the year's hours`:"";return{year:a,value:o,partial:r,colour:kn(o).background,chosen:a>=e.from&&a<=e.to,title:`${a}: ${o.toFixed(1)} µg/m³${i}`}});return en(n,{label:"Mean NO2 of each year, µg/m³",top:lt,references:nr})}const Qn={all:"every day of the week",workdays:"Monday to Friday",weekends:"Saturdays and Sundays"};function or(){const t=Array.from({length:lt/5+1},(n,a)=>kn(a*5).background),e=[0,20,40,60,lt].map(n=>`<span>${n===lt?`${n}+`:n}</span>`).join("");return`<div class="scale" aria-hidden="true"><div class="ramp" style="background:linear-gradient(to right,${t.join(",")})"></div><div class="ticks">${e}</div><div class="ticks words"><span>clean</span><span>EU limit</span><span>twice it</span></div></div>`}function So(t,e){const n=Object.keys(t.years).map(Number),a=Math.max(e.from,Math.min(...n)),o=Math.min(e.to,Math.max(...n)),s=a===o?String(a):`${a}–${o}`;return`<figure class="no2"><figcaption><strong>${t.name}</strong> · ${t.kind}, ${t.area} · mean NO2 in µg/m³ by hour of the day and month of the year · ${Qn[e.days]}, ${s}</figcaption>`+er(Xs(t,e))+or()+`<h4>The mean of each year, ${Qn[e.days]}</h4>`+ar(Vs(t,e.days),{from:a,to:o})+"</figure>"}function Fe(t){const e=Object.keys(t.years).map(Number);return{from:Math.min(...e),to:Math.max(...e),days:"all"}}const sr=[["all","every day"],["workdays","Monday to Friday"],["weekends","Saturday and Sunday"]];function rr(t){const e=new Map,n=vn(t,"/data/no2/index.json"),a=f("div");a.append(...t.querySelectorAll("figure"));let o=null,s={from:0,to:9999,days:"all"},r=!1;const i=(w,v=String(w))=>f("option",{value:w},v),h=f("select",{onchange:()=>{g(h.value)}},...we.map(({code:w,name:v})=>i(w,v))),l=f("select",{onchange:()=>u({days:l.value})},...sr.map(([w,v])=>i(w,v))),c=f("select",{onchange:()=>u({from:Number(c.value),to:Math.max(Number(c.value),s.to)})}),d=f("select",{onchange:()=>u({to:Number(d.value),from:Math.min(Number(d.value),s.from)})}),p=f("button",{type:"button",onclick:()=>o&&u(Fe(o))},"every year");function m(){o&&(a.innerHTML=So(o,s),c.value=String(s.from),d.value=String(s.to),l.value=s.days)}function u(w){s={...s,...w},m()}async function g(w){const v=e.get(w)??fetch(`/data/no2/${w}.json`).then(y=>y.json());e.set(w,v);try{const y=await v;if(r||h.value!==w)return;const $=Fe(y),I=o!==null&&(s.from!==Fe(o).from||s.to!==Fe(o).to),M=Object.keys(y.years).map(Number).filter(C=>C>=s.from&&C<=s.to),b=I&&M.length>0?{from:Math.min(...M),to:Math.max(...M)}:$;o=y,s={...b,days:s.days};const T=Object.keys(y.years);c.replaceChildren(...T.map(C=>i(C))),d.replaceChildren(...T.map(C=>i(C))),m()}catch{e.delete(w),a.replaceChildren(f("p",{},"The measurements for this station did not arrive. The rest of the page does not depend on them."))}}a.addEventListener("click",w=>{const v=w.target?.closest("[data-year]")?.getAttribute("data-year");v&&u({from:Number(v),to:Number(v)})});const k=f("div",{class:"row"},f("label",{},"Station ",h),f("label",{},"Days ",l),f("label",{},"Years ",c," to ",d),p);return t.replaceChildren(k,a,n),g(h.value),()=>{r=!0}}const ir="https://analisi.transparenciacatalunya.cat/resource";function Mo(t,e){const n=new URL(`${ir}/${t}.json`);for(const[a,o]of Object.entries(e))o!==void 0&&n.searchParams.set(`$${a}`,String(o));return n.toString()}const ea="tasf-thgu",Ao=Array.from({length:24},(t,e)=>String(e+1).padStart(2,"0")),hr=0,lr=6,Ge=()=>Array.from({length:12},()=>new Array(24).fill(0)),cr=()=>({workdays:{sums:Ge(),counts:Ge()},weekends:{sums:Ge(),counts:Ge()}});function dr(t){if(!Array.isArray(t))throw new Error("the portal did not answer with rows");if(t.length===0)throw new Error("the portal answered with no rows");return t}function ur(t,e){const n=Number(e.month)-1;Ao.forEach((a,o)=>{const s=t.sums[n],r=t.counts[n];if(!s||!r)throw new Error(`month ${e.month} is not a month`);s[o]=(s[o]??0)+Number(e[`s${a}`]??0),r[o]=(r[o]??0)+Number(e[`n${a}`]??0)})}const mr={name:"no2",directory:"public/data/no2",firstYear:1991,files:we.map(t=>`${t.code}.json`),about:{measures:"NO2, hourly, µg/m³",network:"Xarxa de Vigilància i Previsió de la Contaminació Atmosfèrica",attribution:"Generalitat de Catalunya, Xarxa de Vigilància i Previsió de la Contaminació Atmosfèrica. Dades obertes.",dataset:`https://analisi.transparenciacatalunya.cat/d/${ea}`,stations:we},requestsFor(t){const e=we.map(a=>`'${a.code}'`).join(","),n=Ao.map(a=>`sum(h${a}) as s${a}, count(h${a}) as n${a}`).join(", ");return[Mo(ea,{select:`codi_eoi, date_extract_m(data) as month, date_extract_dow(data) as dow, count(*) as days, ${n}`,where:`contaminant='NO2' and codi_eoi in (${e}) and data between '${t}-01-01T00:00:00' and '${t}-12-31T23:59:59'`,group:"codi_eoi,month,dow",limit:5e3})]},withYear(t,e,n){const a=dr(n[0]);if(a.some(s=>Number(s.days)>5))throw new Error("some days are in the portal twice");if(!a.some(s=>s.month==="12"))throw new Error("the year does not reach December yet");const o=new Map;for(const s of a){const r=s.codi_eoi??"",i=o.get(r)??cr();o.set(r,i);const h=Number(s.dow);ur(h===hr||h===lr?i.weekends:i.workdays,s)}return Object.fromEntries(we.map(s=>{const r=`${s.code}.json`,i=o.get(s.code),h={...t[r]?.years,...i?{[e]:i}:{}};return[r,{...s,years:h}]}))}},pr=t=>{const e=JSON.parse(t(`/data/no2/${we[0]?.code}.json`)),n=JSON.parse(t("/data/no2/index.json"));return So(e,Fe(e))+gt(n)},fr={name:"air-quality",apps:{no2:rr},stills:{no2:pr},sources:[mr]},ve=5,wt=8,Ie=t=>Math.max(0,Math.min(100,t));function ta(t){const{focus:e,fatigue:n,featureSize:a,weeks:o,calendar:s,meetingTypes:r}=t,i=[];let h=0,l=0;for(let c=0;c<o;c+=1)for(let d=0;d<ve;d+=1){let p=0,m=0;for(let u=0;u<wt;u+=1){const g=r[s[`${d}-${u}`]??""];if(g){p=Ie(p+g.focus),m=Ie(m+g.fatigue),i.push({week:c,day:d,hour:u,inMeeting:!0,hourFocus:p,hourFatigue:m,hourProductivity:0,accumulatedProductivity:h,completedFeatures:l,featureCompleted:!1});continue}p=Ie(p+e),m=Ie(m+n);const k=Ie(p-m),w=a-h,v=k>w,y=v?w:k;v?(l+=1,h=0):h+=y,i.push({week:c,day:d,hour:u,inMeeting:!1,hourFocus:p,hourFatigue:m,hourProductivity:y,accumulatedProductivity:h,completedFeatures:l,featureCompleted:v}),v&&(p=0)}}return i}function Ue(){return Array.from({length:wt},()=>new Array(ve).fill(0))}function Je(t,{hour:e,day:n},a){const o=t[e];o&&(o[n]=(o[n]??0)+a)}function na(t,{featureSize:e,weeks:n}){const a=t[t.length-1],o=a?.completedFeatures??0,s=a?.accumulatedProductivity??0,r=o+Math.round(10*s/e)/10,i=o*e+s,h=Array.from({length:ve},()=>({productivity:0,features:0,meetings:0})),l={focus:Ue(),fatigue:Ue(),productivity:Ue(),features:Ue()};for(const d of t){const p=h[d.day];p.productivity+=d.hourProductivity,d.featureCompleted&&(p.features+=1),d.inMeeting&&(p.meetings+=1),Je(l.focus,d,d.hourFocus),Je(l.fatigue,d,d.hourFatigue),Je(l.productivity,d,d.hourProductivity),d.featureCompleted&&Je(l.features,d,1)}const c=d=>d.map(p=>p.map(m=>n>0?m/n:0));return{totalFeatures:r,totalProductivity:i,averageFeaturesPerWeek:n>0?r/n:0,averageProductivityPerWeek:n>0?i/n:0,days:h,hours:{focus:c(l.focus),fatigue:c(l.fatigue),productivity:c(l.productivity),features:l.features}}}const mt=480,ce=240,B={top:10,right:10,bottom:34,left:36};function Io(t,e,n,a){const o=mt-B.left-B.right,s=ce-B.top-B.bottom,r=l=>B.top+s-(t>0?l/t*s:0),i=a.map(l=>`<line class="grid" x1="${B.left}" x2="${mt-B.right}" y1="${r(l)}" y2="${r(l)}"/><text x="${B.left-4}" y="${r(l)+3}" text-anchor="end">${l}</text>`).join(""),h=(n>1?[1,Math.ceil(n/2),n]:[]).filter((l,c,d)=>d.indexOf(l)===c).map(l=>`<text x="${B.left+(l-1)/Math.max(1,n-1)*o}" y="${ce-B.bottom+14}" text-anchor="middle">${l}</text>`).join("");return`${i}${h}<text x="${B.left+o/2}" y="${ce-6}" text-anchor="middle">${e.x}</text><text transform="translate(9 ${B.top+s/2}) rotate(-90)" text-anchor="middle">${e.y}</text>`}function gr(t,e){const n=Math.max(...t.map(c=>c.values.length),1),a=Math.max(1,...t.flatMap(c=>c.values)),o=mt-B.left-B.right,s=ce-B.top-B.bottom,r=c=>B.left+c/Math.max(1,n-1)*o,i=c=>B.top+s-c/a*s,h=t.map(c=>{const d=c.values.map((p,m)=>`${r(m).toFixed(1)},${i(p).toFixed(1)}`).join(" ");return`<polyline class="line ${c.className}" points="${d}"><title>${c.name}</title></polyline>`}).join(""),l=t.map((c,d)=>`<rect class="${c.className}" x="${B.left+d*90}" y="${ce-B.bottom+20}" width="10" height="3"/><text x="${B.left+d*90+14}" y="${ce-B.bottom+24}">${c.name}</text>`).join("");return`<svg viewBox="0 0 ${mt} ${ce}" role="img" aria-label="${e.y} by ${e.x}">${Io(a,e,n,xn(a))}${h}${l}</svg>`}const aa=480,Ee=240,Y={top:10,right:10,bottom:34,left:36};function Eo(t,e,n){const a=Math.max(...t.map(u=>u.values.length),1),o=Math.max(1,...t.flatMap(u=>u.values)),s=aa-Y.left-Y.right,r=Ee-Y.top-Y.bottom,i=s/a,h=i*.7/t.length,l=u=>Y.top+r-u/o*r,c=t.map((u,g)=>u.values.map((k,w)=>{const v=Y.left+w*i+i*.15+g*h;return`<rect class="${u.className}" x="${v.toFixed(1)}" y="${l(k).toFixed(1)}" width="${h.toFixed(1)}" height="${(Y.top+r-l(k)).toFixed(1)}"><title>${u.name}: ${Math.round(k*10)/10}</title></rect>`}).join("")).join(""),d=(n??[]).map((u,g)=>`<text x="${Y.left+g*i+i/2}" y="${Ee-Y.bottom+14}" text-anchor="middle">${u}</text>`).join(""),p=t.map((u,g)=>`<rect class="${u.className}" x="${Y.left+g*90}" y="${Ee-Y.bottom+20}" width="10" height="3"/><text x="${Y.left+g*90+14}" y="${Ee-Y.bottom+24}">${u.name}</text>`).join(""),m=Io(o,e,n?0:a,xn(o));return`<svg viewBox="0 0 ${aa} ${Ee}" role="img" aria-label="${e.y} by ${e.x}">${m}${c}${d}${p}</svg>`}const tn=["Mon","Tue","Wed","Thu","Fri"],jo=Array.from({length:wt},(t,e)=>`${9+e}:00`);function wr(t){return t<=500?t:t<=750?500+(t-500)*2:t<1e3?1e3+(t-750)*35:1e4}function yr(t){return t<=500?t:t<=1e3?500+(t-500)/2:t<1e4?750+(t-1e3)/35:1e3}function Ke(t,e){const n=e.flat(),a=Math.min(...n),o=Math.max(...n),s=f("div",{class:"week"},f("span"),...tn.map(r=>f("span",{class:"head"},r)));return e.forEach((r,i)=>{s.append(f("span",{class:"hour"},jo[i]??""));for(const h of r){const l=o>a?(h-a)/(o-a):0;s.append(f("span",{class:"cell",style:`--heat:${(.1+l*.9).toFixed(2)}`},String(Math.round(h))))}}),f("div",{},f("h4",{},t),s)}function br(t){const e={focus:25,fatigue:15,featureSize:300,weeks:8},n={"🍽️ Lunch":{focus:-100,fatigue:-100},"🏃 Sprint plan":{focus:-100,fatigue:50},"😴 Boring":{focus:-50,fatigue:-25}},a={};for(let j=0;j<ve;j+=1)a[`${j}-3`]="🍽️ Lunch";let o="🏃 Sprint plan",s=null;const r=f("div",{class:"figures"}),i=f("div",{class:"chart"}),h=f("div",{class:"maps"}),l=f("div",{class:"week"}),c=f("select"),d=f("input",{type:"number",min:-100,max:100}),p=f("input",{type:"number",min:-100,max:100}),m=f("input",{type:"text",placeholder:"New meeting name",size:16}),u=(j,A,O,x,E=F=>F,N=F=>F)=>{const F=f("output",{},String(e[j])),L=f("input",{type:"range",min:O,max:x,value:N(e[j]),oninput:()=>{e[j]=E(Number(L.value)),F.textContent=String(e[j]),P()}});return f("label",{},`${A}: `,F,L)},g=f("div",{class:"dials"},u("focus","Focus an hour",0,100),u("fatigue","Fatigue an hour",0,100),u("featureSize","Feature size",0,1e3,wr,yr),u("weeks","Weeks",1,16));function k(){c.replaceChildren(...Object.keys(n).map(A=>f("option",{value:A,selected:A===o},A)));const j=n[o];d.value=String(j?.focus??0),p.value=String(j?.fatigue??0)}c.addEventListener("change",()=>{o=c.value,k()});const w=()=>{n[o]={focus:Number(d.value)||0,fatigue:Number(p.value)||0},P()};d.addEventListener("change",w),p.addEventListener("change",w);const v=()=>{const j=m.value.trim();!j||n[j]||(n[j]={focus:0,fatigue:0},o=j,m.value="",k())},y=f("div",{class:"row"},f("span",{},"Paint: "),c,f("span",{},"focus "),d,f("span",{},"fatigue "),p,m,f("button",{type:"button",onclick:v},"Add"));let $=null;const I=j=>{if($==="add"&&!a[j])a[j]=o;else if($==="remove"&&a[j])delete a[j];else return;P()};function M(){l.replaceChildren(f("span"),...tn.map(j=>f("span",{class:"head"},j))),jo.forEach((j,A)=>{l.append(f("span",{class:"hour"},j));for(let O=0;O<ve;O+=1){const x=`${O}-${A}`,E=a[x];l.append(f("span",{class:E?"slot meeting":"slot",title:E??"free",onpointerdown:N=>{N.preventDefault(),$=a[x]?"remove":"add",I(x)},onpointerenter:()=>{$&&I(x)}},E?E.slice(0,2):""))}})}window.addEventListener("pointerup",()=>{$=null});const b=f("div",{class:"row"}),T=()=>{s={summary:na(ta({...e,calendar:a,meetingTypes:n}),e),weeks:e.weeks},P()},C=()=>{s=null,P()};function P(){M();const j=ta({...e,calendar:a,meetingTypes:n}),A=na(j,e),O=e.weeks*ve*wt;r.replaceChildren(f("div",{class:"clean"},f("strong",{},A.totalFeatures.toFixed(1)),"features finished"),f("div",{},f("strong",{},A.averageFeaturesPerWeek.toFixed(2)),"features a week"),f("div",{},f("strong",{},Math.round(A.totalProductivity/O).toString()),"productivity an hour"),f("div",{},f("strong",{},String(O)),"hours simulated")),b.replaceChildren(s?f("span",{},`Baseline: ${s.summary.averageFeaturesPerWeek.toFixed(2)} features a week over ${s.weeks} weeks; now ${A.averageFeaturesPerWeek.toFixed(2)}. `):f("span",{},"Keep this run to compare against: "),f("button",{type:"button",onclick:T},s?"Save again":"Save as baseline")),s&&b.append(f("button",{type:"button",onclick:C},"Clear")),i.innerHTML=Eo([{name:"Productivity",className:"clean",values:A.days.map(x=>x.productivity/e.weeks)},{name:"Features ×100",className:"debt",values:A.days.map(x=>x.features/e.weeks*100)}],{x:"",y:"A day, on average"},tn),i.prepend(f("h4",{},"The shape of a week")),h.replaceChildren(Ke("Focus",A.hours.focus),Ke("Fatigue",A.hours.fatigue),Ke("Productivity",A.hours.productivity),Ke("Features finished",A.hours.features))}k(),t.append(g,y,f("div",{class:"charts"},l,i),r,b,h),P()}const vr={name:"developer-meetings",apps:{"developer-meetings":br}};function $n(t){let e=!0;if(typeof IntersectionObserver!="function")return{onScreen:()=>e,stop:()=>{}};const n=new IntersectionObserver(a=>{for(const o of a)e=o.isIntersecting},{rootMargin:"100px"});return n.observe(t),{onScreen:()=>e,stop:()=>n.disconnect()}}const je={exams:[.01,.01,.02,.01,.05,.2,.05,.1,.2,.3,.5,.4,.3,.2,.1,.05,.1,.3,.8,1,.4],labs:[.01,.02,.03,.04,.06,.09,.12,.17,.23,.32,.44,.48,.58,.78,.87,.89,.78,.75,.62,.45,.2]},At={x:{frames:1,pace:1},normal:{frames:2,pace:1},normal1:{frames:2,pace:1},normal2:{frames:2,pace:1},est:{frames:7,pace:5},zz:{frames:2,pace:5},bt:{frames:6,pace:1},http:{frames:8,pace:2},pract:{frames:5,pace:1},no:{frames:4,pace:3},bar0:{frames:6,pace:1},amig:{frames:4,pace:3},suplica:{frames:2,pace:3}};class Co{static everyImage=Object.entries(At).flatMap(([e,{frames:n}])=>Array.from({length:n},(a,o)=>`${e}${o}`));series="x";frame=0;wait=0;after=null;shaking=-1;get image(){return`${this.series}${this.frame}`}play(e){if(this.shaking>=0){this.after=e;return}e!==this.series&&(this.wait=0),this.show(e)}flash(e,n){this.shaking<0&&(this.after=this.series),this.shaking=n,this.show(e)}stop(){this.shaking=-1,this.after=null,this.series="x",this.frame=0}beat(){if(this.shaking===0&&this.after&&this.show(this.after),this.shaking>=0&&(this.shaking-=1),this.wait>0&&(this.wait-=1),this.wait>0)return;const{frames:e,pace:n}=At[this.series];this.frame=(this.frame+1)%e,this.wait=n}show(e){this.series=e,this.frame%=At[e].frames}}const U=3,re=16,kr=25,ae=20,oa=22,It=200,Et=100,jt=100,sa=30,ra=-10,xr=.05,$r=.3,ia=10/U,ha={superior:40,tecnica:25},Tr={step:0,hour:0,day:0,term:1,doing:"idle",boredom:0,stress:0,labHabit:10,studyHabit:10,chatHabit:10,barHabit:10,friends:10,sleep:0,terminal:0,exams:Array(10).fill(0),labs:Array(10).fill(0),enrolled:4,passed:0,left:9,selection:!0,alfas:Array(6).fill(1),asks:null,suggested:0,ended:null,said:[]},Sr=`Sorry, but you no longer belong to this faculty. :(



Normal.`,Mr=`Hey, what are you playing at????
Have you never had a pet??!!!??
Thanks to you the poor thing nearly died of
boredom in this faculty!!!! Let's see if
we give it a little more attention,
and the excuse that it gets bored
because there are no girls at the FIB won't do!
(because there are, and some of them are really
pretty, and this is not flattery, boti boti boti).
So now you know, this is all
YOUR FAULT (a pet gets a little
attention, doesn't it?)`,Ar=`Don't you know that stress is really bad
for your health? Your Fibergochi has had to
leave the faculty, be more careful next time!
See if you can take its mind off things a little,
make new and interesting friends... or not so much...`;class nn{constructor(e,n={}){this.random=e;const a={...Tr,...n};this.s={...a,exams:[...a.exams],labs:[...a.labs],alfas:[...a.alfas],said:[...a.said]},this.s.ended===null&&this.show(this.s.doing)}random;s;sprite=new Co;beats=0;get state(){return{...this.s,exams:[...this.s.exams],labs:[...this.s.labs],alfas:[...this.s.alfas],said:[...this.s.said]}}get picture(){return this.sprite.image}get clock(){const e=this.s.step+this.s.hour*U,n=e*30%60;return`${this.s.day+1}, ${Math.floor(e/(U*re)*24)}:${n<10?"0":""}${n}h (${this.s.term})`}get examsPending(){return this.studyLeft>0}get labsPending(){return this.labLeft>0}get studyLeft(){return this.taken(this.s.exams).reduce((e,n)=>e+Math.max(n,0),0)}get labLeft(){return this.taken(this.s.labs).reduce((e,n)=>e+Math.max(n,0),0)}get hasTerminal(){return this.s.terminal>0}get lampsLit(){return this.s.day<ae||this.beats%3===1}get enrolment(){return{most:Math.min(10,this.s.left),suggested:this.s.suggested}}get alive(){return this.s.ended===null}get waiting(){return this.s.said.length>0||this.s.asks!==null}step(){!this.alive||this.waiting||(this.keepHabits(),this.studyOrWork(),this.holdTerminal(),this.browseOn(),this.getBored(),this.calmDown(),this.alive&&(this.searchTerminal(),this.followHabits(),this.stayAtBar(),this.s.step+=1,this.s.step>=U&&(this.s.step=0,this.nextHour())))}animate(){!this.alive||this.waiting||(this.beats+=1,this.sprite.beat())}studyOrSleep(){this.alive&&(this.s.day<=ae?this.set(this.random()<.5?"studying":"asleep"):this.sprite.flash("no",24))}browse(){this.alive&&(this.s.terminal?this.set("browsing"):this.sprite.flash("no",14))}goToBar(){this.alive&&this.set("bar")}makeFriends(){this.alive&&this.set("friends")}lookForTerminal(){this.alive&&(this.s.terminal<=0?this.set("looking"):this.sprite.flash("no",10))}beg(){if(!this.alive)return;const{exams:e,labs:n}=this.s,a=r=>e[r]+n[r],o=this.taken(e).map((r,i)=>i).filter(r=>a(r)>0);if(this.s.day<ae||o.length===0)return this.sprite.flash("no",10);const s=o.reduce((r,i)=>a(i)<a(r)?i:r);this.sprite.flash("suplica",20),this.random()<$r&&(e[s]-=this.random()*ia),this.s.stress+=ia*this.random()}alfa(){if(!this.alive)return;const{term:e,left:n,selection:a,alfas:o,enrolled:s,exams:r,labs:i,day:h,passed:l}=this.s;let c=`Score: this is term ${e} you have been at the FIB.

`;if(a)c+=`You are doing the Selection Phase.
You have ${n} credits left to finish it.

`;else{c+=`You are in the middle of the degree, and have ${n} credits left to finish.

`;const d=o.filter(m=>m<1).length,p=o.filter(m=>m<=.5).length;d>0?(c+=`Of your last six alfa parameters at most, you have:
 - ${d} notable.
`,p>0&&(c+=` - of these, ${p} dangerous.
`),c+=`
`,o.forEach((m,u)=>{m<1&&(c+=`The alfa of ${o.length-u} terms ago:	${Math.round(m*100)/100}.
`)}),c+=`
`):c+=`You have an impeccable record. (swot)

`}if(h<=oa){const d=[0,0,0,0,0];for(let m=0;m<s;m+=1){const u=r[m]+i[m];d[u<=0?0:u<=2*U?1:u<=5*U?2:u<=8*U?3:4]+=1}const p=["subjects going well","that will go well with a little effort","subjects you should get down to","subjects you find hard","subjects you had better pray for"];d.forEach((m,u)=>{m>0&&(c+=`You have ${m} ${p[u]}.
`)}),c+=`You are enrolled in ${s} subjects in all.`}else c+=`Of ${s}, ${l} are passed.`;this.s.said.push(c)}dismiss(){this.s.said.shift()}enrol(e){return this.s.asks!=="enrol"||!Number.isInteger(e)||e<1||e>this.enrolment.most?!1:(this.s.enrolled=e,this.s.asks=null,!0)}choose(e){this.s.asks==="degree"&&(this.s.left=ha[e],this.askEnrolment())}keepHabits(){const{doing:e}=this.s;e==="lab"?this.s.labHabit+=1:e==="studying"?this.s.studyHabit+=1:e==="browsing"?this.s.chatHabit+=1:e==="friends"?this.s.friends+=1:e==="bar"&&(this.s.barHabit+=1,this.s.friends+=.4),this.s.friends=Math.min(this.s.friends,jt)}studyOrWork(){if(this.s.doing==="lab"){if(!this.labsPending)return this.set("idle");const e=this.easiest(this.s.labs);100-this.s.exams[e]>this.random()*100&&(this.s.labs[e]-=1)}else if(this.s.doing==="studying"){if(!this.examsPending)return this.set("idle");this.s.exams[this.easiest(this.s.exams)]-=1}}easiest(e){const{exams:n,labs:a}=this.s;let o=this.taken(e).findIndex(r=>r>0),s=n[o]+a[o]+o;for(let r=o+1;r<this.s.enrolled;r+=1){const i=n[r]+a[r];s>i&&e[r]>0&&(o=r,s=i+r)}return o}holdTerminal(){if(this.s.day>ae||this.s.terminal<=0){this.s.terminal=0;return}this.s.doing==="idle"&&this.labsPending&&this.set("lab"),this.s.doing==="lab"?this.s.terminal=Math.round(this.s.terminal+this.random()):(this.s.doing!=="browsing"||this.random()<=je.labs[this.s.day])&&(this.s.terminal-=1),this.s.terminal=Math.max(this.s.terminal,0)}browseOn(){this.s.doing==="browsing"&&(this.s.boredom+=Math.round(.5*this.random()),this.s.terminal<=0&&this.set("idle"))}getBored(){const{doing:e}=this.s;if(e==="idle"?(this.s.boredom+=1,this.s.boredom%10===0&&this.set("idle")):e==="studying"?this.s.boredom+=.1:e==="lab"?this.s.boredom+=this.random()/2:e==="asleep"?this.s.boredom-=1:e==="bar"&&(this.s.boredom-=this.random()),this.s.boredom>It)return this.end("bad",Mr);this.s.boredom=Math.max(this.s.boredom,-It/2)}calmDown(){this.s.doing==="bar"&&(this.s.stress-=1),this.s.stress=Math.max(this.s.stress,0),this.s.stress>Et&&this.end("bad",Ar)}searchTerminal(){const{doing:e,day:n}=this.s;if(e==="looking"&&n<=ae&&this.s.terminal<=0){this.s.stress+=1;const a=(.5+je.exams[n])*(1-je.labs[n]),o=this.random();if(o<=a){const s=(o<=a/2?4:2)*(U+1);this.s.terminal=Math.round(s*this.random()),this.set("idle")}}else e==="looking"&&this.set("idle");n>ae&&(this.s.terminal=0)}followHabits(){const{doing:e,hour:n}=this.s,a=this.s.labHabit/this.s.chatHabit/2,o=this.s.chatHabit/this.s.labHabit/2,s=this.s.studyHabit/this.s.barHabit/2,r=this.labsPending,i=h=>this.random()<h;if(this.s.terminal>0)if(e==="lab")a<=.5?i(.5-a)&&this.set("browsing"):r||this.set(this.random()>(.5-o)*2?"browsing":"idle");else if(e==="browsing")if(r){const[h,l]=this.s.terminal<U?[2,1]:[1,2];(o<=.5?i((.5-o)*h):this.random()>(.5-a)*l)&&this.set("lab")}else o<.5&&this.random()*.4>o&&this.set("idle");else(e==="idle"||e==="studying")&&(this.s.friends>jt/2&&i(.5-s)&&this.set("bar"),o<=.5&&i(.5-o)&&this.set("browsing"),a<=.5&&i(.5-a)&&r&&this.set("lab"));else if(e==="studying"&&s<=.5){const h=n<re/4?U:n>3*re/4?U/2:1;this.random()*h<.5-s&&this.set("bar")}}stayAtBar(){this.s.doing==="bar"&&this.s.friends/jt<this.random()/2&&this.set("idle")}nextHour(){if(this.getSleepy(),this.s.doing==="lab"&&(this.s.boredom+=Math.round(4*this.random())),this.classInTheRoom(),this.s.hour<re-1){this.s.hour+=1;return}this.s.hour=0,this.nextDay()}getSleepy(){const e=this.s.hour<re*3/4;this.s.doing!=="asleep"?(e?this.s.sleep+=1:this.s.doing==="idle"&&this.s.sleep>5?this.set("asleep"):this.s.sleep+=2+(this.s.terminal>0?1:0),this.s.sleep>(this.s.terminal>0?sa*1.25:sa)&&this.set("asleep")):e&&this.s.sleep<ra/4?this.set("idle"):(this.s.sleep-=2,this.s.sleep<ra&&this.set("idle"))}classInTheRoom(){const{hour:e}=this.s;e>=re/3&&e<=2*re/3&&this.random()<xr&&(this.s.terminal=0)}nextDay(){const{day:e}=this.s;if(this.fadeHabits(),e<ae?this.bringWork():e===oa&&this.mark(),e<kr-1){this.s.day+=1;return}this.s.day=0,this.nextTerm()}fadeHabits(){const e=n=>Math.max(1,Math.round(n*.9));this.s.labHabit=e(this.s.labHabit),this.s.studyHabit=e(this.s.studyHabit),this.s.barHabit=e(this.s.barHabit),this.s.chatHabit=e(this.s.chatHabit),this.s.friends=e(this.s.friends)}bringWork(){const e=this.s.day+5;if(this.s.day===0)for(let n=e;n>=0;n-=1)this.bringWorkFor(n);else e<ae&&this.bringWorkFor(e)}bringWorkFor(e){for(let n=0;n<this.s.enrolled;n+=1){const a=U*((n+1)/2)+1;this.random()<=je.labs[e]&&(this.s.labs[n]+=Math.round(a*this.random())),this.random()<=je.exams[e]&&(this.s.exams[n]+=Math.round(a*this.random()))}}mark(){for(let e=0;e<this.s.enrolled;e+=1)this.s.exams[e]+this.s.labs[e]<U&&(this.s.passed+=1);this.s.alfas=[...this.s.alfas.slice(1),this.s.alfas[5]],this.s.exams.fill(0),this.s.labs.fill(0)}nextTerm(){const{enrolled:e,passed:n,selection:a,term:o}=this.s;if(this.s.alfas[5]=a?1:e?n/e:0,this.s.alfas.filter(s=>s<.5).length>3)return this.end("bad","You have 4 Alfa parameters below 0.5, bye, bye.");if(this.s.left-=n,this.s.passed=0,this.s.term+=1,this.s.left<=0){if(!a)return this.end("good",`Very Good!
You did it!!!!!!!
Your Fibergochi has finished the degree!!!!!
`,`ERROR 315: in module KERNEL386.EXE,
page 0137:0A285F43.
An UNFORESEEN situation has occurred,
we are very sorry, but we thought that
nobody would ever get here, where no
other man has gone before!.`);this.s.selection=!1,this.s.said.push("You have SUCCESSFULLY finished the SELECTION PHASE!!!!!"),this.s.asks="degree";return}if(a&&o===2&&this.s.left>8)return this.end("bad","BACARRA!!!!");if(a&&o>3){if(this.s.left>2)return this.end("bad","You have not got through the Selection Phase.");this.s.said.push(`You have not passed everything, but it is not serious.
YOU HAVE GOT THROUGH THE SELECTION PHASE, but... They will not throw you out, but you have to go to
the Técnica (or rather, they make you).`),this.s.left=ha.tecnica,this.s.selection=!1}this.askEnrolment()}askEnrolment(){this.s.asks="enrol",this.s.suggested=Math.min(Math.round(this.random()*4)+3,this.s.left)}taken(e){return e.slice(0,this.s.enrolled)}set(e){this.s.doing=e,this.show(e)}show(e){if(e==="lab")this.sprite.play("pract");else if(e==="studying")this.sprite.play("est");else if(e==="asleep")this.sprite.play("zz");else if(e==="looking")this.sprite.play("bt");else if(e==="friends")this.sprite.play("amig");else if(e==="browsing")this.sprite.play("http");else if(e==="bar")this.sprite.play("bar0");else{const n=this.s.boredom+this.s.stress,a=It+Et;n<a/3?this.sprite.play("normal"):n<a/1.5?this.sprite.play("normal1"):this.sprite.play("normal2"),this.s.stress>Et*2/3&&this.sprite.play("normal2")}}end(e,...n){this.s.said.push(...n),e==="bad"&&this.s.said.push(Sr),this.s.ended=e,this.s.asks=null,this.sprite.stop()}}const Ir=["step","hour","day","term","boredom","stress","labHabit","studyHabit","chatHabit","barHabit","friends","sleep","terminal","enrolled","passed","left","suggested"],Er=["idle","asleep","studying","browsing","looking","lab","bar","friends"],Ct=(t,e)=>Array.isArray(t)&&t.length===e&&t.every(n=>Number.isFinite(n));function jr(t){let e;try{e=JSON.parse(t??"null")}catch{return null}return typeof e!="object"||e===null||Array.isArray(e)?null:Ir.every(a=>Number.isFinite(e[a]))&&Er.includes(e.doing)&&Ct(e.exams,10)&&Ct(e.labs,10)&&Ct(e.alfas,6)&&typeof e.selection=="boolean"&&[null,"enrol","degree"].includes(e.asks)&&[null,"good","bad"].includes(e.ended)&&Array.isArray(e.said)&&e.said.every(a=>typeof a=="string")?e:null}const Cr={x:"A cross: there is no Fibergochi.",normal:"The Fibergochi, standing about.",normal1:"The Fibergochi, standing about, getting bored.",normal2:"The Fibergochi, bored stiff.",est:"The Fibergochi at a desk, studying.",zz:"The Fibergochi, asleep.",bt:"A room full of terminals, all taken, and the Fibergochi looking for a free one.",http:"A terminal, and the Fibergochi browsing: http.",pract:"The Fibergochi at a terminal, doing a lab.",no:"The Fibergochi, shaking its head.",bar0:"The Fibergochi at the bar with its friends, drinks on the table.",amig:"The Fibergochi with a group of friends.",suplica:"The Fibergochi on the floor, begging."},Or=[[["study","estudio","Study/Sleep","to study or to sleep."]],[["http","http","http","to have a good time at a terminal (if you have one)."],["alfa","alfa","alfa","see the score."],["bar","bar","Bar","go to the bar, have a drink or play mus."]],"screen",[["friends","amigos","Friends","to make new friends."],["terminal","bt","Find terminal","look for a terminal to do labs, or not."],["beg","suplica","Beg","to try to get more passes."]]],Pr={slow:"slow",normal:"normal",fast:"fast"};function la(t,[e,n,a,o]){if(t<=0)return e;if(t<3)return`${n}, under an hour`;const s=Math.round(t/3);return`${t<15?a:o}, about ${s} ${s===1?"hour":"hours"}`}const te=(t,e,{title:n="",disabled:a=!1}={})=>`<button type="button" data-do="${t}"${n?` title="${S(n)}"`:""}${a?" disabled":""}>${e}</button>`;function Oo(t,{running:e,confirmingNew:n,pace:a,picked:o=null}){const s=!t.alive||t.waiting||n,r=u=>u&&t.lampsLit?"on":"off",i=[["exam",r(t.examsPending),la(t.studyLeft,["nothing to study","a little to study","something to study","a lot to study"])],["lab",r(t.labsPending),la(t.labLeft,["no lab to do","a little lab work","some lab work","a lot of lab work"])],["terminal",t.hasTerminal?"on":"off",t.hasTerminal?"a terminal":t.labsPending?"no terminal, and labs need one":"no terminal"]],h=i.map(([u,g,k])=>`<li><button type="button" class="lamp ${g}" data-do="lamp-${u}" data-lamp="${u}" title="${u}: ${k}">${u}</button></li>`).join(""),l=i.map(([u,g,k])=>`<li class="${g}${u===o?" picked":""}" data-lamp="${u}"><b>${u}</b> ${k}</li>`).join(""),c=t.picture,d=Cr[c.replace(/\d$/,"")]??"",p=`<div class="screen"><ul class="lamps" data-show="lamps">${h}</ul><img data-show="picture" src="/fibergochi/${c}.gif" alt="${d}" width="200" height="160"></div>`;return`<div class="fibergochi"><div class="egg"><p class="by"><span>by</span> Night</p>${Or.map(u=>u==="screen"?p:`<div class="keys">${u.map(([g,k,w,v])=>{const[y,$]=k==="alfa"?[15,11]:[22,21];return te(g,`<img src="/fibergochi/keys/${k}.gif" alt="${w}" width="${y*2}" height="${$*2}">`,{title:`${w}: ${v}`,disabled:s})}).join("")}</div>`).join("")}</div><div class="panel"><p class="time"><output data-show="clock">${t.clock}</output> ${te("pause",e?"pause":"go on")} ${te("speed",`speed: ${Pr[a]}`,{title:"Change the speed of time."})} ${te("new","new")}</p><ul class="legend" data-show="legend">${l}</ul>${Nr(t,n)}</div></div>`}function Nr(t,e){const{said:n,asks:a}=t.state,o=(s,...r)=>`<div class="dialog" role="alertdialog"><p>${S(s).replaceAll(`
`,"<br>")}</p><p>${r.join(" ")}</p></div>`;if(e)return o("Are you sure you want a new Fibergochi?",te("new-yes","OK"),te("new-no","Cancel"));if(n.length>0)return o(n[0],te("ok","OK"));if(a==="degree")return o("Do you want to do the Superior?",te("superior","OK"),te("tecnica","Cancel"));if(a==="enrol"){const{most:s,suggested:r}=t.enrolment;return`<form class="dialog" data-do="enrol"><label>How many credits do you want to enrol in? [1..${s}] <input type="number" name="credits" min="1" max="${s}" value="${r}"></label> <button type="submit">OK</button></form>`}return""}const ca="fibergochi:1999-03-02",Ot={slow:1e3,normal:400,fast:10},Lr={slow:"normal",normal:"fast",fast:"slow"},Fr=100,Rr=10;function Dr(t){let e=new nn(Math.random,m()??{}),n=!0,a=!1,o=null,s="slow",r=0;const i=$n(t),h=document.createElement("div"),l=f("div",{hidden:!0},...Co.everyImage.map(b=>f("img",{src:`/fibergochi/${b}.gif`,alt:"",width:50,height:40}))),c=()=>Oo(e,{running:n,confirmingNew:a,pace:s,picked:o});function d(){const b=document.activeElement instanceof HTMLElement&&h.contains(document.activeElement)?document.activeElement.dataset.do:void 0;h.innerHTML=c(),b&&h.querySelector(`[data-do="${b}"]`)?.focus()}function p(){const b=document.createElement("div");b.innerHTML=c();for(const T of h.querySelectorAll("[data-show]")){const C=b.querySelector(`[data-show="${T.dataset.show}"]`);C&&(T instanceof HTMLImageElement?T.getAttribute("src")!==C.getAttribute("src")&&(T.src=C.getAttribute("src")??"",T.alt=C.getAttribute("alt")??""):T.innerHTML!==C.innerHTML&&(T.innerHTML=C.innerHTML))}}function m(){try{return jr(localStorage.getItem(ca))}catch{return null}}function u(){try{localStorage.setItem(ca,JSON.stringify(e.state))}catch{}}const g=()=>n&&i.onScreen()&&e.alive&&!e.waiting;let k=setTimeout(w,Ot[s]);function w(){if(k=setTimeout(w,Ot[s]),!!g()){if(e.step(),r+=1,e.waiting||!e.alive){u(),d();return}r%Rr===0&&u(),p()}}const v=setInterval(()=>{g()&&(e.animate(),p())},Fr),y={study:()=>e.studyOrSleep(),http:()=>e.browse(),alfa:()=>e.alfa(),bar:()=>e.goToBar(),friends:()=>e.makeFriends(),terminal:()=>e.lookForTerminal(),beg:()=>e.beg()},$={pause:()=>n=!n,speed:()=>{s=Lr[s],clearTimeout(k),k=setTimeout(w,Ot[s])},new:()=>a=!0,"new-no":()=>a=!1,"new-yes":()=>{e=new nn(Math.random),a=!1,n=!0},ok:()=>e.dismiss(),superior:()=>e.choose("superior"),tecnica:()=>e.choose("tecnica")};function I(b){const T=b.target.closest("button[data-do]")?.dataset.do??"";T.startsWith("lamp-")?(o=T.slice(5),p()):y[T]?(y[T](),e.waiting?d():p()):$[T]&&($[T](),u(),d())}function M(b){b.preventDefault();const T=b.target.querySelector("input[name=credits]");T&&e.enrol(Number(T.value))&&(u(),d())}return t.addEventListener("click",I),t.addEventListener("submit",M),window.addEventListener("pagehide",u),t.replaceChildren(h,l),d(),()=>{clearTimeout(k),clearInterval(v),i.stop(),u(),t.removeEventListener("click",I),t.removeEventListener("submit",M),window.removeEventListener("pagehide",u)}}const Br=()=>Oo(new nn(Math.random),{running:!0,confirmingNew:!1,pace:"slow"}),Hr={name:"fibergochi",apps:{fibergochi:Dr},stills:{fibergochi:Br}},ee=t=>[...t.replace(/\s/g,"")].map(e=>e==="#"?1:0),Te={A:ee(".###. #...# ##### #...# #...#"),B:ee("####. #...# ####. #...# ####."),C:ee(".#### #.... #.... #.... .####"),D:ee("####. #...# #...# #...# ####."),E:ee("##### #.... ####. #.... #####"),H:ee("#...# #...# ##### #...# #...#"),O:ee(".###. #...# #...# #...# .###."),T:ee("##### ..#.. ..#.. ..#.. ..#.."),X:ee("#...# .#.#. ..#.. .#.#. #...#")};function yt(t){let e=t>>>0;return()=>{e=e+1831565813>>>0;let n=Math.imul(e^e>>>15,1|e);return n=n+Math.imul(n^n>>>7,61|n)^n,((n^n>>>14)>>>0)/4294967296}}const Wr=t=>1/(1+Math.exp(-t));class qr{weights;constructor(e,n){const a=yt(n);this.weights=e.slice(1).map((o,s)=>Array.from({length:o},()=>Array.from({length:e[s]+1},()=>a()-.5)))}forward(e){const n=[[...e]];for(const a of this.weights){const o=[...n[n.length-1],1];n.push(a.map(s=>Wr(s.reduce((r,i,h)=>r+i*o[h],0))))}return n}answer(e){return this.forward(e).pop()}learn(e,n,a){const o=this.forward(e),s=o[o.length-1];let r=s.map((h,l)=>(h-n[l])*h*(1-h));for(let h=this.weights.length-1;h>=0;h-=1){const l=[...o[h],1],c=this.weights[h],d=o[h].map((p,m)=>{let u=0;for(let g=0;g<c.length;g+=1)u+=c[g][m]*r[g];return u*p*(1-p)});for(let p=0;p<c.length;p+=1)for(let m=0;m<l.length;m+=1)c[p][m]-=a*r[p]*l[m];r=d}let i=0;for(let h=0;h<s.length;h+=1)i+=(s[h]-n[h])**2;return i/2}}const _r=10,da=.5;class Po{constructor(e,n){this.shapes=e,this.network=new qr([25,_r,e.length],n),this.noise=yt(n+1)}shapes;network;noise;rounds=0;error=0;train(e){for(let n=0;n<e;n+=1){let a=0;this.shapes.forEach(({pixels:o},s)=>{const r=this.shapes.map((h,l)=>l===s?1:0),i=Math.floor(this.noise()*o.length);a+=this.network.learn(o,r,da),a+=this.network.learn(o.map((h,l)=>l===i?1-h:h),r,da)}),this.error=a,this.rounds+=1}}read(e){const n=this.network.answer(e);return this.shapes.map(({name:a},o)=>({letter:a,score:n[o]}))}}const zr=[{name:"A",pixels:Te.A},{name:"B",pixels:Te.B}];function an(t=zr){const e=new Po(t,1);return e.train(200),e}const Yr=3;function No(t,e,n){const a=t.trim();return a===""?"Give it a name first.":[...a].length>Yr?"A name of three characters at most.":n.includes(a)?`“${a}” is already a letter it knows.`:e.some(Boolean)?null:"There is no ink on the grid to remember."}const Gr=t=>Array.isArray(t)&&t.length===25&&t.every(e=>e===0||e===1);function Ur(t,e=[]){let n;try{n=JSON.parse(t??"[]")}catch{return[]}if(!Array.isArray(n))return[];const a=[];for(const o of n){const{name:s,pixels:r}=o??{};typeof s!="string"||!Gr(r)||No(s,r,[...e,...a.map(i=>i.name)])||a.push({name:s.trim(),pixels:r})}return a}function Lo(t,e){const n=e.map((i,h)=>`<button type="button" class="cell" data-at="${h}" aria-pressed="${i?"true":"false"}" aria-label="cell ${h+1}"></button>`).join(""),a=t.read(e),o=a.reduce((i,h)=>h.score>i.score?h:i),s=a.map(({letter:i,score:h})=>`<tr${i===o.letter?' class="best"':""}><th scope="row">${S(i)}</th><td class="sure"><span class="bar" style="--p:${h.toFixed(3)}"></span>${Math.round(h*100)}%</td></tr>`).join(""),r=t.rounds===0?"It has not been taught anything yet: every answer is a guess.":`It reads <b>${S(o.letter)}</b>, after ${t.rounds} rounds of lessons.`;return`<div class="letters"><div class="grid" role="group" aria-label="the drawing, five cells by five">${n}</div><div class="reading"><p>${r}</p><table class="answers"><tbody>${s}</tbody></table></div></div>`}const ua="first-network:own",ma=Object.entries(Te).map(([t,e])=>({name:t,pixels:e}));function Jr(t){let e=g();const n=new Set(["A","B",...e.map(({name:b})=>b)]),a=()=>[...ma,...e];let o=an(m()),s=[...Te.A];const r=f("div",{onclick:b=>{const T=b.target.closest("[data-at]")?.dataset.at;T!==void 0&&(s[Number(T)]=1-s[Number(T)],d())}}),i=f("div",{class:"row"}),h=f("div",{class:"row taught"}),l=f("input",{type:"text",maxlength:3,size:4,"aria-label":"a name for the drawing"}),c=f("p",{class:"error",hidden:!0});function d(){r.innerHTML=Lo(o,s)}function p(b){s=b,d()}function m(){return a().filter(b=>n.has(b.name))}function u(){o=an(m()),d()}function g(){try{return Ur(localStorage.getItem(ua),Object.keys(Te))}catch{return[]}}function k(){try{localStorage.setItem(ua,JSON.stringify(e))}catch{}}function w(){const b=No(l.value,s,a().map(C=>C.name));if(c.textContent=b??"",c.hidden=b===null,b)return;const T={name:l.value.trim(),pixels:[...s]};e=[...e,T],n.add(T.name),l.value="",k(),$(),u()}function v(b){e=e.filter(T=>T.name!==b),n.delete(b);for(const T of ma)n.size<2&&n.add(T.name);k(),$(),u()}const y=(b,T)=>f("button",{type:"button",onclick:T},b);function $(){i.replaceChildren("Draw ",...a().map(b=>y(b.name,()=>p([...b.pixels]))),y("one cell wrong",()=>{const b=Math.floor(Math.random()*s.length);p(s.map((T,C)=>C===b?1-T:T))}),y("clear",()=>p(s.map(()=>0)))),h.replaceChildren("Taught: ",...a().map(b=>{const T=f("input",{type:"checkbox",value:b.name,checked:n.has(b.name),onchange:()=>{T.checked?n.add(b.name):n.size>2?n.delete(b.name):T.checked=!0,u()}}),C=e.includes(b)&&f("button",{type:"button",class:"forget","aria-label":`forget ${b.name}`,onclick:()=>v(b.name)},"×");return f("label",{},T,` ${b.name}`,C)}))}const I=f("div",{class:"row"},y("teach 100 more rounds",()=>{o.train(100),d()}),y("forget everything",()=>{o=new Po(o.shapes,1),d()})),M=f("div",{class:"row own"},"Your own: draw it, name it ",l,y("remember this drawing",()=>w()),c);$(),t.replaceChildren(i,r,h,I,M),d()}const Kr=()=>Lo(an(),Te.A),Vr={name:"first-network",apps:{letters:Jr},stills:{letters:Kr}},Xr=1.5,Zr=.02,Qr=.25;class ei{constructor(e,n,a,o){this.credit=a,this.random=o,this.remaining=[...e],this.buyers=n.map(s=>({bidder:s,credit:a,won:[],error:null}))}credit;random;buyers;remaining;sold=[];turns=[];get over(){return this.remaining.length===0}get next(){return this.remaining[0]}get market(){return{lots:this.remaining,credits:Object.fromEntries(this.buyers.map(e=>[e.bidder.name,e.credit])),sales:this.sold}}demands(){const e=this.next;return Object.fromEntries(this.buyers.map(n=>[n.bidder.name,e?this.demandOf(n,e):null]))}sell(){const e=this.remaining.shift();if(!e)throw new Error("the floor is empty");const n=this.buyers.map(s=>this.demandOf(s,e)),a=Object.fromEntries(this.buyers.map((s,r)=>[s.bidder.name,n[r]===null?null:e.value/(1+n[r])])),o=this.buyers.filter(s=>(a[s.bidder.name]??0)>s.credit).map(s=>s.bidder.name);for(let s=e.value*Xr;s>=e.value*Qr;s-=e.value*Zr){const r=(e.value-s)/s,i=this.buyers.filter((l,c)=>l.credit>=s&&r>=(n[c]??1/0));if(i.length===0)continue;const h=i[Math.min(i.length-1,Math.floor(this.random()*i.length))];return h.credit-=s,h.won.push(e),this.record({lot:e,buyer:h.bidder.name,price:s},a,o)}return this.record({lot:e,buyer:null,price:null},a,o)}standings(){return this.buyers.map(({bidder:e,credit:n,won:a,error:o})=>{const s=a.reduce((i,h)=>i+h.value,0),r=this.credit-n;return{name:e.name,credit0:this.credit,credit:n,spent:r,lots:a.length,value:s,profit:s-r,error:o}})}record(e,n,a){return this.sold.push(e),this.turns.push({sale:e,bids:n,short:a}),e}demandOf(e,n){try{const a=e.bidder.demands(n,this.market,e.bidder.name);if(typeof a!="number"||Number.isNaN(a))throw new Error(`demanded ${String(a)}, not a margin`);return e.error=null,a}catch(a){return e.error=a instanceof Error?a.message:String(a),null}}}const pa=[["sardines",30],["anchovies",40],["squid",90],["hake",120],["sole",180],["prawns",250],["monkfish",300],["tuna",400]];function ti(t,e){return Array.from({length:t},(n,a)=>{const[o,s]=pa[Math.floor(e()*pa.length)];return{id:a+1,kind:o,value:Math.round(s*(.7+.6*e()))}})}const ni=60;function Fo(t,e,n){const a=yt(t),o=ti(ni,a),s=o.reduce((r,i)=>r+i.value,0);return new ei(o,e,n*s/Math.max(1,e.length),a)}function fa(t,e="You"){const n=new Function("lot","market","me",t);return{name:e,demands:n}}const ga=`// Return the margin you demand: (value - price) / price.
// You are told the lots still to sell, everyone's credit, and every sale so far.
// This is Vicente. Change the 0.9 first.
const fish = market.lots.reduce((sum, lot) => sum + lot.value, 0);
const money = 0.9 * Object.values(market.credits).reduce((sum, c) => sum + c, 0);
if (money <= 0) return 0.001;
return Math.max(0.001, (fish - money) / money);
`,ai=12,Q=t=>Math.round(t).toString(),wa=t=>t===null?"—":t===1/0?"∞":`${Math.round(t*100)}%`;function Ro(t){const e=t.next,n=t.demands(),a=[...t.standings()].sort((c,d)=>d.profit-c.profit),o=Math.max(1,...a.map(c=>Math.abs(c.profit))),s=e?`<p class="lot">Next on the floor: <b>a box of ${S(e.kind)}</b>, which resells for ${Q(e.value)}. The price starts at ${Q(e.value*1.5)} and falls.</p>`:'<p class="lot">The floor is empty.</p>',i=`<table class="board"><thead><tr><th>buyer</th><th>asks</th><th>holds</th><th>spent</th><th>worth</th><th>credit</th><th>profit</th></tr></thead><tbody>${a.map(({name:c,lots:d,spent:p,value:m,profit:u,credit:g,error:k})=>{const w=k?`<td class="asks error" colspan="5">${S(k)}</td>`:`<td class="asks">${wa(n[c]??null)}</td>`;return`<tr${u<0?' class="loss"':""}><th scope="row">${S(c)}</th>${w}`+(k?"":`<td>${d} lot${d===1?"":"s"}</td><td>${Q(p)}</td><td>${Q(m)}</td><td>${Q(g)}</td>`)+`<td class="profit"><span class="bar" style="--p:${(Math.abs(u)/o).toFixed(3)}"></span>${Q(u)}</td></tr>`}).join("")}</tbody></table>`,h=t.turns,l=h.length?`<ol class="sales" reversed start="${h.length}">${[...h].reverse().slice(0,ai).map(({sale:{lot:c,buyer:d,price:p},bids:m,short:u})=>{const g=p===null||d===null?"<i>withdrawn</i>":`sold at <b>${Q(p)}</b>, a margin of ${wa((c.value-p)/p)}`,k=Object.entries(m).map(([w,v])=>{if(v===null)return`${S(w)} —`;const y=w===d?`<b>${S(w)}</b>`:S(w);return u.includes(w)?`<s title="more than it had">${y} at ${Q(v)}</s>`:`${y} at ${Q(v)}`}).join(", ");return`<li><span class="went">${S(c.kind)}, ${Q(c.value)}: ${g}.</span> <span class="ready">Ready to shout: ${k}.</span></li>`}).join("")}</ol>`:"";return`<div class="fish-market">${s}${i}${l}</div>`}function ya(t,e){return{name:t,demands:()=>e}}const ba=.001;function Tn(t,e){const n=t.lots.reduce((o,s)=>o+s.value,0),a=e*Object.values(t.credits).reduce((o,s)=>o+s,0);return a<=0?ba:Math.max(ba,(n-a)/a)}const oi=.9,si=3,Ve=10;function ri(t="Planner"){return{name:t,demands(e,n,a){const o=Tn(n,oi),s=o*(si-1)/Ve,r=m=>o+m*s,i=m=>Math.max(0,Math.min(Ve-1,Math.floor((m-o)/s))),h=new Array(Ve).fill(0);for(const m of n.sales){if(m.price===null)continue;const u=i((m.lot.value-m.price)/m.price);h[u]=h[u]+m.lot.value}const l=h.reduce((m,u)=>m+u,0);if(l===0)return o;const c=n.lots.reduce((m,u)=>m+u.value,0),d=n.credits[a]??0;let p=0;for(let m=Ve-1;m>=0;m-=1)if(p+=c*h[m]/l/(1+r(m)),p>=d)return r(m);return o}}}function ii(t=.9,e="Vicente"){return{name:e,demands:(n,a)=>Tn(a,t)}}const hi=.98,li=1.05,ci=.95,di=t=>(t.lot.value-t.price)/t.price;function va(t,e){const n=e.filter(o=>o.buyer===t),a=n.reduce((o,s)=>o+s.price,0);return a>0?(n.reduce((o,s)=>o+s.lot.value,0)-a)/a:0}function ui(t="Wanda"){return{name:t,demands(e,n,a){const o=Tn(n,hi),s=va(a,n.sales);let r=1;for(const i of n.sales)i.buyer!==null&&(i.buyer===a?r*=li:va(i.buyer,n.sales)>=s&&di(i)>=o&&(r*=ci));return o*r}}}function Do(t=.9){return[ya("Patient",1),ya("Hasty",.05),ii(t),ui(),ri()]}const mi=250,pi=1,ka="fish-market:own",Xe="fish-market:seated";function fi(t){let e=pi,n=null,a,o=null;const s=f("div"),r=f("p",{class:"error",hidden:!0}),i=f("output",{},"90%"),h=f("input",{type:"range",min:.5,max:1,step:.02,value:.9,oninput:()=>u()}),l=f("output",{},"50%"),c=f("input",{type:"range",min:.3,max:1.2,step:.05,value:.5,oninput:()=>u()}),d=f("textarea",{class:"agent",spellcheck:!1,rows:9,oninput:()=>v()}),p=f("button",{type:"button",onclick:()=>o?w():k()},"run");function m(){s.innerHTML=Ro(a)}function u(){w(),i.textContent=`${Math.round(Number(h.value)*100)}%`,l.textContent=`${Math.round(Number(c.value)*100)}%`,a=Fo(e,[...Do(Number(h.value)),...n?[n]:[]],Number(c.value)),m()}function g(){return a.over?!1:(a.sell(),m(),!0)}function k(){p.textContent="stop",o=setInterval(()=>{g()||w()},mi)}function w(){o&&clearInterval(o),o=null,p.textContent="run"}function v(){try{localStorage.setItem(ka,d.value)}catch{}}function y(){try{n=fa(d.value),r.hidden=!0,localStorage.setItem(Xe,"yes")}catch(C){n=null,r.textContent=C instanceof Error?C.message:String(C),r.hidden=!1,localStorage.removeItem(Xe)}u()}function $(){n=null,localStorage.removeItem(Xe),u()}const I=f("div",{class:"dials"},f("label",{},"Vicente believes the others will spend: ",i,h),f("label",{},"Money in the room, as a share of the fish: ",l,c)),M=f("div",{class:"row"},f("button",{type:"button",onclick:()=>{g()}},"next lot"),p,f("button",{type:"button",onclick:()=>{for(w();g(););}},"whole morning"),f("button",{type:"button",onclick:()=>{e=Math.floor(Math.random()*1e9),u()}},"new morning")),b=f("div",{class:"row"},f("button",{type:"button",onclick:()=>y()},"seat it"),f("button",{type:"button",onclick:()=>$()},"stand it down")),T=f("details",{class:"own"},f("summary",{},"Seat your own agent"),d,b,r);try{d.value=localStorage.getItem(ka)??ga,localStorage.getItem(Xe)&&(n=fa(d.value))}catch{d.value=ga}return t.replaceChildren(I,M,s,T),u(),w}const gi=()=>Ro(Fo(1,Do(),.5)),wi={name:"fish-market",apps:{"fish-market":fi},stills:{"fish-market":gi}};function yi(t,e){const n=[];for(let a=t.length-1;a>=0;a-=1)n.push(t.slice(0,a));for(let a=1;a<=e.length;a+=1)n.push(e.slice(0,a));return n}const bi=3800,vi=6500,ki=26,xi=46,$i=420;function Ti(t){return[...t.childNodes].map(e=>e.nodeName==="BR"?`
`:e.textContent??"").join("")}function Si(t){const e=document.querySelector("main h1");if(!e||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return()=>{};const n={text:Ti(e)};e.setAttribute("aria-label",n.text),e.classList.add("typing");const a=document.createElement("span");a.className="caret idle",a.setAttribute("aria-hidden","true");const o=(c,d)=>{const p=c.split(`
`).flatMap((m,u)=>u===0?[m]:[document.createElement("br"),m]);if(d){const m=document.createElement("a");m.href=d,m.append(...p,a),e.replaceChildren(m)}else e.replaceChildren(...p,a)};o(n.text);let s=n,r=[],i=performance.now()+bi,h=0;const l=c=>{if(h=requestAnimationFrame(l),c<i)return;if(r.length===0){const p=t(s,n);r=yi(s.text,p.text),s=p,a.classList.remove("idle")}const d=r.shift()??s.text;o(d,r.length===0?s.href:void 0),r.length===0?(a.classList.add("idle"),i=c+vi):d===""?i=c+$i:i=c+(d.length<(r[0]?.length??0)?xi:ki)};return h=requestAnimationFrame(l),()=>{cancelAnimationFrame(h),o(n.text),a.remove(),e.classList.remove("typing"),e.removeAttribute("aria-label")}}function Mi(t,e){const n=[...t];for(let a=n.length-1;a>0;a-=1){const o=Math.min(a,Math.floor(e()*(a+1)));[n[a],n[o]]=[n[o],n[a]]}return n}function Ai(t,e){let n=[];return a=>(n.length===0&&(n=Mi(t,e),n.length>1&&n[0]===a&&n.push(n.shift())),n.shift()??a)}const Ii=[{text:`More than
half a million views
on Medium.`,href:"/essays/"},{text:`One essay
every Saturday
since 2022.`,href:"/essays/"},{text:`I made
the AngularJS compiler
faster.`,href:"/open-source/angularjs/"},{text:`Two public APIs
of AngularJS
are mine.`,href:"/open-source/angularjs/"},{text:`I wrote a book
on technical debt
and its emotional cost.`,href:"/book/"},{text:`Never rewrite,
never stop delivery:
the book's one rule.`,href:"/book/"},{text:`The world above
was grown
as this page opened.`,href:"/projects/worlds/"}];let Pt=null;const Ei={name:"headline",arrive:t=>{if(Pt?.(),Pt=null,t.route!=="/")return;let e=null;Pt=Si((n,a)=>(e??=Ai([a,...Ii],Math.random),e(n)))}};function xa(t,e="You"){const n=new Function("fish","weeks","bots","me","rounds",t);return{name:e,orders:n}}const $a=`// Return your orders for the round: one number a week, 0 to rest.
// You know the fish at the start, the weeks, who is on the lagoon (bots),
// your name (me), and every round before (rounds), but not what the others
// will do this time.
// This one rests, lets the lagoon grow, and takes one share the last week.
let grown = fish;
for (let week = 1; week < weeks; week++) grown += Math.floor(grown / 2);
const orders = new Array(weeks).fill(0);
orders[weeks - 1] = Math.floor(grown / bots.length);
return orders;
`;function Bo(t){const e=t.rounds[t.rounds.length-1],n=t.scores(),a=Math.max(1,...Object.values(n)),o=[...t.names].sort((p,m)=>n[m]-n[p]).map(p=>{const m=t.errors[p];return`<tr><th scope="row">${S(p)}</th>`+(m?`<td class="error" colspan="2">${S(m)}</td>`:`<td>${e?.totals[p]??0}</td><td class="profit"><span class="bar" style="--p:${(n[p]/a).toFixed(3)}"></span>${n[p]}</td>`)+"</tr>"}).join(""),s=t.rounds.length,r=`<table class="board"><caption>${s===0?"The season has not started":`After ${s} round${s===1?"":"s"}`}</caption><thead><tr><th>bot</th><th>last round</th><th>season</th></tr></thead><tbody>${o}</tbody></table>`;if(!e)return`<div class="lagoon"><p class="lot">The lagoon has <b>${t.fish} fish</b>, and ${t.weeks} weeks ahead. Nobody has been out yet.</p>${r}</div>`;const i=e.weeks.map((p,m)=>`<th>${m+1}</th>`).join(""),h=Math.max(1,...e.weeks.map(p=>p.fish)),l=e.weeks.map(p=>`<td><span class="fish" style="--p:${(p.fish/h).toFixed(3)}"></span>${p.fish}</td>`).join(""),c=t.names.map(p=>{const m=e.weeks.map((u,g)=>{const k=e.orders[p]?.[g]??0,w=u.caught[p]??0;return`<td${k>w?' class="short"':""} title="asked for ${k}">${w}</td>`}).join("");return`<tr><th scope="row">${S(p)}</th>${m}<td class="total">${e.totals[p]}</td></tr>`}).join("");return`<div class="lagoon">${`<table class="weeks"><caption>Round ${s}, week by week: what each bot caught, and what was left in the lagoon</caption><thead><tr><th>week</th>${i}<th>total</th></tr></thead><tbody>${c}<tr class="water"><th scope="row">in the lagoon</th>${l}<td></td></tr></tbody></table>`}${r}</div>`}function Ho(t,e,n){const a=[];let o=t;for(let s=0;s<e;s+=1){const r=Math.max(0,Math.min(o,Math.floor(n(o,s))));a.push(r),o-=r,o+=Math.floor(o/2)}return a}const Ze={rest:{name:"Rest",orders:(t,e)=>new Array(e).fill(0)},one:{name:"One",orders:(t,e)=>new Array(e).fill(1)},power:{name:"Power",orders:(t,e)=>Array.from({length:e},(n,a)=>a*a)},percent:t=>({name:`${Math.round(t*100)}%`,orders:(e,n)=>Ho(e,n,a=>a*t)})},Ta=(t,e)=>Math.ceil(t/e);function Sa(t="Tit for tat"){const e=new Set;return{name:t,orders(n,a,o,s,r){for(const h of r)for(const l of Object.keys(h.orders))l!==s&&(h.orders[l]?.[0]??0)>=Ta(h.start,o.length)&&e.add(l);if(o.some(h=>h!==s&&e.has(h)))return Ho(n,a,h=>Ta(h,o.length));let i=n;for(let h=1;h<a;h+=1)i+=Math.floor(i/2);return[...new Array(a-1).fill(0),Math.floor(i/o.length)]}}}function Wo(){return[{fisher:Ze.one,seated:!0},{fisher:Ze.power,seated:!0},{fisher:Ze.percent(.1),seated:!0},{fisher:Ze.percent(.4),seated:!1},{fisher:Sa("Tit for tat"),seated:!0},{fisher:Sa("Tat for tit"),seated:!0}]}function ji(t,e,n){const a=Object.keys(n),o=[],s=Object.fromEntries(a.map(i=>[i,0]));let r=t;for(let i=0;i<e;i+=1){const h=Object.fromEntries(a.map(c=>[c,0])),l=a.map(c=>({name:c,order:Math.max(0,Math.floor(n[c]?.[i]??0))})).filter(({order:c})=>c>0);for(const c of[...new Set(l.map(({order:d})=>d))].sort((d,p)=>d-p)){const d=l.filter(m=>m.order===c),p=Math.min(Math.floor(r/d.length),c);for(const{name:m}of d)h[m]=p,s[m]=s[m]+p;r-=p*d.length}r+=Math.floor(r/2),o.push({fish:r,caught:h})}return{start:t,orders:n,weeks:o,totals:s}}class qo{constructor(e,n,a){this.fish=e,this.weeks=n,this.fishers=a}fish;weeks;fishers;rounds=[];errors={};get names(){return this.fishers.map(e=>e.name)}play(){const e=Object.fromEntries(this.fishers.map(a=>[a.name,this.ordersOf(a)])),n=ji(this.fish,this.weeks,e);return this.rounds.push(n),n}scores(){return Object.fromEntries(this.names.map(e=>[e,this.rounds.reduce((n,a)=>n+(a.totals[e]??0),0)]))}ordersOf(e){try{const n=e.orders(this.fish,this.weeks,this.names,e.name,this.rounds);if(!Array.isArray(n)||n.some(a=>typeof a!="number"||Number.isNaN(a)))throw new Error("orders must be an array of numbers, one a week");return delete this.errors[e.name],Array.from({length:this.weeks},(a,o)=>n[o]??0)}catch(n){return this.errors[e.name]=n instanceof Error?n.message:String(n),new Array(this.weeks).fill(0)}}}const Ma="lagoon:own",Qe="lagoon:seated";function Ci(t){let e=null,n;const a=f("div"),o=f("p",{class:"error",hidden:!0}),s=f("output",{},"100"),r=f("input",{type:"range",min:5,max:200,step:1,value:100,oninput:()=>p()}),i=f("output",{},"10"),h=f("input",{type:"range",min:4,max:14,step:1,value:10,oninput:()=>p()}),l=f("textarea",{class:"agent",spellcheck:!1,rows:11,oninput:()=>u()}),c=Wo().map(({fisher:M,seated:b})=>({fisher:M,box:f("input",{type:"checkbox",checked:b,onchange:()=>p()})}));function d(){a.innerHTML=Bo(n)}function p(){s.textContent=r.value,i.textContent=h.value;const M=c.filter(({box:b})=>b.checked).map(({fisher:b})=>b);n=new qo(Number(r.value),Number(h.value),[...M,...e?[e]:[]]),d()}function m(M){for(let b=0;b<M;b+=1)n.play();d()}function u(){try{localStorage.setItem(Ma,l.value)}catch{}}function g(){try{e=xa(l.value),o.hidden=!0,localStorage.setItem(Qe,"yes")}catch(M){e=null,o.textContent=M instanceof Error?M.message:String(M),o.hidden=!1,localStorage.removeItem(Qe)}p()}function k(){e=null,localStorage.removeItem(Qe),p()}const w=f("div",{class:"dials"},f("label",{},"Fish in the lagoon at the start: ",s,r),f("label",{},"Weeks in a round: ",i,h)),v=f("div",{class:"row bench"},"On the lagoon: ",...c.map(({fisher:M,box:b})=>f("label",{},b,` ${M.name}`))),y=f("div",{class:"row"},f("button",{type:"button",onclick:()=>m(1)},"play a round"),f("button",{type:"button",onclick:()=>m(5)},"play five"),f("button",{type:"button",onclick:()=>p()},"new season")),$=f("div",{class:"row"},f("button",{type:"button",onclick:()=>g()},"seat it"),f("button",{type:"button",onclick:()=>k()},"stand it down")),I=f("details",{class:"own"},f("summary",{},"Seat your own bot"),l,$,o);try{l.value=localStorage.getItem(Ma)??$a,localStorage.getItem(Qe)&&(e=xa(l.value))}catch{l.value=$a}t.replaceChildren(w,v,y,a,I),p()}const Oi=()=>Bo(new qo(100,10,Wo().filter(({seated:t})=>t).map(({fisher:t})=>t))),Pi={name:"lagoon",apps:{lagoon:Ci},stills:{lagoon:Oi}},V={N:1,S:2,E:4,W:8};function _o(t){const{width:e,height:n,cells:a,links:o}=t,s=e*n-1,r=new Map([[0,-1]]),i=[0];for(let l=0;l<i.length;l+=1){const c=i[l];if(c===s)break;const d=c%e,p=Math.floor(c/e),m=a[c],u=[];m&V.E&&d+1<e&&u.push(c+1),m&V.W&&d>0&&u.push(c-1),m&V.N&&p+1<n&&u.push(c+e),m&V.S&&p>0&&u.push(c-e);const g=o.get(c);g!==void 0&&o.get(g)===c&&u.push(g);for(const k of u)r.has(k)||(r.set(k,c),i.push(k))}if(!r.has(s))return null;const h=[];for(let l=s;l!==-1;l=r.get(l))h.unshift({x:l%e,y:Math.floor(l/e)});return h}function zo(t){const e=_o(t);if(!e)return"There is no way out: the only one ran through a sphere that leads nowhere.";const n=e.slice(1).filter((o,s)=>Math.abs(o.x-e[s].x)+Math.abs(o.y-e[s].y)>1).length,a=n===0?"touches no sphere":`jumps through ${n===1?"one sphere":`${n} spheres`}`;return`The way out is ${e.length} rooms long, and ${a}.`}const Aa=0x5deece66dn,Ni=0xbn,Ia=(1n<<48n)-1n;class Li{seed;constructor(e){this.seed=(BigInt(e)^Aa)&Ia}nextInt(e){if((e&-e)===e)return Number(BigInt(e)*BigInt(this.next(31))>>31n);for(;;){const n=this.next(31),a=n%e;if((n-a+(e-1)|0)>=0)return a}}next(e){return this.seed=this.seed*Aa+Ni&Ia,Number(BigInt.asIntN(32,this.seed>>BigInt(48-e)))}}const Ea=16,Fi=[["N","E","W","S"],["W","S","E","N"],["S","E","W","N"]],Ri={N:[0,1,"S"],S:[0,-1,"N"],E:[1,0,"W"],W:[-1,0,"E"]};function Yo(t,e,n,{spheres:a=!0}={}){const o=new Li(n),s=new Array(t*e).fill(0),r=new Map,i=[],h=(d,p)=>d+p*t;function l(d,p){i.push({x:d,y:p}),a&&o.nextInt(10)<1&&c(d,p);for(const m of Fi[o.nextInt(3)]){const[u,g,k]=Ri[m],w=d+u,v=p+g;w<0||v<0||w>=t||v>=e||s[h(w,v)]!==0||(s[h(d,p)]|=V[m],s[h(w,v)]=V[k],l(w,v),i.push({x:d,y:p}))}}function c(d,p){const m=o.nextInt(t),u=o.nextInt(e);s[h(m,u)]===0&&(s[h(d,p)]|=Ea,s[h(m,u)]=Ea,r.set(h(d,p),h(m,u)),r.set(h(m,u),h(d,p)),l(m,u),i.push({x:d,y:p}))}return l(0,0),s[h(0,0)]|=V.S,s[h(t-1,e-1)]|=V.N,{width:t,height:e,cells:s,links:r,path:i}}const z=10,et=4;function Go(t,{trail:e,way:n}={}){const{width:a,height:o,cells:s,links:r}=t,i=w=>et+w*z,h=w=>et+(o-1-w)*z,l=({x:w,y:v})=>[i(w)+z/2,h(v)+z/2],c=[];for(let w=0;w<o;w+=1)for(let v=0;v<a;v+=1){const y=s[v+w*a];y&V.S||c.push(`M${i(v)} ${h(w)+z}h${z}`),y&V.W||c.push(`M${i(v)} ${h(w)}v${z}`),w===o-1&&!(y&V.N)&&c.push(`M${i(v)} ${h(w)}h${z}`),v===a-1&&!(y&V.E)&&c.push(`M${i(v)+z} ${h(w)}v${z}`)}const d=new Map;let p=0;const m=[...r].map(([w,v])=>{const y=r.get(v)===w;if(!y)p+=1;else if(!d.has(w)){const M=String.fromCharCode(97+d.size/2%26);d.set(w,M).set(v,M)}const[$,I]=l({x:w%a,y:Math.floor(w/a)});return`<circle class="sphere${y?"":" dead"}" cx="${$}" cy="${I}" r="${z*.3}"/><text class="letter" x="${$}" y="${I}">${y?d.get(w):"×"}</text>`}),u=w=>w.map((v,y)=>{const $=w[y-1];return`${$&&Math.abs(v.x-$.x)+Math.abs(v.y-$.y)===1?"L":"M"}${l(v).join(" ")}`}).join(""),g=[];if(n&&g.push(`<path class="way" d="${u(n)}"/>`),e!==void 0&&e>0){const w=t.path.slice(0,e),[v,y]=l(w[w.length-1]);g.push(`<path class="trail" d="${u(w)}"/>`,`<circle class="walker" cx="${v}" cy="${y}" r="${z*.22}"/>`)}return`<svg class="maze" role="img" aria-label="${`A ${a} by ${o} maze with ${r.size} sphere${r.size===1?"":"s"}`+(p?`, ${p} leading nowhere`:"")+"."}" viewBox="0 0 ${a*z+2*et} ${o*z+2*et}">`+g.join("")+`<path class="walls" d="${c.join("")}"/>`+m.join("")+"</svg>"}const ke={size:7,seed:543},Di=100;function Bi(t){let e,n=0,a=!1,o=null;const s=f("div",{class:"figure"}),r=f("p",{class:"status"}),i=f("output",{},String(ke.size)),h=f("input",{type:"range",min:5,max:30,step:1,value:ke.size,oninput:()=>u()}),l=f("input",{type:"number",value:ke.seed,onchange:()=>u()}),c=f("input",{type:"checkbox",checked:!0,onchange:()=>u()}),d=f("button",{type:"button",onclick:()=>o?k():g()},"walk the camera"),p=f("button",{type:"button",onclick:()=>w()},"show the way out");function m(){s.innerHTML=Go(e,{trail:n,way:a?_o(e):null})}function u(){k(),n=0,i.textContent=h.value,e=Yo(Number(h.value),Number(h.value),Number(l.value),{spheres:c.checked}),r.textContent=zo(e),m()}function g(){n>=e.path.length&&(n=0),d.textContent="stop",o=setInterval(()=>{n+=1,m(),n>=e.path.length&&k()},Di)}function k(){o&&clearInterval(o),o=null,d.textContent="walk the camera"}function w(){a=!a,p.textContent=a?"hide the way out":"show the way out",m()}const v=f("button",{type:"button",onclick:()=>(l.value=String(Math.floor(Math.random()*1e6)),u())},"another"),y=f("div",{class:"dials"},f("label",{},"Rooms a side: ",i,h),f("label",{},"Seed: ",l,v),f("label",{},c," spheres, as on 20 May (unticked: 13 May)"));return t.replaceChildren(f("div",{class:"maze-app"},s,r,f("div",{class:"row"},d,p),y)),u(),k}const Hi=()=>{const t=Yo(ke.size,ke.size,ke.seed);return`<div class="maze-app"><div class="figure">${Go(t)}</div><p class="status">${zo(t)}</p></div>`},Wi={name:"maze",apps:{maze:Bi},stills:{maze:Hi}};function qi(t,e){let n=Array.from({length:e.length+1},(a,o)=>o);for(let a=1;a<=t.length;a+=1){const o=[a];for(let s=1;s<=e.length;s+=1){const r=(n[s-1]??0)+(t[a-1]===e[s-1]?0:1);o[s]=Math.min(r,(n[s]??0)+1,(o[s-1]??0)+1)}n=o}return n[e.length]??0}function _i(t,e){if(e.includes(t))return t;let n=null,a=1/0;for(const o of e){const s=qi(t,o);s<a&&([n,a]=[o,s])}return n}const zi=/[\p{L}\p{M}\p{N}']+|[.,!?;:]/gu,Yi=/\]\([^)]*\)|^---[\s\S]*?\n---|[#*_`>\[\]|]|::[a-z-]+/gm;function pt(t){return t.normalize("NFKC").replace(Yi," ").toLowerCase().match(zi)??[]}const tt=" ";class on{constructor(e,n){this.memory=n;const a=pt(e),o=new Map;for(const s of a)o.set(s,(o.get(s)??0)+1);this.vocabulary=[...o.keys()],this.commonest=[...o].reduce((s,r)=>s&&s[1]>=r[1]?s:r,null)?.[0]??null;for(let s=1;s<a.length;s+=1)for(let r=1;r<=n&&r<=s;r+=1){const i=a.slice(s-r,s).join(tt),h=this.followers.get(i)??new Map;h.set(a[s]??"",(h.get(a[s]??"")??0)+1),this.followers.set(i,h)}}memory;vocabulary;commonest;followers=new Map;after(e){for(let n=Math.min(this.memory,e.length);n>=1;n-=1){const a=e.slice(-n),o=this.followers.get(a.join(tt));if(o)return{context:a,candidates:ja(o)}}return{context:[],candidates:[]}}transitions(){return[...this.followers].filter(([e])=>e.split(tt).length===this.memory).flatMap(([e,n])=>ja(n).map(a=>({context:e.split(tt),...a}))).sort((e,n)=>n.probability-e.probability||n.count-e.count)}}function ja(t){const e=[...t.values()].reduce((n,a)=>n+a,0);return[...t].map(([n,a])=>({word:n,count:a,probability:a/e})).sort((n,a)=>a.count-n.count)}function Gi(t,e){let n=e();for(const a of t)if(n-=a.probability,n<=0)return a.word;return t[t.length-1]?.word??null}function Ca(t){return t.reduce((e,n)=>e===""||/^[.,!?;:]$/.test(n)?e+n:`${e} ${n}`,"")}function Uo(t,e){if(e<=0)return t.map((o,s)=>({...o,probability:s===0?1:0}));const n=t.map(o=>o.probability**(1/e)),a=n.reduce((o,s)=>o+s,0);return t.map((o,s)=>({...o,probability:(n[s]??0)/a}))}const Nt=40,Oa=8,Lt=t=>`${Math.round(t*100)}%`;function Jo(t,e,n){const{context:a,candidates:o}=t.after(e),s=o.slice(0,Oa),r=Uo(o,n).slice(0,Oa),i=o.reduce((g,{count:k})=>g+k,0),h=e.slice(0,e.length-a.length),l=`<p class="written">${S(Ca(h))}${h.length&&a.length?" ":""}${a.length?`<mark>${S(Ca(a))}</mark>`:""}<span class="caret"></span></p>`,c=s.length?`<ol class="offered">${s.map(({word:g,count:k,probability:w},v)=>{const y=r[v]?.probability??0;return`<li><button type="button" data-word="${S(g)}" title="seen ${k} of ${i} times: ${Lt(w)} as learnt"><span class="word">${S(g)}</span><span class="chance" style="--p:${y.toFixed(3)}"></span><span class="figure">${Lt(y)}</span></button></li>`}).join("")}</ol>`:`<p class="offered">It never saw anything follow “${S(e[e.length-1]??"")}”. This is where it stops.</p>`,d=g=>a.length===t.memory&&g.context.join(" ")===a.join(" "),p=t.transitions(),m=[...p.filter(d),...p.filter(g=>!d(g))].slice(0,Nt).map(g=>`<tr${d(g)?' class="now"':""}><td>${S(g.context.join(" "))}</td><td>${S(g.word)}</td><td>${g.count}</td><td>${Lt(g.probability)}</td></tr>`).join(""),u=`<table class="learnt"><caption>What it learnt: ${p.length} transitions between ${t.vocabulary.length} words${p.length>Nt?`, the first ${Nt} shown`:""}</caption><thead><tr><th>after</th><th>comes</th><th>seen</th><th>chance</th></tr></thead><tbody>${m}</tbody></table>`;return`<div class="next-word">${l}<h4>What may come next</h4>${c}${u}</div>`}const ct="The cat is happy. The dog is glad. The cat sleeps. The dog plays. The cat eats. The dog runs. The car is fast. The car goes far.",Ui=350;function Ji(t,{site:e}){const n={small:()=>ct,site:()=>e.pages.map(b=>b.body).join(`

`),own:()=>c.value};let a=new on(ct,1),o=pt("the"),s=null;const r=f("div"),i=(b,T)=>f("option",{value:b},T),h=f("select",{onchange:()=>w()},i("small","eight short sentences"),i("site","this website"),i("own","your own text")),l=f("select",{onchange:()=>w()},i(1,"one word back"),i(2,"two words back"),i(3,"three words back")),c=f("textarea",{rows:5,hidden:!0,placeholder:"Paste any text here. The longer, the better it pretends.",oninput:()=>w()}),d=f("output",{},"1"),p=f("input",{type:"range",min:0,max:2,step:.1,value:1,oninput:()=>g()}),m=f("input",{type:"text",value:"the",onchange:()=>k()}),u=f("button",{type:"button",onclick:()=>s?$():y()},"write");function g(){d.textContent=p.value,r.innerHTML=Jo(a,o,Number(p.value))}function k(){$();const b=pt(m.value).flatMap(T=>_i(T,a.vocabulary)??[]);o=b.length?b:a.commonest?[a.commonest]:[],g()}function w(){c.hidden=h.value!=="own",a=new on(n[h.value]?.()??ct,Number(l.value)),k()}function v(){const b=Gi(Uo(a.after(o).candidates,Number(p.value)),Math.random);return b===null?!1:(o=[...o,b],g(),!0)}function y(){u.textContent="stop",s=setInterval(()=>{v()||$()},Ui)}function $(){s&&clearInterval(s),s=null,u.textContent="write"}r.addEventListener("click",b=>{const T=b.target?.closest("[data-word]")?.getAttribute("data-word");T&&(o=[...o,T],g())});const I=f("div",{class:"dials"},f("label",{},"It has read",h),f("label",{},"It looks",l),f("label",{},"Temperature: ",d,p),f("label",{},"Start from",m)),M=f("div",{class:"row"},f("button",{type:"button",onclick:()=>{v()}},"next word"),u,f("button",{type:"button",onclick:()=>k()},"start over"));return t.replaceChildren(I,c,M,r),g(),$}const Ki=()=>Jo(new on(ct,1),pt("the"),1),Vi={name:"next-word",apps:{"next-word":Ji},stills:{"next-word":Ki}},Ft={"string-cache-map":"a WeakMap replacement for string keys, with a bounded cache behind it","async-barrier":"a helper that makes async/await tests say what they wait for","spy-middleware":"a Redux middleware for spying on actions in tests","grunt-frontmatter":"a Grunt task: many files with YAML front matter into one JSON","object-canonical-keys":"always the same array of keys for the same keys, so comparisons stay cheap","async-deferrer":"one function that returns a promise, or resolves it"},Pa=160,Rt=28,dt=t=>t.toLocaleString("en-US");function Dt(t,e){const n=Math.max(1,...t.map(e)),a=Pa/t.length,o=t.map((s,r)=>{const i=e(s)/n*(Rt-2);return`<rect x="${(r*a+1).toFixed(1)}" y="${(Rt-i).toFixed(1)}" width="${(a-2).toFixed(1)}" height="${i.toFixed(1)}"><title>${s}: ${dt(e(s))}</title></rect>`}).join("");return`<svg class="spark" viewBox="0 0 ${Pa} ${Rt}" role="img" aria-label="Downloads a year, ${t[0]} to ${t[t.length-1]}">${o}</svg>`}function Ko(t){const e=Object.keys(t.years).sort(),n=c=>d=>t.years[d]?.[c]??0,a=c=>e.reduce((d,p)=>d+c(p),0),o=Object.keys(Ft).sort((c,d)=>a(n(d))-a(n(c))),s=[...new Set(e.flatMap(c=>Object.keys(t.years[c]??{})))].filter(c=>!(c in Ft)),r=c=>s.reduce((d,p)=>d+n(p)(c),0),i=c=>Object.values(t.years[c]??{}).reduce((d,p)=>d+p,0),h=o.filter(c=>a(n(c))>0).map(c=>`<tr><th scope="row"><a href="https://www.npmjs.com/package/${c}"><code>${c}</code></a><span>${Ft[c]}</span></th><td>${Dt(e,n(c))}</td><td>${dt(a(n(c)))}</td></tr>`).join(""),l=s.length?`<tr><th scope="row">the other ${s.length}<span>mostly AngularJS and Redux helpers written for one project each</span></th><td>${Dt(e,r)}</td><td>${dt(a(r))}</td></tr>`:"";return`<figure class="packages"><table class="packages"><thead><tr><th>package</th><th>${e[0]} to ${e[e.length-1]}, a bar a year</th><th>downloads</th></tr></thead><tbody>${h}${l}</tbody><tfoot><tr><th scope="row">all of them</th><td>${Dt(e,i)}</td><td>${dt(a(i))}</td></tr></tfoot></table></figure>`}function Xi(t){if(t.querySelector("figure"))return;const e=vn(t,"/data/npm/index.json");fetch("/data/npm/downloads.json").then(n=>n.json()).then(n=>{t.innerHTML=Ko(n),t.append(e)}).catch(()=>{t.textContent="The download counts did not arrive. The rest of the page does not depend on them."})}const Bt=["string-cache-map","async-barrier","spy-middleware","grunt-frontmatter","object-canonical-keys","gherkin-genie","async-deferrer","egg-hatchery","angular-tags","class-strict","micro-egg-hatchery","node-dio","ducks-middleware","drpx-updateable","generator-drpx","grunt-ngtags","teal-redux-egg","ducks-reducer","drpx-storage-mocks","strict-classes","ngtags","redux-egg","esmoquin","drpx-storage","dio-provider","drpx-components","grunt-angular-tags","drpx-bind-angular","drpx-toggle","drpx-id","drpx-seo","drpx-otherwisehome","drpx-class-route","drpx-transcludeto"],Ht="downloads.json",Zi={name:"npm",directory:"public/data/npm",firstYear:2015,files:[Ht],about:{measures:"downloads a year of the npm packages published as drpicox",attribution:"npm, Inc. Download counts of the public registry.",dataset:"https://github.com/npm/registry/blob/main/docs/download-counts.md",packages:Bt},requestsFor(t){return[`https://api.npmjs.org/downloads/point/${t}-01-01:${t}-12-31/${Bt.join(",")}`]},withYear(t,e,n){const a=n[0],o=Object.entries(typeof a=="object"&&a!==null?a:{}).flatMap(([s,r])=>{const i=r?.downloads;return Bt.includes(s)&&typeof i=="number"&&i>0?[[s,i]]:[]});if(o.length===0)throw new Error("the registry did not answer with downloads");return{[Ht]:{years:{...t[Ht]?.years,[e]:Object.fromEntries(o)}}}}},Qi=t=>Ko(JSON.parse(t("/data/npm/downloads.json")))+gt(JSON.parse(t("/data/npm/index.json"))),eh={name:"packages",apps:{packages:Xi},stills:{packages:Qi},sources:[Zi]},th={name:"portfolio",flags:[{name:"portfolio",description:"the lists with pictures as cards, the width of a program"}]},nh=/^\s*\* (.*)$/,ah=/^#{1,6} /;function oh(t){let e="";const n=[],a={s:0,n:0},o=i=>e+=e===""?i.toLowerCase():i[0].toUpperCase()+i.slice(1).toLowerCase(),s=(i,h)=>{a[h]+=1;const l=/shouldBe/i.test(e)&&!n.some(c=>c.name==="expected");n.push({value:i,name:l?"expected":`${h}${a[h]}`})},r=t.matchAll(/([A-Za-z]+)|("[^"]+")|(\d+)/g);for(const[,i,h,l]of r)i?o(i):h?(s(h,"s"),o("S")):l&&(s(l,"n"),o("N"));return{name:e,args:n}}const sh=["there","is","are","has","have","need","needs"],Ce=(t,e)=>new RegExp(`\\b${e}\\b`,"i").test(t);function rh(t,e){if(t.length===0)return[{line:e,message:'does not have any executable instruction by tests. Post lines that run must begin with " * ".'}];if(!t.some(o=>/should/i.test(o.name)))return[{line:t[t.length-1].line,message:'does not have any executable instruction that contains "should": at least one line must test that the outcome is the expected.'}];for(const o of t){const s=sh.find(r=>Ce(o.text,r));if(s&&!Ce(o.text,"given")&&!Ce(o.text,"should"))return[{line:o.line,message:`has an instruction with the word "${s}" but no "should" or "given". Add "given" if it sets up, or "should" if it checks a result.`}]}const n=t.find(o=>Ce(o.text,"given")&&Ce(o.text,"should"));if(n)return[{line:n.line,message:'has an instruction with the word "given" and "should" at the same time. Keep "given" for a setup, "should" for an assertion.'}];if(t.some(o=>o.name===""))return[{line:t.find(o=>o.name==="").line,message:"has an instruction with no words in it."}];const a=t[t.length-1];return/should/i.test(a.name)?[]:[{line:a.line,message:'the last instruction must contain "should": a post ends by checking what it set out to show.'}]}function ih(t){const[e="",...n]=t.replace(/\.md$/,"").split("_");return`Post_${e.replace(/-/g,"")}_${n.map(a=>a[0].toUpperCase()+a.slice(1)).join("")}_Context`}function Vo(t,e){const n=t.replace(/^---[\s\S]*?\n---\n/,m=>m.replace(/[^\n]/g,"")).split(`
`),a=n.find(m=>/^# /.test(m))?.slice(2).trim()??e,o=ih(e),s=[],r=[];n.forEach((m,u)=>{const g=nh.exec(m);if(g){const{name:k,args:w}=oh(g[1]??""),v=`${k}(${w.map(y=>y.value).join(", ")})`;s.push({line:u+1,text:m.trim(),name:k,args:w,call:v}),r.push(`  await context.${v};	// ${m.trim()}`)}else ah.test(m)&&r.push("",`  // ${m.trim()}`)});const i=Math.max(0,...r.map(m=>m.indexOf("	"))),h=r.map(m=>m.includes("	")?m.replace("	"," ".repeat(i-m.indexOf("	")+1)):m),l=["// !!! IMPORTANT !!!","// This test file is AUTOGENERATED by yarn create-tests","// DO NOT MODIFY manually.","",`test("${e}", async () => {`,`  const context = new ${o}();`,"  await context.beforeTest();",...h,"","  await context.afterTest();","});",""].join(`
`),c=new Set,d=s.filter(m=>!c.has(m.name)&&c.add(m.name)),p=[`export class ${o} {`,"  async beforeTest() {}","",...d.flatMap(m=>[`  async ${m.name}(${m.args.map(u=>u.name).join(", ")}) {`,"    // TODO","  }",""]),"  async afterTest() {}","}",""].join(`
`);return{title:a,className:o,steps:s,test:l,context:p,problems:rh(s,n.length)}}const Re=[{file:"2022-07-15_hello_blog.md",label:"Hello Blog — the first post of the course",markdown:`---
writer: drpicox
coder: drpicox
package: blog
---
# Hello Blog

You can find here the blog.
The blog is a contract, between you, the player, and me, the maker of this game.

## How to use the blog

The blog is available in the application, and you can arrive through the header.

 * Go to the blog section,
 * You should see a list of posts,
 * The last post title should be "Hello Blog", this post
 * Go to the "Hello Blog" post,
 * You should see the "Hello Blog" post
 * The post should contain "this text", which is here.

_Thanks for the read._
`},{file:"2022-07-25_ideas_have_xp.md",label:"Ideas Have XP — a rule of the game, shortened",markdown:`---
writer: drpicox
package: idea
---
# Ideas Have XP

The more you practice an idea, more skilled you become.
So get ready to accumulate experience points.

## Increasing XP

When the game begins, the XP in any idea is zero.

 * Enter the game.
 * There should be the "Harvest Idea" idea.
 * The "Harvest Idea" should have 0 XP.

But when you start using them, the XP in the "Harvest Idea" idea should increase.

 * Draw a card from the "Harvest Idea" idea.
 * Move the "Harvest Idea" card to its own stack.
 * Move the "Villager" card on top of the "Harvest Idea" card.
 * Move the "Berry Bush" card on top of the "Villager" card.
 * There should be 1 stack of 1 "Harvest Idea", 1 "Villager", and 1 "Berry Bush" cards.
 * End the current moon.
 * The "Harvest Idea" should have 1 XP.

### Gaining several XP at once

We won only one XP because there was only one use of the idea.
But what if we create two piles?

 * Given a new game.
 * Given there is the "Harvest Idea" idea.
 * Given there are 1 "Berry" cards.
 * Given there are 2 stacks of 1 "Harvest Idea", 1 "Villager", and 1 "Berry Bush" cards.
 * End the current moon.
 * The "Harvest Idea" should have 2 XP.
`}],bt=t=>new Set(t.split(/\s+/).filter(Boolean)),hh=bt(`
  var let const function return if else for while do break continue new this
  true false null undefined class extends import export from default async await
  throw try catch finally typeof instanceof in of switch case delete void yield`),lh=bt(`
  auto break case char const continue default do double else enum extern float for goto if
  inline int long register restrict return short signed sizeof static struct switch typedef
  union unsigned void volatile while NULL true false`),ch=bt(`
  abstract assert boolean break byte case catch char class const continue default do double
  else enum extends final finally float for goto if implements import instanceof int interface
  long native new package private protected public return short static strictfp super switch
  synchronized this throw throws transient try var void volatile while true false null`),dh=bt(`
  AND AS CASE CLS CONST DECLARE DEFDBL DIM DO DOUBLE ELSE END EXIT FOR FUNCTION IF IS
  LOCATE LOOP NEXT NOT OR PRINT RANDOMIZE SCREEN SELECT SHARED STATIC STEP SUB THEN TO
  UNTIL WHILE OPTION BASE`);function q(t,e){return`<span class="hl-${t}">${S(e)}</span>`}function Sn(t,e,n){for(let a=e+1;a<t.length;a+=1)if(t[a]==="\\")a+=1;else if(t[a]===n)return a+1;return t.length}function Wt(t,e,n){let a="",o=0;for(;o<t.length;){const s=t.slice(o);let r;const i=t.lastIndexOf(`
`,o-1)+1,h=/^\s*$/.test(t.slice(i,o));if(s.startsWith("//")||n&&s[0]==="#"&&h){const l=t.indexOf(`
`,o),c=l<0?t.length:l;a+=q(s[0]==="#"?"a":"c",t.slice(o,c)),o=c}else if(s.startsWith("/*")){const l=t.indexOf("*/",o+2),c=l<0?t.length:l+2;a+=q("c",t.slice(o,c)),o=c}else if(s[0]==='"'||s[0]==="'"||s[0]==="`"){const l=Sn(t,o,s[0]??"");a+=q("s",t.slice(o,l)),o=l}else if(r=/^[A-Za-z_$][\w$]*/.exec(s)){const l=r[0];a+=e.has(l)?q("k",l):S(l),o+=l.length}else(r=/^\d+(?:\.\d+)?/.exec(s))?(a+=q("n",r[0]),o+=r[0].length):(a+=S(s[0]??""),o+=1)}return a}function uh(t){let e="",n=0;for(;n<t.length;){const a=t.slice(n);let o;if(a.startsWith("%")){const s=t.indexOf(`
`,n),r=s<0?t.length:s;e+=q("c",t.slice(n,r)),n=r}else if(a.startsWith("/*")){const s=t.indexOf("*/",n+2),r=s<0?t.length:s+2;e+=q("c",t.slice(n,r)),n=r}else if(a[0]==="'"){const s=Sn(t,n,"'");e+=q("s",t.slice(n,s)),n=s}else if(a.startsWith("-->")||a.startsWith(":-")){const s=a.startsWith("-->")?"-->":":-";e+=q("k",s),n+=s.length}else(o=/^[A-Z_][\w]*/.exec(a))?(e+=q("a",o[0]),n+=o[0].length):(o=/^[a-z][\w]*/.exec(a))?(e+=S(o[0]),n+=o[0].length):(e+=S(a[0]??""),n+=1)}return e}function mh(t){let e="",n=0;for(;n<t.length;){const a=t.slice(n);let o;if(a[0]==="'"||/^REM\b/i.test(a)){const s=t.indexOf(`
`,n),r=s<0?t.length:s;e+=q("c",t.slice(n,r)),n=r}else if(a[0]==='"'){const s=t.indexOf('"',n+1),r=s<0?t.length:s+1;e+=q("s",t.slice(n,r)),n=r}else(o=/^[A-Za-z_][\w]*[$!#%&]?/.exec(a))?(e+=dh.has(o[0].toUpperCase())?q("k",o[0]):S(o[0]),n+=o[0].length):(o=/^\d+(?:\.\d+)?/.exec(a))?(e+=q("n",o[0]),n+=o[0].length):(e+=S(a[0]??""),n+=1)}return e}function ph(t){let e="",n=0;for(;n<t.length;){const a=t.slice(n);if(a.startsWith("<!--")){const s=t.indexOf("-->",n+4),r=s<0?t.length:s+3;e+=q("c",t.slice(n,r)),n=r;continue}const o=/^<(\/?)([A-Za-z][\w-]*)/.exec(a);if(!o){const s=t.indexOf("<",n+1),r=s<0?t.length:s;e+=S(t.slice(n,r)),n=r;continue}for(e+=`&lt;${o[1]}${q("t",o[2]??"")}`,n+=o[0].length;n<t.length&&t[n]!==">";){const s=t.slice(n);let r;if(r=/^\s+/.exec(s))e+=r[0],n+=r[0].length;else if(r=/^[A-Za-z_:][\w:.-]*/.exec(s))e+=q("a",r[0]),n+=r[0].length;else if(s[0]==="="&&(s[1]==='"'||s[1]==="'")){const i=Sn(t,n+1,s[1]??"");e+=`=${q("s",t.slice(n+1,i))}`,n=i}else e+=S(s[0]??""),n+=1}t[n]===">"&&(e+="&gt;",n+=1)}return e}function sn(t,e){return e==="js"||e==="javascript"?Wt(t,hh,!1):e==="c"?Wt(t,lh,!0):e==="java"?Wt(t,ch,!1):e==="prolog"?uh(t):e==="html"?ph(t):e==="basic"?mh(t):S(t)}function Xo(t,e){return`<div class="compiled">${t.problems.length?`<div class="refused"><strong>${S(e)}</strong> line ${t.problems[0].line}: ${S(t.problems[0].message)}<br>The tests are not written until the post is fixed.</div>`:""}<h4>${S(e.replace(/\.md$/,""))} → the test, never edited by hand</h4><pre><code>${sn(t.test,"js")}</code></pre><h4>→ the context, written once and filled in by the coder</h4><pre><code>${sn(t.context,"js")}</code></pre></div>`}function fh(t){const e=f("div"),n=f("textarea",{class:"post",spellcheck:!1,rows:28,oninput:()=>r()}),a=f("input",{type:"text",value:Re[0].file,oninput:()=>r()}),o=f("select",{onchange:()=>s(Number(o.value))},...Re.map((i,h)=>f("option",{value:h},i.label)));function s(i){const h=Re[i]??Re[0];n.value=h.markdown,a.value=h.file,r()}function r(){e.innerHTML=Xo(Vo(n.value,a.value),a.value)}t.replaceChildren(f("div",{class:"row"},f("label",{},"Post ",o),f("label",{},"File ",a)),f("div",{class:"post-tests"},n,e)),s(0)}const gh=()=>{const t=Re[0];return`<div class="post-tests"><pre class="post">${t.markdown.replace(/&/g,"&amp;").replace(/</g,"&lt;")}</pre>${Xo(Vo(t.markdown,t.file),t.file)}</div>`},wh={name:"post-tests",apps:{"post-tests":fh},stills:{"post-tests":gh}},rn="program-asked";function hn(t,e){t.dispatchEvent(new CustomEvent(rn,{detail:e}))}function xe(t){return t.toLowerCase().replace(/\s+/g,"-")}const qt=t=>typeof t=="string"?xe(t):String(Number(t.toPrecision(4)));function yh(t,e){const n=t.parameters.flatMap(a=>{const o=e[a.name];return o===void 0||qt(o)===qt(a.initial)?[]:[`--${a.name} ${qt(o)}`]});return[t.name,...n].join(" ")}function Zo(t){return Object.fromEntries(t.parameters.map(e=>[e.name,e.initial]))}function bh(t){return t.scale!=="log"?{min:t.min,max:t.max,step:t.step,positionOf:e=>e,valueAt:e=>e}:{min:Math.log10(t.min),max:Math.log10(t.max),step:t.step,positionOf:e=>Math.log10(e),valueAt:e=>10**e}}const ln="program-ran";function vh(t,e){const n=bh(t),a=t.show??String,o=f("output"),s=f("input",{type:"range",name:t.name,min:n.min,max:n.max,step:n.step});return s.addEventListener("input",()=>e(n.valueAt(Number(s.value)))),{label:f("label",{},`${t.label}: `,o,s),settle:r=>{s.value=String(n.positionOf(Number(r))),o.textContent=a(Number(r))}}}function kh(t,e){const n=f("select",{name:t.name},...t.choices.map(a=>f("option",{value:a},a)));return n.addEventListener("change",()=>e(n.value)),{label:f("label",{},`${t.label} `,n),settle:a=>{n.value=String(a)}}}function Qo(t){return e=>{let n=Zo(t);const a=e.dataset.dials?.split(" "),o=a!==void 0&&t.glance!==void 0,s=f("code"),r=f("div",{class:o?"program-figure glance":"program-figure"}),i=d=>p=>{n={...n,[d]:p},l()},h=t.parameters.filter(d=>!a||a.includes(d.name)).map(d=>({name:d.name,dial:"choices"in d?kh(d,i(d.name)):vh(d,i(d.name))}));function l(){for(const{name:d,dial:p}of h)p.settle(n[d]??"");s.textContent=`$ ${yh(t,n)}`,r.innerHTML=o?t.glance?.(n)??"":t.run(n).html,e.dispatchEvent(new CustomEvent(ln,{detail:n}))}const c=d=>{n={...n,...d.detail},l()};return e.addEventListener(rn,c),e.replaceChildren(f("div",{class:"dials"},...h.map(({dial:d})=>d.label)),f("p",{class:"program-line"},s),r),l(),()=>e.removeEventListener(rn,c)}}const nt=149597870700,pe=94607e11,We=[{name:"the Moon",metres:3844e5,said:"384,400 km"},{name:"Mars",metres:.52*nt,said:"0.52 au"},{name:"Jupiter",metres:4.2*nt,said:"4.2 au"},{name:"Saturn",metres:8.5*nt,said:"8.5 au"},{name:"Pluto",metres:38.5*nt,said:"38.5 au"},{name:"Proxima Centauri",metres:4.24*pe,said:"4.24 light-years"},{name:"Sirius",metres:8.58*pe,said:"8.58 light-years"},{name:"Epsilon Eridani",metres:10.52*pe,said:"10.52 light-years"},{name:"Tau Ceti",metres:11.91*pe,said:"11.91 light-years"},{name:"the centre of the galaxy",metres:26e3*pe,said:"26,000 light-years",towards:{ra:17.76,dec:-29}},{name:"Andromeda",metres:25e5*pe,said:"2.5 million light-years",towards:{ra:.712,dec:41.27}}],Be={dryMass:25e3,fuel:5e3,exhaust:.72},xh=299792458;function Mn(t){if(t<.01)return`${Math.round(t*xh/1e3).toLocaleString("en-US")} km/s`;if(t<.99)return`${(t*100).toPrecision(2)}% of c`;const e=Math.min(12,Math.ceil(-Math.log10(1-t)));return`${(Math.floor(t*10**e)/10**(e-2)).toFixed(e-2)}% of c`}const $h=[[365.25*86400*1e6,"million years"],[365.25*86400,"years"],[86400,"days"],[3600,"hours"],[60,"minutes"],[1,"seconds"]];function se(t){const[e,n]=$h.find(([s])=>t>=s)??[1,"seconds"],a=t/e;return`${a>=10?Math.round(a).toLocaleString("en-US"):String(Math.round(a*10)/10)} ${n}`}const Th=new Intl.NumberFormat("en-US",{notation:"compact",maximumSignificantDigits:3});function ft(t){return t>=1e6?`${Th.format(t)} t`:`${t>=100?Math.round(t).toLocaleString("en-US"):t.toPrecision(2)} t`}const X=299792458,Sh=9.81;function An(t,e){const n=e.acceleration*Sh,a=e.dryMass+e.fuel,o=e.exhaust*X,s=X/n*Math.acosh(1+n*t/(2*X*X)),r=a*(1-Math.exp(-2*n*s/o)),i=r>e.fuel,h=i?o/(2*n)*Math.log(a/e.dryMass):s,l=Math.tanh(n*h/X),c=X/n*Math.sinh(n*h/X),d=X*X/n*(Math.cosh(n*h/X)-1),p=Math.max(0,t-2*d),m=i?p/(l*X):0,u=m*Math.sqrt(1-l*l);return{shipTime:2*h+u,homeTime:2*c+m,burnTime:h,coastTime:u,topSpeed:l,fuelBurnt:i?e.fuel:r,coasts:i}}const Mh=299792458,Ah=9.81,Oe=720,at=170,G={top:12,right:10,bottom:24,left:40};function Ih(t,e){const n=Oe-G.left-G.right,a=at-G.top-G.bottom,o=p=>G.left+p/t.shipTime*n,s=p=>G.top+a-p/Math.max(t.topSpeed,1e-12)*a,r=e.acceleration*Ah,i=24,h=Array.from({length:i+1},(p,m)=>t.burnTime*m/i).map(p=>[p,Math.tanh(r*p/Mh)]),c=[...h.map(([p,m])=>[p,m]),...h.reverse().map(([p,m])=>[t.shipTime-p,m])].map(([p,m])=>`${o(p).toFixed(1)},${s(m).toFixed(1)}`).join(" "),d=t.coasts?`<text x="${((o(t.burnTime)+o(t.shipTime-t.burnTime))/2).toFixed(1)}" y="${(s(t.topSpeed)+14).toFixed(1)}" text-anchor="middle">engine off, ${se(t.coastTime)}</text>`:"";return`<svg class="trip" viewBox="0 0 ${Oe} ${at}" role="img" aria-label="Speed against the ship's clock"><line class="grid" x1="${G.left}" x2="${Oe-G.right}" y1="${s(0)}" y2="${s(0)}"/><line class="grid" x1="${G.left}" x2="${Oe-G.right}" y1="${s(t.topSpeed)}" y2="${s(t.topSpeed)}"/><text x="${G.left}" y="${s(t.topSpeed)-3}">${Mn(t.topSpeed)}</text><polyline class="line" points="${c}"/>${d}<text x="${G.left}" y="${at-6}">departure</text><text x="${Oe-G.right}" y="${at-6}" text-anchor="end">arrival, ${se(t.shipTime)} on board</text></svg>`}function Eh(t,e){const n=We.map(s=>({destination:s,trip:An(s.metres,t)})),a=n.map(({destination:s,trip:r})=>{const i=[s.name===e?"chosen":"",r.coasts?"coasts":""].filter(Boolean).join(" "),h=r.coasts?`all ${ft(t.fuel)}, then coasts`:ft(r.fuelBurnt);return`<tr${i?` class="${i}"`:""} data-destination="${s.name}"><th scope="row">${s.name}</th><td>${s.said}</td><td>${se(r.shipTime)}</td><td>${se(r.homeTime)}</td><td>${Mn(r.topSpeed)}</td><td>${h}</td></tr>`}).join(""),o=n.find(({destination:s})=>s.name===e)??n[0];return`<figure class="rocket"><table class="voyages"><thead><tr><th>to</th><th>distance</th><th>on board</th><th>at home</th><th>top speed</th><th>fuel burnt</th></tr></thead><tbody>${a}</tbody></table>`+(o?`<h4>To ${o.destination.name}: speed against the ship's clock</h4>${Ih(o.trip,t)}`:"")+"</figure>"}function es(t){return{dryMass:Be.dryMass,fuel:Number(t.fuel)*Be.dryMass,exhaust:Number(t.exhaust)/100,acceleration:Number(t.acceleration)}}const Na=365.25*86400,jh=new Intl.NumberFormat("en-US",{notation:"compact",maximumSignificantDigits:2}),cn={name:"rocket",summary:"a relativistic rocket: how long a trip takes on board and at home, and what it burns",parameters:[{name:"acceleration",label:"Acceleration",description:"what the crew feels while the engine burns, in g",min:.05,max:3,step:.05,initial:.3,show:t=>`${t.toFixed(2)} g`},{name:"fuel",label:"Fuel",description:"fuel on board, as a multiple of the ship's own mass",min:.1,max:1e13,step:.05,initial:Be.fuel/Be.dryMass,scale:"log",show:t=>`${jh.format(t)} × the ship`},{name:"exhaust",label:"Exhaust speed",description:"the speed of what leaves the engine, in percent of the speed of light",min:1,max:100,step:1,initial:Be.exhaust*100,show:t=>`${Math.round(t)}% of c`},{name:"to",label:"To",description:"where to fly",choices:We.map(t=>t.name),initial:"Proxima Centauri"}],run(t){const e=es(t),n=String(t.to),a=We.map(h=>({destination:h,trip:An(h.metres,e)})),o=a.find(({destination:h})=>h.name===n)??a[0],{destination:s,trip:r}=o,i=r.coasts?`all ${ft(e.fuel)} of fuel, then coasts`:`${ft(r.fuelBurnt)} of fuel`;return{text:`to ${s.name}, ${s.said}: ${se(r.shipTime)} on board, ${se(r.homeTime)} at home, top speed ${Mn(r.topSpeed)}, ${i}`,html:Eh(e,n),data:{ship:{dryMassTonnes:e.dryMass,fuelTonnes:e.fuel,exhaust:e.exhaust,accelerationG:e.acceleration},trips:a.map(({destination:h,trip:l})=>({to:h.name,distance:h.said,onBoardYears:l.shipTime/Na,atHomeYears:l.homeTime/Na,topSpeed:l.topSpeed,fuelBurntTonnes:l.fuelBurnt,coasts:l.coasts}))}}}},ot=[{name:"Proxima Centauri",ra:14.495,dec:-62.68,lightYears:4.24},{name:"Alpha Centauri",ra:14.66,dec:-60.83,lightYears:4.37},{name:"Barnard's Star",ra:17.963,dec:4.69,lightYears:5.96},{name:"Wolf 359",ra:10.941,dec:7.01,lightYears:7.86},{name:"Lalande 21185",ra:11.056,dec:35.97,lightYears:8.31},{name:"Sirius",ra:6.752,dec:-16.72,lightYears:8.58},{name:"Luyten 726-8",ra:1.65,dec:-17.95,lightYears:8.73},{name:"Ross 154",ra:18.83,dec:-23.84,lightYears:9.69},{name:"Ross 248",ra:23.699,dec:44.18,lightYears:10.3},{name:"Epsilon Eridani",ra:3.549,dec:-9.46,lightYears:10.52},{name:"Lacaille 9352",ra:23.098,dec:-35.85,lightYears:10.72},{name:"Ross 128",ra:11.796,dec:.8,lightYears:11.01},{name:"EZ Aquarii",ra:22.643,dec:-15.3,lightYears:11.1},{name:"61 Cygni",ra:21.115,dec:38.75,lightYears:11.4},{name:"Procyon",ra:7.655,dec:5.22,lightYears:11.46},{name:"Struve 2398",ra:18.713,dec:59.63,lightYears:11.5},{name:"Groombridge 34",ra:.306,dec:44.02,lightYears:11.6},{name:"Epsilon Indi",ra:22.056,dec:-56.78,lightYears:11.87},{name:"Tau Ceti",ra:1.734,dec:-15.94,lightYears:11.91}];function st(t,e){const n=e.radius/e.reach;return t.map(({name:a,ra:o,dec:s,lightYears:r})=>{const i=o/24*2*Math.PI,h=s/180*Math.PI,l=r*Math.cos(h)*Math.cos(i),c=r*Math.cos(h)*Math.sin(i),d=r*Math.sin(h),p=c*Math.cos(e.yaw)-l*Math.sin(e.yaw),m=l*Math.cos(e.yaw)+c*Math.sin(e.yaw),u=d*Math.cos(e.pitch)-m*Math.sin(e.pitch),g=m*Math.cos(e.pitch)+d*Math.sin(e.pitch);return{name:a,x:p*n,y:-u*n,depth:g}})}const ie=299792458,Ch=9.81;function Oh(t,e,n){const a=e.acceleration*Ch,o=d=>({distance:ie*ie/a*(Math.cosh(a*d/ie)-1),homeTime:ie/a*Math.sinh(a*d/ie),speed:Math.tanh(a*d/ie)}),s=o(t.burnTime),r=t.homeTime-2*s.homeTime,i=r*t.topSpeed*ie,h=2*s.distance+i,l=Math.max(0,Math.min(n,t.shipTime));if(l<=t.burnTime){const d=o(l);return{along:d.distance/h,homeTime:d.homeTime,speed:d.speed}}if(l<=t.burnTime+t.coastTime){const d=(l-t.burnTime)/t.coastTime;return{along:(s.distance+d*i)/h,homeTime:s.homeTime+d*r,speed:t.topSpeed}}const c=o(t.shipTime-l);return{along:1-c.distance/h,homeTime:t.homeTime-c.homeTime,speed:c.speed}}const rt=12.5,La=9,Fa=1.5,Ph=new Set(["Alpha Centauri"]),_={ground:"#06080f",ring:"rgba(127,166,234,0.22)",stem:"rgba(127,166,234,0.18)",star:"#dfe7f5",dim:"#7d8aa3",sun:"#ffd98a",way:"#ff9d6e",ship:"#ffffff"};function Nh(t,e,n){const a=t.getContext("2d");if(!a)return()=>{};const o=a,s=window.matchMedia("(prefers-reduced-motion: reduce)").matches,r=new Set(We.map(({name:v})=>v));let i={yaw:.6,pitch:.45,radius:1,reach:rt},h=0,l=performance.now(),c=null,d=[];const p=()=>({x:t.clientWidth/2,y:t.clientHeight/2});function m(v){const y=t.clientWidth,$=t.clientHeight,I=window.devicePixelRatio||1;t.width!==Math.round(y*I)&&(t.width=Math.round(y*I),t.height=Math.round($*I)),o.setTransform(I,0,0,I,0,0),o.fillStyle=_.ground,o.fillRect(0,0,y,$),!s&&!c&&(i={...i,yaw:i.yaw+.0015}),i={...i,radius:Math.min(y,$)*.47};const M=p(),b=E=>({x:M.x+E.x,y:M.y+E.y});o.font="11px ui-monospace, Menlo, monospace";for(const E of[5,10]){const N=st(Array.from({length:73},(L,R)=>({name:"",ra:R/72*24,dec:0,lightYears:E})),i);o.beginPath(),N.forEach((L,R)=>R?o.lineTo(b(L).x,b(L).y):o.moveTo(b(L).x,b(L).y)),o.strokeStyle=_.ring,o.stroke();const F=b(N[0]??{x:0,y:0});o.fillStyle=_.dim,o.fillText(`${E} ly`,F.x+4,F.y-3)}const{ship:T,chosen:C}=e(),P=We.find(({name:E})=>E===C),j=ot.find(({name:E})=>E===C),A=P?An(P.metres,T):null;d=st(ot,i);const O=st(ot.map(E=>({...E,lightYears:E.lightYears*Math.cos(E.dec/180*Math.PI),dec:0})),i),x=d.map((E,N)=>N).sort((E,N)=>(d[E]?.depth??0)-(d[N]?.depth??0));for(const E of x){const N=b(d[E]??{x:0,y:0}),F=b(O[E]??{x:0,y:0}),L=d[E]?.name??"",R=((d[E]?.depth??0)+rt)/(2*rt);o.strokeStyle=_.stem,o.beginPath(),o.moveTo(N.x,N.y),o.lineTo(F.x,F.y),o.stroke(),o.fillStyle=L===C?_.way:_.star,o.globalAlpha=.45+.55*R,o.beginPath(),o.arc(N.x,N.y,1.6+1.8*R,0,2*Math.PI),o.fill(),r.has(L)&&(o.strokeStyle=L===C?_.way:_.dim,o.beginPath(),o.arc(N.x,N.y,7,0,2*Math.PI),o.stroke()),o.fillStyle=L===C?_.way:_.dim,Ph.has(L)||o.fillText(L,N.x+10,N.y+4),o.globalAlpha=1}if(o.fillStyle=_.sun,o.beginPath(),o.arc(M.x,M.y,4,0,2*Math.PI),o.fill(),o.fillText("the Sun",M.x+8,M.y-6),A&&P){const E=P.towards?st([{name:"",...P.towards,lightYears:rt*1.15}],i)[0]:null,N=j?d[ot.indexOf(j)]:E,F=(v-l)/1e3%(La+2*Fa),L=s?.5:Math.min(1,Math.max(0,(F-Fa)/La)),R=Oh(A,T,L*A.shipTime);if(N){const H=b(N);o.strokeStyle=_.way,o.setLineDash(j?[]:[4,4]),o.beginPath(),o.moveTo(M.x,M.y),o.lineTo(H.x,H.y),o.stroke(),o.setLineDash([]);const Me={x:M.x+(H.x-M.x)*R.along,y:M.y+(H.y-M.y)*R.along};o.fillStyle=_.ship,o.beginPath(),o.arc(Me.x,Me.y,3,0,2*Math.PI),o.fill(),j||o.fillText(`to ${P.name}, ${P.said}: not to scale`,12,$-34)}else o.fillStyle=_.dim,o.fillText(`${P.name} is inside the dot: the planets are a thousandth of a light-year away`,12,$-34);o.fillStyle=_.star,o.font="13px ui-monospace, Menlo, monospace",o.fillText(`on board ${se(L*A.shipTime)}`,12,22),o.fillText(`at home  ${se(R.homeTime)}`,12,40),o.fillStyle=_.dim,o.fillText(`${(R.speed*100).toFixed(R.speed>.99?4:1)}% of c`,12,58),o.fillText("drag to turn",y-96,$-14)}h=s&&!c?0:requestAnimationFrame(m)}const u=v=>{const y=t.getBoundingClientRect();return{x:v.clientX-y.left,y:v.clientY-y.top}},g=v=>{c=u(v),t.setPointerCapture(v.pointerId),h||(h=requestAnimationFrame(m))},k=v=>{if(!c)return;const y=u(v);i={...i,yaw:i.yaw+(y.x-c.x)*.01,pitch:Math.max(-1.4,Math.min(1.4,i.pitch+(y.y-c.y)*.01))},c=y},w=v=>{const y=u(v),$=p(),I=d.find(M=>r.has(M.name)&&Math.hypot($.x+M.x-y.x,$.y+M.y-y.y)<12);c=null,I&&(l=performance.now(),n(I.name))};return t.addEventListener("pointerdown",g),t.addEventListener("pointermove",k),t.addEventListener("pointerup",w),h=requestAnimationFrame(m),()=>{cancelAnimationFrame(h),t.removeEventListener("pointerdown",g),t.removeEventListener("pointermove",k),t.removeEventListener("pointerup",w)}}const Lh=(t,e)=>{let n=Zo(cn);const a=h=>{n=h.detail};t.addEventListener(ln,a);const o=Qo(cn)(t,e),s=h=>{const l=h.target?.closest("[data-destination]")?.getAttribute("data-destination");l&&hn(t,{to:l})};t.addEventListener("click",s);const r=f("canvas",{class:"starmap","aria-label":"The stars within twelve light-years of the Sun, turning, with the ship flying the chosen trip"});t.prepend(r);const i=Nh(r,()=>({ship:es(n),chosen:String(n.to)}),h=>hn(t,{to:h}));return()=>{i(),o?.(),t.removeEventListener(ln,a),t.removeEventListener("click",s)}},Fh={name:"rocket",programs:[cn],apps:{rocket:Lh}};class Rh{listeners=new Set;send(e){for(const n of[...this.listeners])n(e)}on(e){return this.listeners.add(e),()=>{this.listeners.delete(e)}}}const dn=new Rh,Dh=900,Bh=480,it={x:1600,y:1e3};function ht(t,e){return(t%e+e)%e}class Hh{x=0;y=0;written="";driving=!1;follow({byRadians:e,tiltedBy:n,seconds:a}){const o=document.documentElement;if(o.dataset.sky!=="stars")return;this.driving||this.takeOver(o);const s=Dh/(Math.PI*2),r=(a/Bh*Math.PI*2+e)*s;this.x=ht(this.x+r,it.x),this.y=ht(this.y-n*s,it.y);const i=`${(Math.round(this.x*2)/2).toFixed(1)}px ${(Math.round(this.y*2)/2).toFixed(1)}px`;if(i===this.written)return;this.written=i;const[h,l]=i.split(" ");o.style.setProperty("--sky-x",h??"0px"),o.style.setProperty("--sky-y",l??"0px")}release(){const e=document.documentElement;e.classList.remove("sky-driven"),e.style.removeProperty("--sky-x"),e.style.removeProperty("--sky-y"),this.x=0,this.y=0,this.written="",this.driving=!1}takeOver(e){const n=getComputedStyle(document.body,"::before").transform;if(n&&n!=="none")try{const a=new DOMMatrixReadOnly(n);this.x=ht(a.m41,it.x),this.y=ht(a.m42,it.y)}catch{}e.classList.add("sky-driven"),this.driving=!0}}function Wh(t){return dn.on(e=>t.follow(e))}const Ra=new Hh,qh={name:"sky",install:()=>Wh(Ra),arrive:()=>Ra.release()},_t=20;function _h(t){const{baseTime:e,shortcutFactor:n,interestRate:a,timeHorizon:o}=t,s=[];let r=null;const i=e;let h=e*(1-n),l=0,c=0,d=0,p=0,m=0,u=0;for(let g=0;g<o*_t;){for(;m<=g;)l+=1,d+=1,m+=i;for(;u<=g;)c+=1,p+=1,u+=h,h*=1+a;if(g+=1,g%_t===0){const k=g/_t;s.push({month:k,cleanCumulative:l,debtCumulative:c,cleanMonthly:d,debtMonthly:p,debtFeatureCost:h}),d=0,p=0,r===null&&l>c&&(r=k)}}return{months:s,breakEvenMonth:r}}const Da=t=>_h({baseTime:Number(t["base-time"]),shortcutFactor:Number(t.shortcuts)/100,interestRate:Number(t.interest)/100,timeHorizon:Number(t.timeline)}),Ba=({months:t})=>`<div class="chart"><h4>Cumulative features</h4>${gr([{name:"Clean",className:"clean",values:t.map(e=>e.cleanCumulative)},{name:"Debt-driven",className:"debt",values:t.map(e=>e.debtCumulative)}],{x:"Months",y:"Features"})}</div>`,zh={name:"technical-debt",summary:"what shortcuts cost, compounded: two teams build the same features, one of them cutting corners",parameters:[{name:"base-time",label:"Base time",description:"days a feature takes when it is done properly",min:1,max:30,step:1,initial:20,show:t=>`${t} days`},{name:"shortcuts",label:"Shortcuts",description:"percent of that time a shortcut saves, at first",min:0,max:90,step:5,initial:25,show:t=>`${t}%`},{name:"interest",label:"Interest",description:"percent dearer every shortcut feature makes the next one",min:0,max:100,step:1,initial:10,show:t=>`${t}%`},{name:"timeline",label:"Timeline",description:"months to look ahead",min:6,max:60,step:1,initial:24,show:t=>`${t} months`}],run(t){const e=Number(t.shortcuts),n=Number(t.interest),a=Number(t.timeline),o=Da(t),{months:s,breakEvenMonth:r}=o,i=s[s.length-1],h=i?.cleanCumulative??0,l=i?.debtCumulative??0,c=h>0?(h-l)/h*100:0,d=Math.abs(c)<.1,p=d?"even":c>0?"loss":"gain",m=d?"≈0%":`${Math.abs(c).toFixed(1)}%`,u=r?`month ${r}`:"never",g=n===0?"With no interest there is no compound slowdown, and the shortcut simply wins. That is the one case that does not happen to real code.":r?`${e}% saved at first, ${n}% interest on every feature: clean development overtakes at month ${r}, and by month ${a} the shortcut road has delivered ${m} less.`:`${e}% saved at first, ${n}% interest on every feature: in ${a} months the clean road has not yet caught up. Give it longer, or raise the interest.`,k=[`<div class="clean"><strong>${h}</strong>clean features</div>`,`<div class="debt"><strong>${l}</strong>debt features</div>`,`<div><strong>${u}</strong>break-even</div>`,`<div><strong>${m}</strong>${p} on the shortcut road</div>`].join(""),w=Eo([{name:"Clean",className:"clean",values:s.slice(1).map(v=>v.cleanMonthly)},{name:"Debt-driven",className:"debt",values:s.slice(1).map(v=>v.debtMonthly)}],{x:"Months",y:"Features a month"});return{text:`clean ${h} features, debt-driven ${l}, break-even ${u}
${g}`,html:`<div class="figures">${k}</div><div class="charts">${Ba(o)}<div class="chart"><h4>Monthly delivery rate</h4>${w}</div></div><p>${g}</p>`,data:{cleanFeatures:h,debtFeatures:l,breakEvenMonth:r,months:s}}},glance:t=>Ba(Da(t))},Yh={name:"technical-debt",programs:[zh]},Gh="theme";function ts(){const t=document.documentElement,e=t.dataset.pageTheme;let n=null;try{n=localStorage.getItem(Gh)}catch{n=null}const a=e??(n==="light"||n==="dark"?n:null);a?t.dataset.theme=a:delete t.dataset.theme}const un="theme";function Uh(){return window.matchMedia("(prefers-color-scheme: dark)").matches}function Jh(){let t=null;try{t=localStorage.getItem(un)}catch{t=document.documentElement.dataset.theme??null}return t==="light"||t==="dark"?t:Uh()?"dark":"light"}class Kh{apply(e){const n=e==="toggle"?Jh()==="dark"?"light":"dark":e;try{n==="system"?localStorage.removeItem(un):localStorage.setItem(un,n)}catch{}return ts(),n}}function Vh(t){const e=document.querySelector(".theme-toggle");return e?(e.classList.add("ready"),e.removeAttribute("aria-hidden"),e.removeAttribute("tabindex"),e.addEventListener("click",t),()=>e.removeEventListener("click",t)):()=>{}}const mn=["light","dark","system"];function Xh(t){return mn.includes(t)}const Zh={light:"☀︎",dark:"☾︎",system:"◐︎"};function Ha(t){const e=n=>`${Zh[n]} ${n}`;return{text:`theme   ${mn.map(n=>n===t?`[${e(n)}]`:e(n)).join("   ")}`,html:`<pre class="choices">theme   ${mn.map(n=>n===t?`<strong aria-current="true">${e(n)}</strong>`:`<a href="#" data-run="theme ${n}" title="theme ${n}">${e(n)}</a>`).join("   ")}</pre>`}}function Qh(t){return{name:"theme",usage:"theme [light|dark|system|auto]",description:"switch the colours, or toggle them",run({site:e,cwd:n},[a]){const o=e.at(n)?.fields.theme;if(o)return{text:`theme: this page keeps its own, ${o}. It works everywhere else.`,error:!0};if(a===void 0)return Ha(t.apply("toggle"));const s=a==="auto"?"system":a;return Xh(s)?Ha(t.apply(s)):{text:`theme: ${a}: choose light, dark or system`,error:!0}}}}const el={name:"theme",commands:[Qh(new Kh)],install:t=>Vh(()=>t.run("theme")),arrive:()=>ts()},tl={small:"Intel Atom 330, 2 cores, 8 W · NVIDIA 9400M, 16 cores, 10 W",large:"Intel i7 950, 4 cores, 130 W · NVIDIA GT 430, 96 cores, 49 W"},Wa=[{machine:"small",algorithm:"pairs",vertices:8,graphs:150,serial:42.43,openmp:14.34,cuda:2.572},{machine:"small",algorithm:"pairs",vertices:16,graphs:150,serial:738.92,openmp:247.95,cuda:33.06},{machine:"small",algorithm:"pairs",vertices:24,graphs:150,serial:4387.13,openmp:1208.97,cuda:109.093},{machine:"large",algorithm:"pairs",vertices:8,graphs:150,serial:7.483,openmp:1.511,cuda:.653},{machine:"large",algorithm:"pairs",vertices:16,graphs:150,serial:135.505,openmp:25.061,cuda:5.24},{machine:"large",algorithm:"pairs",vertices:24,graphs:150,serial:515.757,openmp:126.228,cuda:18.99},{machine:"small",algorithm:"common-labelling",vertices:8,graphs:50,serial:843.21,openmp:214.51,cuda:33.404},{machine:"small",algorithm:"common-labelling",vertices:16,graphs:50,serial:17061.4,openmp:4284.01,cuda:550.153},{machine:"small",algorithm:"common-labelling",vertices:24,graphs:50,serial:71670.13,openmp:20274.32,cuda:2332.076}],nl={pairs:t=>`Matching every pair of ${t} graphs`,"common-labelling":t=>`Finding one labelling common to ${t} graphs`};function zt(t){if(t<10)return`${t.toFixed(1)} s`;if(t<60)return`${Math.round(t)} s`;const e=Math.floor(t/60);return e<60?e<10?`${e} min ${Math.round(t-e*60)} s`:`${Math.round(t/60)} min`:`${Math.floor(e/60)} h ${e%60} min`}const al=t=>`×${t>=10?Math.round(t):t.toFixed(1)}`;function qa(t){const e=Math.max(...t.map(o=>o.serial/o.cuda)),n=(o,s)=>`<span class="bar ${s}" style="--p:${(o/e).toFixed(3)}"></span><span class="factor">${al(o)}</span>`;return`<figure class="runs"><table class="runs"><thead><tr><th>each graph has</th><th>one thread</th><th>OpenMP, every core</th><th>CUDA, the graphics card</th></tr></thead>${[...new Set(t.map(o=>`${o.algorithm}/${o.machine}`))].map(o=>{const s=t.filter(l=>`${l.algorithm}/${l.machine}`===o),{algorithm:r,machine:i}=s[0],h=s.map(l=>`<tr><th scope="row">${l.vertices} vertices</th><td>${zt(l.serial)}</td><td>${zt(l.openmp)}<div class="speedup">${n(l.serial/l.openmp,"openmp")}</div></td><td>${zt(l.cuda)}<div class="speedup">${n(l.serial/l.cuda,"cuda")}</div></td></tr>`).join("");return`<tbody><tr class="group"><th colspan="4">${nl[r](s[0]?.graphs??0)}<span>${tl[i]}</span></th></tr>${h}</tbody>`}).join("")}</table><figcaption>Measured in 2011, on graphs of the GREC dataset. Each bar is how many times faster than one thread of the same machine, and all the bars are on one scale.</figcaption></figure>`}const ol={name:"thesis-results",stills:{"graph-matching-runs":()=>qa(Wa)},apps:{"graph-matching-runs":t=>{t.firstChild||(t.innerHTML=qa(Wa))}}},pn={variable:"tn",atLeast:!0,threshold:20,months:[0,1,2,3,4,5,6,7,8,9,10,11]};function sl(t,e){const n=t.map(({value:u})=>u),a=Math.floor(Math.min(...n,...(e.spans??[]).map(({value:u})=>u))),o=Math.ceil(Math.max(...n,a+1)),s=To(t.map(({year:u})=>u),a,o),{x:r,y:i,slot:h}=s,l=u=>r(u)+h/2,c=[];for(const u of t){const g=c[c.length-1];g&&g[g.length-1]?.year===u.year-1?g.push(u):c.push([u])}const d=c.map(u=>`<polyline class="line" points="${u.map(({year:g,value:k})=>`${D(l(g))},${D(i(k))}`).join(" ")}"/>`).join(""),p=t.map(({year:u,value:g,title:k,partial:w})=>`<circle class="dot${w?" partial":""}" cx="${D(l(u))}" cy="${D(i(g))}" r="3.5"><title>${k}</title></circle>`).join(""),m=s.levels(e.spans??[]);return s.wrap(e.label,`${d}${p}${m}`)}function rl(t,{threshold:e,atLeast:n},a){if(!t)return 0;const[o=0,...s]=t;return s.reduce((r,i,h)=>o+h*a>=e-1e-9===n?r+i:r,0)}const Se={tn:{code:1002,unit:"°C",name:"daily minimum",summary:"mean",bin:.5,range:[-30,35]},tx:{code:1001,unit:"°C",name:"daily maximum",summary:"mean",bin:.5,range:[-25,50]},pp:{code:1300,unit:"mm",name:"daily rain",summary:"sum",bin:.5,range:[0,250]},pi:{code:1303,unit:"mm/h",name:"most rain in one hour",summary:"max",bin:.5,range:[0,100]}},il=.95,hl=(t,e)=>new Date(Date.UTC(t,e+1,0)).getUTCDate(),oe=t=>t.reduce((e,n)=>e+n,0);function ll(t,e){return t.length===0?null:e==="sum"?oe(t.map(({figure:n})=>n)):e==="max"?Math.max(...t.map(({figure:n})=>n)):oe(t.map(({figure:n,weight:a})=>n*a))/oe(t.map(({weight:n})=>n))}function cl(t,e){const n=Se[e.variable];return Object.entries(t.years).flatMap(([a,o])=>{const s=o[e.variable];if(!s)return[];const r=Number(a),i=s.months.map(u=>({days:rl(u,e,n.bin),measured:oe(u?.slice(1)??[])})),h=u=>e.months.includes(u),l=oe(i.filter((u,g)=>h(g)).map(u=>u.measured)),c=oe(e.months.map(u=>hl(r,u))),d=oe(i.filter((u,g)=>h(g)).map(u=>u.days)),p=s.summaries.flatMap((u,g)=>h(g)&&u!==null?[{figure:u,weight:i[g]?.measured??0}]:[]),m=ll(p,n.summary);return[{year:r,days:d,elsewhere:oe(i.map(u=>u.days))-d,measured:l,expected:c,whole:l/c>=il,summary:m,months:i}]}).sort((a,o)=>a.year-o.year)}const _a=["January","February","March","April","May","June","July","August","September","October","November","December"];function za(t){const{name:e,unit:n}=Se[t.variable],a=t.variable==="pi"?"":"a ",o=t.atLeast?`of ${t.threshold} ${n} or more`:`below ${t.threshold} ${n}`,s=_a[t.months[0]??0],r=_a[t.months[t.months.length-1]??11],i=t.months.length===12?"whole year":`${s} to ${r}`;return`days with ${a}${e} ${o}, ${i}`}const ns=["January","February","March","April","May","June","July","August","September","October","November","December"],dl=.55;function ul(t,e,{days:n,measured:a}){const o=`${ns[e]} ${t}`;if(a===0)return`<td class="none" title="${o}: not measured"></td>`;const s=Math.round(n/a*1e3)/1e3;return`<td${s>=dl?' class="deep"':""} style="--v:${s}" title="${o}: ${n} of ${a} days">${n||""}</td>`}function ml(t,e){const n=`<tr><th></th>${ns.map(o=>`<th scope="col">${o.slice(0,3)}</th>`).join("")}</tr>`,a=[...t].reverse().map(({year:o,months:s})=>`<tr><th scope="row">${o}</th>${s.map((r,i)=>ul(o,i,r)).join("")}</tr>`);return`<table class="heat calendar${e?" warm":""}"><thead>${n}</thead><tbody>${a.join("")}</tbody></table>`}const Ya=t=>t.reduce((e,n)=>e+n,0)/t.length;function Ga(t){const e=t.flatMap(({summary:n})=>n===null?[]:[n]);return{from:t[0]?.year??0,to:t[t.length-1]?.year??0,years:t.length,days:Ya(t.map(({days:n})=>n)),summary:e.length?Ya(e):null}}function pl(t){const e=t.filter(a=>a.whole);if(e.length<4)return null;const n=Math.floor(e.length/2);return[Ga(e.slice(0,n)),Ga(e.slice(n))]}const fl=["January","February","March","April","May","June","July","August","September","October","November","December"],gl={mean:"The mean",sum:"The total",max:"The highest"},De=t=>String(Math.round(t*10)/10),wl=t=>`${t>0?"+":t<0?"−":""}${De(Math.abs(t))}`,yl=t=>`${Number(t.slice(8,10))} ${fl[Number(t.slice(5,7))-1]} ${t.slice(0,4)}`;function bl(t,e){const{unit:n,name:a}=Se[e.variable],o=Object.values(t.years).flatMap(i=>i[e.variable]?[i[e.variable].record]:[]),[s,r]=e.atLeast?o.map(([i,h])=>[i,h]).reduce((i,h)=>h[0]>i[0]?h:i):o.map(([,,i,h])=>[i,h]).reduce((i,h)=>h[0]<i[0]?h:i);return`<p class="record">The ${e.atLeast?"highest":"lowest"} ${a} on record here: ${s} ${n} on ${yl(r)}, whatever months are chosen.</p>`}function as(t,e){const n=Se[e.variable],a=`<figcaption><strong>${t.name}</strong> · ${t.altitude} m, ${t.setting} · ${za(e)}</figcaption>`,o=cl(t,e);if(o.length===0)return`<figure class="weather">${a}<p>This station has no ${n.name} on record.</p></figure>`;const s=pl(o),r=({from:u,to:g})=>`${u}–${g}`,i=s?'<div class="figures">'+s.map(u=>`<div><strong>${De(u.days)}</strong>days a year, ${r(u)}</div>`).join("")+`<div><strong>${wl(s[1].days-s[0].days)}</strong>days a year, from one half to the other</div></div>`:"",h=o.map(({year:u,days:g,elsewhere:k,measured:w,expected:v,whole:y})=>{const $=k>0?`, and ${k} more outside the months chosen`:"",I=y?"":`, with only ${w} of ${v} days measured`;return{year:u,value:g,partial:!y,title:`${u}: ${g} days${I}${$}`}}),l=(s??[]).map(u=>({from:u.from,to:u.to,value:u.days,label:`${De(u.days)} a year`})),c=o.flatMap(({year:u,summary:g,whole:k})=>g===null||!k?[]:[{year:u,value:g,title:`${u}: ${De(g)} ${n.unit}`}]),d=(s??[]).flatMap(u=>u.summary===null?[]:[{from:u.from,to:u.to,value:u.summary,label:`${De(u.summary)} ${n.unit}`}]),p=`${gl[n.summary]} ${n.name} of each year, ${n.unit}`,m=(n.summary==="mean"?sl:en)(c,{label:p,spans:d});return`<figure class="weather">${a}${i}<h4>Days a year</h4>${en(h,{label:`Days a year: ${za(e)}`,spans:l})}<h4>When in the year they fell</h4>${ml(o,e.atLeast&&n.unit==="°C")}<h4>${p}, in the months chosen</h4>${m}`+bl(t,e)+"</figure>"}const Ua=[{id:"tropical-nights",name:"tropical nights",variable:"tn",atLeast:!0,threshold:20},{id:"torrid-nights",name:"torrid nights",variable:"tn",atLeast:!0,threshold:25},{id:"hot-days",name:"hot days",variable:"tx",atLeast:!0,threshold:30},{id:"torrid-days",name:"torrid days",variable:"tx",atLeast:!0,threshold:35},{id:"frost-days",name:"frost days",variable:"tn",atLeast:!1,threshold:0},{id:"rainy-days",name:"rainy days",variable:"pp",atLeast:!0,threshold:1},{id:"heavy-rain",name:"days of heavy rain",variable:"pp",atLeast:!0,threshold:20},{id:"downpours",name:"days with a downpour",variable:"pi",atLeast:!0,threshold:10}],ye=[{code:"WU",name:"Badalona - Museu",municipality:"Badalona",altitude:42,setting:"urban, by the sea"},{code:"X4",name:"Barcelona - el Raval",municipality:"Barcelona",altitude:33,setting:"dense city, on a roof"},{code:"X8",name:"Barcelona - Zona Universitària",municipality:"Barcelona",altitude:82,setting:"city edge"},{code:"D5",name:"Barcelona - Observatori Fabra",municipality:"Barcelona",altitude:410,setting:"wooded hill above the city"},{code:"UP",name:"Cabrils",municipality:"Cabrils",altitude:81,setting:"coastal slope, half rural"},{code:"XF",name:"Sabadell - Parc Agrari",municipality:"Sabadell",altitude:259,setting:"farmland beside a city"},{code:"XJ",name:"Girona",municipality:"Girona",altitude:72,setting:"market gardens by the city"},{code:"XE",name:"Tarragona - Complex Educatiu",municipality:"Tarragona",altitude:6,setting:"coast"},{code:"VK",name:"Raimat",municipality:"Lleida",altitude:286,setting:"inland plain, vineyards"}],Ja=[["whole year",[0,1,2,3,4,5,6,7,8,9,10,11]],["June to August",[5,6,7]],["May to October",[4,5,6,7,8,9]],["December to February",[0,1,11]]],vl={tn:[-10,30],tx:[0,45],pp:[.5,100],pi:[.5,60]};function kl(t){const e=new Map,n=vn(t,"/data/weather/index.json"),a=f("div");a.append(...t.querySelectorAll("figure"));let o=null,s=pn,r=!1;const i=(w,v)=>f("option",{value:w},v),h=f("select",{onchange:()=>{g(h.value)}},...ye.map(({code:w,name:v})=>i(w,v))),l=f("select",{onchange:()=>{const w=Ua.find(({id:v})=>v===l.value);w&&u({variable:w.variable,atLeast:w.atLeast,threshold:w.threshold})}},...Ua.map(({id:w,name:v})=>i(w,v))),c=f("select",{onchange:()=>u({months:Ja[Number(c.value)]?.[1]??pn.months})},...Ja.map(([w],v)=>i(v,w))),d=f("output"),p=f("input",{type:"range",step:.5,oninput:()=>u({threshold:Number(p.value)})});function m(){const[w,v]=vl[s.variable];p.min=String(w),p.max=String(v),p.value=String(s.threshold),d.textContent=`${s.atLeast?"":"below "}${s.threshold} ${Se[s.variable].unit}${s.atLeast?" or more":""}`,o&&(a.innerHTML=as(o,s))}function u(w){s={...s,...w},m()}async function g(w){const v=e.get(w)??fetch(`/data/weather/${w}.json`).then(y=>y.json());e.set(w,v);try{const y=await v;if(r||h.value!==w)return;o=y,m()}catch{e.delete(w),a.replaceChildren(f("p",{},"The measurements for this station did not arrive. The rest of the page does not depend on them."))}}const k=f("div",{class:"dials"},f("label",{},"Station",h),f("label",{},"Counting",l),f("label",{},"Threshold: ",d,p),f("label",{},"Months",c));return t.replaceChildren(k,a,n),g(h.value),()=>{r=!0}}function xl(t,e,[n,a]){if(t.length===0)return null;const o=Math.round((a-n)/e),s=new Map;for(const l of t){const c=Math.min(o-1,Math.max(0,Math.floor((l-n)/e+1e-9)));s.set(c,(s.get(c)??0)+1)}const r=Math.min(...s.keys()),i=Math.max(...s.keys());return[Math.round((n+r*e)*1e3)/1e3,...Array.from({length:i-r+1},(l,c)=>s.get(r+c)??0)]}const Ka="7bvh-jvq2",os=5e4,Va=Object.entries(Se),$l="No representatiu",Tl=["Representatiu",""],Sl=(t,e)=>Math.round(t*10**e)/10**e;function Ml(t,e){if(t.length===0)return null;if(e==="max")return Math.max(...t);const n=t.reduce((a,o)=>a+o,0);return Sl(e==="sum"?n:n/t.length,2)}function Al(t,e){const n=Array.from({length:12},(s,r)=>t.filter(({date:i})=>Number(i.slice(5,7))===r+1).map(({value:i})=>i)),a=t.reduce((s,r)=>r.value>s.value?r:s),o=t.reduce((s,r)=>r.value<s.value?r:s);return{months:n.map(s=>xl(s,e.bin,e.range)),summaries:n.map(s=>Ml(s,e.summary)),record:[a.value,a.date,o.value,o.date]}}function Il(t){if(!Array.isArray(t))throw new Error("the portal did not answer with rows");if(t.length>=os)throw new Error("the answer was cut short at the limit");const e=t;if(!e.some(o=>o.data_lectura?.slice(5,7)==="12"))throw new Error("the year does not reach December yet");const n=new Map,a=new Set;for(const o of e){const s=o.estat??"";if(s===$l)continue;if(!Tl.includes(s))throw new Error(`the network marks days as "${s}", which nobody has decided how to read`);const r=o.data_lectura?.slice(0,10)??"",i=`${o.codi_estacio}/${o.codi_variable}`;if(a.has(`${i}/${r}`))throw new Error(`${i} has ${r} twice`);a.add(`${i}/${r}`);const h=Number(o.valor);Number.isFinite(h)&&n.set(i,[...n.get(i)??[],{date:r,value:h}])}return n}const El={name:"weather",directory:"public/data/weather",firstYear:1988,files:ye.map(t=>`${t.code}.json`),about:{measures:"daily minimum and maximum temperature, daily rain, most rain in one hour",network:"Xarxa d'Estacions Meteorològiques Automàtiques (XEMA)",attribution:"Servei Meteorològic de Catalunya (XEMA). Dades obertes de la Generalitat de Catalunya.",dataset:`https://analisi.transparenciacatalunya.cat/d/${Ka}`,stations:ye},requestsFor(t){const e=ye.map(a=>`'${a.code}'`).join(","),n=Va.map(([,a])=>a.code).join(",");return[Mo(Ka,{select:"codi_estacio,codi_variable,data_lectura,valor,estat",where:`codi_estacio in (${e}) and codi_variable in (${n}) and data_lectura between '${t}-01-01T00:00:00' and '${t}-12-31T23:59:59'`,limit:os})]},withYear(t,e,n){const a=Il(n[0]);return Object.fromEntries(ye.map(o=>{const s=`${o.code}.json`,r=Va.flatMap(([l,c])=>{const d=a.get(`${o.code}/${c.code}`);return d?[[l,Al(d,c)]]:[]}),i=Object.fromEntries(r),h={...t[s]?.years,...r.length?{[e]:i}:{}};return[s,{...o,years:h}]}))}},jl=t=>{const e=JSON.parse(t(`/data/weather/${ye[0]?.code}.json`)),n=JSON.parse(t("/data/weather/index.json"));return as(e,pn)+gt(n)},Cl={name:"weather",apps:{weather:kl},stills:{weather:jl},sources:[El]},In="header-world";function ss(){try{const t=localStorage.getItem(In);if(!t)return null;const e=JSON.parse(t);return[e.seed,e.levels,e.roughness,e.share].every(a=>typeof a=="number"&&Number.isFinite(a))?e:null}catch{return null}}function Ol(t){try{localStorage.setItem(In,JSON.stringify(t))}catch{}}function Pl(){try{localStorage.removeItem(In)}catch{}}const K=(1+Math.sqrt(5))/2,Nl=[[-1,K,0],[1,K,0],[-1,-K,0],[1,-K,0],[0,-1,K],[0,1,K],[0,-1,-K],[0,1,-K],[K,0,-1],[K,0,1],[-K,0,-1],[-K,0,1]],Ll=[[0,11,5],[0,5,1],[0,1,7],[0,7,10],[0,10,11],[1,5,9],[5,11,4],[11,10,2],[10,7,6],[7,1,8],[3,9,4],[3,4,2],[3,2,6],[3,6,8],[3,8,9],[4,9,5],[2,4,11],[6,2,10],[8,6,7],[9,8,1]];function Fl(){const t=Nl.map(([e,n,a])=>{const o=Math.hypot(e,n,a);return{direction:[e/o,n/o,a/o],radius:1,surface:0}});return rs(t,Ll.map(e=>[...e]))}const Rl=(t,e)=>(t+e)/2;function Dl(t,e,n=Rl){const a=Array.from({length:t.vertexCount},(i,h)=>({direction:[t.directions[h*3]??0,t.directions[h*3+1]??0,t.directions[h*3+2]??0],radius:t.radii[h]??1,surface:t.surface[h]??0})),o=new Map,s=(i,h)=>{const l=i<h?`${i}:${h}`:`${h}:${i}`,c=o.get(l);if(c!==void 0)return c;const d=a[i],p=a[h],[m,u,g]=d.direction,[k,w,v]=p.direction,y=Math.hypot(m*d.radius-k*p.radius,u*d.radius-w*p.radius,g*d.radius-v*p.radius),[$,I,M]=[(m+k)/2,(u+w)/2,(g+v)/2],b=Math.hypot($,I,M)||1,T=n(d.surface,p.surface);a.push({direction:[$/b,I/b,M/b],radius:(d.radius+p.radius)/2+e(y),surface:T});const C=a.length-1;return o.set(l,C),C},r=[];for(let i=0;i<t.faceCount;i+=1){const h=t.faces[i*3],l=t.faces[i*3+1],c=t.faces[i*3+2],d=s(h,l),p=s(l,c),m=s(c,h);r.push([h,d,m],[l,p,d],[c,m,p],[d,p,m])}return rs(a,r)}function rs(t,e){const n=new Float32Array(t.length*3),a=new Float32Array(t.length),o=new Float32Array(t.length);t.forEach((r,i)=>{n[i*3]=r.direction[0],n[i*3+1]=r.direction[1],n[i*3+2]=r.direction[2],a[i]=r.radius,o[i]=r.surface});const s=new Uint32Array(e.length*3);return e.forEach(([r,i,h],l)=>{s[l*3]=r,s[l*3+1]=i,s[l*3+2]=h}),{directions:n,radii:a,surface:o,faces:s,faceCount:e.length,vertexCount:t.length}}function Bl(t){const e=Fl();return{seed:t,mesh:e,temperature:new Float32Array(e.vertexCount),faceColour:new Uint8ClampedArray(e.faceCount*3),seaRadius:0}}function Hl(t,e){return{...t,mesh:e,temperature:new Float32Array(e.vertexCount),faceColour:new Uint8ClampedArray(e.faceCount*3)}}function Wl(t,e){return Math.abs(t.mesh.directions[e*3+1]??0)}function is(t,e,n){const a=t.mesh.faces[n*3]??0,o=t.mesh.faces[n*3+1]??0,s=t.mesh.faces[n*3+2]??0;return((e[a]??0)+(e[o]??0)+(e[s]??0))/3}function ql(t,e){return is(t,t.mesh.radii,e)}const hs=(t=4,e=.28,n=.2)=>a=>{const o=yt(a.seed);let s=a.mesh;const r=Float32Array.from(s.surface,()=>o());s={...s,surface:r};for(let i=0;i<t;i+=1)s=Dl(s,h=>h*e*(o()-.5),(h,l)=>{const c=.5+(o()-.5)*(h-l)*n;return Math.min(1,Math.max(0,h*(1-c)+l*c))});return Hl(a,s)},ls=({equator:t=1,pole:e=.05,peak:n=0}={})=>a=>{const o=new Float32Array(a.mesh.vertexCount),s=a.mesh.radii,r=s.reduce((l,c)=>Math.min(l,c),1/0),h=s.reduce((l,c)=>Math.max(l,c),-1/0)-r||1;for(let l=0;l<a.mesh.vertexCount;l+=1){const c=((s[l]??1)-r)/h,d=Wl(a,l)**2.2;o[l]=t+(e-t)*d+(n-t)*c}return{...a,temperature:o}},cs=(t=.55)=>e=>{const n=Float32Array.from(e.mesh.radii).sort(),a=Math.min(n.length-1,Math.floor(n.length*t)),o=n[a]??1,s=Float32Array.from(e.mesh.radii,r=>Math.max(r,o));return{...e,mesh:{...e.mesh,radii:s},seaRadius:o}},_l=[24,92,168],zl=[62,176,206],Yl=[214,196,138],Xa=[190,158,84],Yt=[70,138,66],Gl=[74,104,76],Ul=[136,128,116],Za=[238,243,247];function le(t,e,n){const a=Math.min(1,Math.max(0,n));return[t[0]+(e[0]-t[0])*a,t[1]+(e[1]-t[1])*a,t[2]+(e[2]-t[2])*a]}function Jl(t){return t>.78?Xa:t>.62?le(Yt,Xa,(t-.62)/.16):t>.3?Yt:le(Gl,Yt,(t-.12)*5.5)}const ds=t=>{const e=new Uint8ClampedArray(t.mesh.faceCount*3),n=t.mesh.radii.reduce((o,s)=>Math.max(o,s),-1/0),a=Math.max(1e-6,n-t.seaRadius);for(let o=0;o<t.mesh.faceCount;o+=1){const s=(ql(t,o)-t.seaRadius)/a,r=is(t,t.temperature,o);let i;s<=.002?(i=le(zl,_l,.55),r<.16&&(i=le(i,Za,(.16-r)*6))):(i=le(Yl,Jl(r),Math.min(1,s*9)),i=le(i,Ul,Math.max(0,s-.55)*2.2),r<.26&&(i=le(i,Za,(.26-r)*4))),e[o*3]=i[0],e[o*3+1]=i[1],e[o*3+2]=i[2]}return{...t,faceColour:e}},Kl=[hs(),cs(),ls(),ds];function Vl(t,e=Kl){return e.reduce((n,a)=>a(n),Bl(t))}function us(t){return Vl(t.seed,[hs(t.levels,t.roughness),cs(t.share),ls(),ds])}const Qa=.3,Xl=[-.5,.45,.74],Zl=1.02;class En{size;pixels;depth;view=new Float32Array(0);screen=new Float32Array(0);constructor(e,n=new Uint8ClampedArray(e*e*4)){if(n.length!==e*e*4)throw new Error(`SphereRaster: ${e}×${e} needs ${e*e*4} bytes, not ${n.length}`);this.size=e,this.pixels=n,this.depth=new Float32Array(e*e)}paint(e,n){const{size:a,pixels:o,depth:s}=this;o.fill(0),s.fill(-1/0);const[r,i,h]=Ql(n.light??Xl),l=n.tilt??-.38,c=Math.cos(l),d=Math.sin(l),p=Math.cos(n.rotation),m=Math.sin(n.rotation),{directions:u,radii:g,faces:k,faceCount:w,vertexCount:v}=e.mesh;let y=1;for(let b=0;b<v;b+=1){const T=g[b]??1;T>y&&(y=T)}const $=a/(2*y*Zl);this.view.length<v*3&&(this.view=new Float32Array(v*3),this.screen=new Float32Array(v*3));const I=this.view,M=this.screen;for(let b=0;b<v;b+=1){const T=g[b]??1,C=(u[b*3]??0)*T,P=(u[b*3+1]??0)*T,j=(u[b*3+2]??0)*T,A=C*p-j*m,O=C*m+j*p,x=P*c+O*d,E=-P*d+O*c;I[b*3]=A,I[b*3+1]=x,I[b*3+2]=E,M[b*3]=a/2+A*$,M[b*3+1]=a/2-x*$,M[b*3+2]=E}for(let b=0;b<w;b+=1){const T=k[b*3]??0,C=k[b*3+1]??0,P=k[b*3+2]??0,j=M[T*3],A=M[T*3+1],O=M[T*3+2],x=M[C*3],E=M[C*3+1],N=M[C*3+2],F=M[P*3],L=M[P*3+1],R=M[P*3+2],H=(x-j)*(L-A)-(E-A)*(F-j);if(H>=0)continue;const Me=I[T*3],Cn=I[T*3+1],On=I[T*3+2],Pn=I[C*3]-Me,Nn=I[C*3+1]-Cn,Ln=I[C*3+2]-On,Fn=I[P*3]-Me,Rn=I[P*3+1]-Cn,Dn=I[P*3+2]-On,Bn=Nn*Dn-Ln*Rn,Hn=Ln*Fn-Pn*Dn,Wn=Pn*Rn-Nn*Fn,vt=Math.hypot(Bn,Hn,Wn)||1,$s=Bn/vt*r+Hn/vt*i+Wn/vt*h,kt=Qa+(1-Qa)*Math.max(0,$s),Ts=(e.faceColour[b*3]??0)*kt,Ss=(e.faceColour[b*3+1]??0)*kt,Ms=(e.faceColour[b*3+2]??0)*kt,As=Math.max(0,Math.floor(Math.min(j,x,F))),Is=Math.min(a-1,Math.ceil(Math.max(j,x,F))),Es=Math.max(0,Math.floor(Math.min(A,E,L))),js=Math.min(a-1,Math.ceil(Math.max(A,E,L)));for(let qe=Es;qe<=js;qe+=1)for(let _e=As;_e<=Is;_e+=1){const xt=_e+.5,$t=qe+.5,Cs=(x-j)*($t-A)-(E-A)*(xt-j),qn=(F-x)*($t-E)-(L-E)*(xt-x),_n=(j-F)*($t-L)-(A-L)*(xt-F);if(Cs>0||qn>0||_n>0)continue;const zn=qn/H,Yn=_n/H,Gn=O*zn+N*Yn+R*(1-zn-Yn),ue=qe*a+_e;Gn<=s[ue]||(s[ue]=Gn,o[ue*4]=Ts,o[ue*4+1]=Ss,o[ue*4+2]=Ms,o[ue*4+3]=255)}}return o}}function Ql([t,e,n]){const a=Math.hypot(t,e,n)||1;return[t/a,e/a,n/a]}const ec=.2,tc=.36,nc=[{upTo:20,dark:4,bright:12},{upTo:70,dark:6,bright:14},{upTo:160,dark:2,bright:10},{upTo:198,dark:3,bright:11},{upTo:275,dark:1,bright:9},{upTo:330,dark:5,bright:13},{upTo:360,dark:4,bright:12}];function ac(t,e,n){const a=Math.max(t,e,n),o=Math.min(t,e,n),s=(a+o)/2/255;if((a===0?0:(a-o)/a)<ec)return s<.08?0:s<.5?8:s<.8?7:15;const i=a-o;let h;a===t?h=(e-n)/i*60:a===e?h=(2+(n-t)/i)*60:h=(4+(t-e)/i)*60,h<0&&(h+=360);const l=nc.find(({upTo:c})=>h<c)??{dark:4,bright:12};return s<.08?0:s>=tc?l.bright:l.dark}function oc(t,e){const n=(o,s)=>{const r=(s*e+o)*4;return(t[r+3]??0)===0?-1:ac(t[r]??0,t[r+1]??0,t[r+2]??0)},a=[];for(let o=0;o<e/2;o+=1){const s=[];for(let r=0;r<e;r+=1)s.push({top:n(r,o*2),bottom:n(r,o*2+1)});a.push(s)}return a}const Pe=["#000000","#0000aa","#00aa00","#00aaaa","#aa0000","#aa00aa","#aa5500","#aaaaaa","#555555","#5555ff","#55ff55","#55ffff","#ff5555","#ff55ff","#ffff55","#ffffff"];function sc(t){const e=({top:n,bottom:a})=>n<0&&a<0?"<span> </span>":n<0?`<span style="color:${Pe[a]}">▄</span>`:a<0?`<span style="color:${Pe[n]}">▀</span>`:n===a?`<span style="color:${Pe[n]}">█</span>`:`<span style="color:${Pe[n]};background:${Pe[a]}">▀</span>`;return t.map(n=>n.map(e).join("")).join(`
`)}const fn={levels:4,roughness:.28,share:.55},Ne=32;let Gt=null,eo=null,Ut=null;function to(t,e){const n=document.querySelector('link[rel="icon"]');if(!n)return;Gt??=Object.assign(document.createElement("canvas"),{width:Ne,height:Ne});const a=Gt.getContext("2d");a&&(Ut??=a.createImageData(Ne,Ne),eo??=new En(Ne,Ut.data),eo.paint(t,{rotation:e}),a.putImageData(Ut,0,0),n.type="image/png",n.href=Gt.toDataURL("image/png"))}const rc=90,ic=1e3/12,hc=400,Jt=new WeakMap;function lc(t){const e=(t.textContent??"").split(`
`);return{columns:Math.max(...e.map(n=>n.length)),rows:e.length}}function gn(t,e){Jt.get(t)?.();const n=e??{...fn,seed:Math.floor(Math.random()*16777215)},{columns:a,rows:o}=lc(t),s=Math.min(a,o*2),r=us(n),i=new En(s);t.dataset.seed=String(n.seed),t.title=`World ${n.seed}, ${r.mesh.faceCount.toLocaleString("en")} triangles`;const h=k=>{t.innerHTML=sc(oc(i.paint(r,{rotation:k}),s)),t.classList.add("grown")};if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return h(.6),to(r,.6),Jt.set(t,()=>{}),()=>{};let l=0,c=-1/0,d=-1/0;const p=performance.now(),m=$n(t),u=k=>{const w=(k-p)/1e3/rc*Math.PI*2;m.onScreen()&&k-c>=ic&&(h(w),c=k),k-d>hc&&(to(r,w),d=k),l=requestAnimationFrame(u)};l=requestAnimationFrame(u);const g=()=>{cancelAnimationFrame(l),m.stop()};return Jt.set(t,g),g}function cc(){const t=document.querySelector(".planet");return t?gn(t,ss()??void 0):()=>{}}const fe=360,dc=60,uc=1.4,no=Math.PI*2/dc,ao=Math.PI*4;function mc(t){const e=f("canvas",{class:"world",width:fe,height:fe}),n=e.getContext("2d");if(!n)return()=>{};const a={...fn,seed:Math.floor(Math.random()*16777215)},o=n.createImageData(fe,fe),s=new En(fe,o.data),r=window.matchMedia("(prefers-reduced-motion: reduce)").matches;let i,h=.6,l=-.38,c=!r,d=null,p=0,m=performance.now();const u=f("p",{class:"hint"}),g=document.querySelector(".planet"),k=(20*4**fn.levels).toLocaleString("en"),w=()=>{i=us(a);const A=ss();u.textContent=`World ${a.seed}: ${i.mesh.faceCount.toLocaleString("en")} triangles. `+(A?`The header is keeping world ${A.seed}, ${(20*4**A.levels).toLocaleString("en")} triangles.`:`The header grows a new one every visit, ${k} triangles each.`),y.hidden=!A,$()},v=f("button",{type:"button",onclick:()=>{Ol({...a}),g&&gn(g,{...a}),w()}},"Put it in the header"),y=f("button",{type:"button",hidden:!0,onclick:()=>{Pl(),g&&gn(g),w()}},"Let the header grow its own"),$=()=>{s.paint(i,{rotation:h,tilt:l}),n.putImageData(o,0,0)};let I=0;const M=$n(e),b=A=>{const O=Math.min(.1,(A-m)/1e3);if(!d&&M.onScreen()){if(p!==0){p*=Math.exp(-O/uc);const x=c?no:0;(Math.abs(p)<=x||Math.abs(p)<.01)&&(p=0)}p!==0?(h-=p*O,$()):c&&(h+=no*O,$()),dn.send({byRadians:p*O,tiltedBy:0,seconds:O})}m=A,I=requestAnimationFrame(b)};e.addEventListener("pointerdown",A=>{d={x:A.clientX,y:A.clientY,at:A.timeStamp},p=0,e.setPointerCapture(A.pointerId)}),e.addEventListener("pointermove",A=>{if(!d)return;const O=e.clientWidth||fe,x=(A.clientX-d.x)/O*Math.PI;h-=x;const E=l;l=Math.max(-1.2,Math.min(1.2,l-(A.clientY-d.y)/O*Math.PI)),dn.send({byRadians:x,tiltedBy:l-E,seconds:0});const N=Math.max(.004,(A.timeStamp-d.at)/1e3);p=Math.max(-ao,Math.min(ao,p*.4+x/N*.6)),d={x:A.clientX,y:A.clientY,at:A.timeStamp},$()}),e.addEventListener("pointerup",A=>{d&&A.timeStamp-d.at>120&&(p=0),d=null,m=performance.now()}),e.addEventListener("pointercancel",()=>{d=null,p=0});const T=f("input",{type:"number",min:0,value:a.seed,onchange:()=>{a.seed=Math.max(0,Math.floor(Number(T.value)||0)),w()}}),C=f("button",{type:"button",onclick:()=>{a.seed=Math.floor(Math.random()*16777215),T.value=String(a.seed),w()}},"Another world"),P=f("button",{type:"button",onclick:()=>{c=!c,P.textContent=c?"Hold still":"Turn"}},c?"Hold still":"Turn"),j=(A,O,x,E,N,F)=>{const L=f("output",{},F(a[A])),R=f("input",{type:"range",min:x,max:E,step:N,value:a[A],onchange:()=>{a[A]=Number(R.value),L.textContent=F(a[A]),w()},oninput:()=>{L.textContent=F(Number(R.value))}});return f("label",{},`${O}: `,L,R)};return t.append(e,f("div",{class:"row"},f("span",{},"Seed "),T,C,P,v,y),f("div",{class:"dials"},j("levels","Detail",2,6,1,A=>`${A} splits`),j("roughness","Roughness",.02,1,.01,A=>A.toFixed(2)),j("share","Sea",0,.98,.01,A=>`${Math.round(A*100)}%`)),u),w(),I=requestAnimationFrame(b),()=>{cancelAnimationFrame(I),M.stop()}}const pc={name:"world",apps:{worlds:mc},install:()=>cc()},he=[pc,el,qh,Yh,vr,Ei,fr,Cl,Vi,Fh,eh,ol,Us,wh,wi,Pi,Wi,Vr,Hr,th];function fc(t){return Object.assign({},...t.flatMap(e=>e.programs??[]).map(e=>({[e.name]:Qo(e)})),...t.map(e=>e.apps??{}))}const Kt="flags";class gc{on;constructor(){let e=document.documentElement.dataset.flags??"";try{e=localStorage.getItem(Kt)??""}catch{}this.on=new Set(e.split(" ").filter(Boolean))}isOn(e){return this.on.has(e)}set(e,n){n?this.on.add(e):this.on.delete(e);const a=[...this.on].join(" ");try{a?localStorage.setItem(Kt,a):localStorage.removeItem(Kt)}catch{}a?document.documentElement.dataset.flags=a:delete document.documentElement.dataset.flags}}function wc(){return[document,navigator].map(e=>e.modelContext).find(e=>typeof e?.registerTool=="function")}function oo(t,e){const n=[];for(const a of document.querySelectorAll(".app[data-app]")){const o=t[a.dataset.app??""]?.(a,e);o&&n.push(o)}return()=>{for(const a of n)a()}}function yc(t){const e={},n=t.fields.theme;(n==="dark"||n==="light")&&(e["data-page-theme"]=n);const a=t.fields.sky;return a&&(e["data-sky"]=a),e}const bc=["data-page-theme","data-sky"];function vc(t,e){return e==="/"?t==="/":t.startsWith(e)}const ms=7.8,so=17,ps=12,kc=8,Vt=28,ro=44,He=8,xc=40,$c=16;function Tc(t){const e=new Map;for(const y of t.nodes){const $=y.label.split(`
`),I=Math.max(...$.map(M=>M.length),1);e.set(y.id,{id:y.id,label:y.label,real:!0,rank:-1,along:Math.max(40,I*ms+ps*2),across:$.length*so+kc*2,pos:0,preds:[],succs:[]})}for(const y of t.edges)if(!e.has(y.from)||!e.has(y.to))throw new Error(`flow: edge ${y.from} --> ${y.to} names a node that is not there`);const n=Sc(t),a={...t,edges:t.edges.map((y,$)=>n.has($)?{...y,from:y.to,to:y.from}:y)};for(const y of a.edges){const $=e.get(y.from),I=e.get(y.to);$.succs.push(I),I.preds.push($)}Mc(e);const o=Ac(e,a),s=Ic(e);Ec(s);const r=s.length,i=s.map(y=>Math.max(so,...y.map($=>$.real?$.across:0))),h=[];let l=He;for(let y=0;y<r;y+=1)h.push(l),l+=(i[y]??0)+ro;const c=y=>(h[y.rank]??0)+((i[y.rank]??0)-(y.real?y.across:0))/2,d=Math.max(...[...e.values()].map(y=>y.pos+y.along))+He,p=l-ro+He,m=t.direction==="LR",u=(y,$)=>m?[$,y]:[y,$],g=[...e.values()].filter(y=>y.real).map(y=>{const[$,I]=u(y.pos,c(y));return{id:y.id,label:y.label,x:$,y:I,width:m?y.across:y.along,height:m?y.along:y.across}}),k=t.edges.map((y,$)=>{const I=o[$]??[],M=I[0],b=I[I.length-1];if(!M||!b)throw new Error("flow: an edge lost its ends");const T=t.edges.some(O=>O.from===y.to&&O.to===y.from),C=Math.min(xc,M.along/3,b.along/3),P=T?n.has($)?C:-C:0,j=[u(M.pos+M.along/2+P,c(M)+M.across),...I.slice(1,-1).map(O=>u(O.pos+O.along/2,c(O)+(i[O.rank]??0)/2)),u(b.pos+b.along/2+P,c(b))],A=n.has($)?j.reverse():j;return y.label===void 0?{from:y.from,to:y.to,points:A}:{from:y.from,to:y.to,label:y.label,points:A}}),[w,v]=u(d,p);return{direction:t.direction,width:w,height:v,nodes:g,edges:k}}function Sc(t){const e=new Set,n=new Map,a=o=>{n.set(o,"walking"),t.edges.forEach((s,r)=>{s.from!==o||e.has(r)||(n.get(s.to)==="walking"?e.add(r):n.has(s.to)||a(s.to))}),n.set(o,"done")};for(const o of t.nodes)n.has(o.id)||a(o.id);return e}function Mc(t){const e=new Set,n=a=>{if(a.rank>=0)return a.rank;if(e.has(a))throw new Error(`flow: there is a cycle through ${a.id}, and a flow has a direction`);return e.add(a),a.rank=a.preds.length===0?0:Math.max(...a.preds.map(n))+1,e.delete(a),a.rank};for(const a of t.values())n(a)}function Ac(t,e){let n=0;return e.edges.map(a=>{const o=t.get(a.from),s=t.get(a.to);if(!o||!s)return[];const r=[o];let i=o;for(let h=o.rank+1;h<s.rank;h+=1){n+=1;const l={id:`\0${n}`,label:"",real:!1,rank:h,along:Math.max($c,(a.label?.length??0)*ms+ps),across:0,pos:0,preds:[i],succs:[]};t.set(l.id,l),i.succs.push(l),r.push(l),i=l}return i!==o&&(i.succs.push(s),s.preds.push(i),o.succs.splice(o.succs.indexOf(s),1),s.preds.splice(s.preds.indexOf(o),1)),r.push(s),r})}function Ic(t){const e=Math.max(...[...t.values()].map(r=>r.rank))+1,n=Array.from({length:e},()=>[]);for(const r of t.values())n[r.rank]?.push(r);const a=new Map,o=r=>r.forEach((i,h)=>a.set(i,h));n.forEach(o);const s=(r,i)=>i.length===0?a.get(r)??0:i.reduce((h,l)=>h+(a.get(l)??0),0)/i.length;for(let r=0;r<4;r+=1){for(let i=1;i<e;i+=1){const h=n[i]??[];h.sort((l,c)=>s(l,l.preds)-s(c,c.preds)),o(h)}for(let i=e-2;i>=0;i-=1){const h=n[i]??[];h.sort((l,c)=>s(l,l.succs)-s(c,c.succs)),o(h)}}return n}function Ec(t){const e=r=>r.reduce((i,h)=>i+h.along,0)+Vt*Math.max(0,r.length-1),n=Math.max(...t.map(e));for(const r of t){let i=He+(n-e(r))/2;for(const h of r)h.pos=i,i+=h.along+Vt}const a=r=>r.pos+r.along/2,o=(r,i)=>{const h=r.map(d=>{const p=i(d);return p.length===0?a(d):p.reduce((m,u)=>m+a(u),0)/p.length});let l=-1/0;r.forEach((d,p)=>{d.pos=Math.max((h[p]??0)-d.along/2,l),l=d.pos+d.along+Vt});const c=r.reduce((d,p,m)=>d+a(p)-(h[m]??0),0)/Math.max(1,r.length);for(const d of r)d.pos-=c};for(let r=0;r<3;r+=1){for(let i=1;i<t.length;i+=1)o(t[i]??[],h=>h.preds);for(let i=t.length-2;i>=0;i-=1)o(t[i]??[],h=>h.succs)}const s=Math.min(...t.flat().map(r=>r.pos));for(const r of t.flat())r.pos+=He-s}const wn=/(\w[\w.-]*)(?:\[([^\]]*)\])?/,jc=new RegExp(`^${wn.source}\\s*-->(?:\\|([^|]*)\\|)?\\s*${wn.source}$`),Cc=new RegExp(`^${wn.source}$`),Oc=/^(?:flow\s+)?(TD|LR)$/i;function Pc(t){const e=new Map,n=[];let a="TD";const o=(i,h)=>{i&&(e.has(i)||e.set(i,i),h!==void 0&&e.set(i,h.replace(/\\n/g,`
`)))},s=t.split(`
`);let r=!0;return s.forEach((i,h)=>{const l=i.trim();if(l===""||l.startsWith("%"))return;if(r){r=!1;const p=Oc.exec(l);if(p){a=p[1]?.toUpperCase()==="LR"?"LR":"TD";return}}const c=jc.exec(l);if(c){const[,p,m,u,g,k]=c;o(p,m),o(g,k),n.push(u===void 0?{from:p??"",to:g??""}:{from:p??"",to:g??"",label:u});return}const d=Cc.exec(l);if(d){o(d[1],d[2]);return}throw new Error(`flow: cannot read line ${h+1}: "${l}"`)}),{direction:a,nodes:[...e].map(([i,h])=>({id:i,label:h})),edges:n}}const Nc=20,io=17;function Lc(t){let e=5381;for(let n=0;n<t.length;n+=1)e=(e*33^t.charCodeAt(n))>>>0;return e.toString(36)}const W=t=>String(Math.round(t*10)/10);function Fc(t,e){const[n,...a]=t.points;if(!n)return"";let o=`M${W(n[0])},${W(n[1])}`,s=n;for(const r of a){const[i,h]=s,[l,c]=r,d=e?[(i+l)/2,h]:[i,(h+c)/2],p=e?[(i+l)/2,c]:[l,(h+c)/2];o+=` C${W(d[0])},${W(d[1])} ${W(p[0])},${W(p[1])} ${W(l)},${W(c)}`,s=r}return o}function Rc(t){const{points:e}=t,n=e[Math.floor((e.length-1)/2)]??[0,0],a=e[Math.ceil((e.length-1)/2)]??n;return[(n[0]+a[0])/2,(n[1]+a[1])/2]}function Dc(t){const e=Tc(Pc(t)),n=e.direction==="LR",a=`arrow-${Lc(t)}`,o=e.edges.map(h=>{const l=`<path class="edge" d="${Fc(h,n)}" marker-end="url(#${a})"/>`;if(h.label===void 0)return l;const[c,d]=Rc(h);return`${l}<text class="edge-label" x="${W(c)}" y="${W(d)}" text-anchor="middle" dominant-baseline="middle">${S(h.label)}</text>`}).join(""),s=e.nodes.map(h=>{const l=h.x+h.width/2,c=h.label.split(`
`),d=h.y+(h.height-c.length*io)/2,p=c.map((m,u)=>`<tspan x="${W(l)}" y="${W(d+Nc-8+u*io)}">${S(m)}</tspan>`).join("");return`<g class="node"><rect x="${W(h.x)}" y="${W(h.y)}" width="${W(h.width)}" height="${W(h.height)}" rx="4"/><text text-anchor="middle" dominant-baseline="middle">${p}</text></g>`}).join(""),r=W(e.width),i=W(e.height);return`<figure class="flow"><svg class="flow" viewBox="0 0 ${r} ${i}" width="${r}" height="${i}" style="max-width: 100%; height: auto" role="img"><defs><marker id="${a}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z"/></marker></defs>${o}${s}</svg></figure>`}const Le={">=":"≥","<=":"≤","!=":"≠","->":"→","...":"…","*":"·",star:"∗","-":"−","'":"′",cdot:"·",inf:"∞",alpha:"α",beta:"β",gamma:"γ",delta:"δ",epsilon:"ε",lambda:"λ",mu:"μ",pi:"π",sigma:"σ",tau:"τ",phi:"φ",omega:"ω",Delta:"Δ",Sigma:"Σ"},ho={sum:"∑",prod:"∏",int:"∫"},Bc=new Set(["max","min","lim","log","ln","sin","cos","exp","arg"]);function Hc(t){const e=[],n=/\s+|\.\.\.|>=|<=|!=|->|\d+(?:\.\d+)?|[A-Za-z]+|[{}]|[_^]|./g;for(const[a]of t.matchAll(n))/^\s+$/.test(a)||(a==="{"||a==="}"?e.push({kind:"brace",text:a}):a==="_"||a==="^"?e.push({kind:"script",text:a}):/^\d/.test(a)?e.push({kind:"number",text:a}):/^[A-Za-z]/.test(a)?e.push({kind:"name",text:a}):e.push({kind:"sign",text:a}));return e}function Wc(t){return t.split(`
`).map(e=>e.trim()).filter(Boolean).map(e=>`<math display="block"><mrow>${new qc(Hc(e)).expression()}</mrow></math>`).join("")}class qc{constructor(e){this.tokens=e}tokens;at=0;limits=!1;expression(){let e="";for(;this.at<this.tokens.length&&this.peek()?.text!=="}"&&this.peek()?.text!==")";)e+=this.item();return e}item(){let e=this.atom();const n=this.limits;this.limits=!1;let a=null,o=null;for(;this.peek()?.kind==="script";){const r=this.next().text,i=`<mrow>${this.group()}</mrow>`;r==="_"?a=i:o=i}const s=a&&o?n?"munderover":"msubsup":a?n?"munder":"msub":n?"mover":"msup";return!a&&!o?e:`<${s}>${e}${a??""}${o??""}</${s}>`}atom(){const e=this.next();if(e.kind==="brace"&&e.text==="{"){const n=this.expression();return this.expect("}"),`<mrow>${n}</mrow>`}if(e.text==="("){const n=this.expression();return this.peek()?.text===")"&&(this.at+=1),`<mrow><mo>(</mo>${n}<mo>)</mo></mrow>`}return e.kind==="number"?`<mn>${e.text}</mn>`:e.kind==="name"?e.text==="frac"?`<mfrac><mrow>${this.group()}</mrow><mrow>${this.group()}</mrow></mfrac>`:e.text==="sqrt"?`<msqrt>${this.group()}</msqrt>`:e.text==="text"?`<mtext>${S(this.phrase())}</mtext>`:e.text in ho?(this.limits=!0,`<mo>${ho[e.text]}</mo>`):Bc.has(e.text)?`<mo>${e.text}</mo>`:e.text in Le?/^[α-ωΑ-Ω]$/.test(Le[e.text])?`<mi>${Le[e.text]}</mi>`:`<mo>${Le[e.text]}</mo>`:`<mi>${S(e.text)}</mi>`:`<mo>${S(Le[e.text]??e.text)}</mo>`}group(){if(this.peek()?.text==="{"){this.next();const e=this.expression();return this.expect("}"),e}return this.atom()}phrase(){this.expect("{");const e=[];for(;this.at<this.tokens.length&&this.peek()?.text!=="}";)e.push(this.next().text);return this.expect("}"),e.join(" ")}peek(){return this.tokens[this.at]}next(){const e=this.tokens[this.at];if(!e)throw new Error("the formula ends early");return this.at+=1,e}expect(e){if(this.peek()?.text!==e)throw new Error(`expected ${e} in the formula`);this.at+=1}}function _c(t,e){const a=/^https?:/.test(e)?' target="_blank" rel="noopener noreferrer"':"";return`<a href="${S(e)}"${a}>${t}</a>`}const zc=["large","wide","card"];function Yc(t,e,n){const a=n&&zc.includes(n)?` class="${n}"`:"",o=n==="card"?' loading="lazy"':"";return`<img src="${S(e)}" alt="${S(t)}"${a}${o}>`}const Gc=/(`[^`]+`|!\[[^\]]*\]\([^)\s]+(?:\s+"[^"]*")?\)|\[[^\]]+\]\([^)\s]+\))/g,Uc=/^!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)$/,Jc=/^\[([^\]]+)\]\(([^)\s]+)\)$/;function fs(t){return t.split(Gc).map(e=>{if(e.startsWith("`")&&e.endsWith("`")&&e.length>1)return`<code>${S(e.slice(1,-1))}</code>`;const n=Uc.exec(e);if(n)return Yc(n[1]??"",n[2]??"",n[3]);const a=Jc.exec(e);return a?_c(fs(a[1]??""),a[2]??""):S(e)}).join("")}function Kc(t){const e=[];return t.replace(/<code>[\s\S]*?<\/code>/g,a=>`\0${e.push(a)-1}\0`).replace(/\*\*([^*]+)\*\*/g,"<strong>$1</strong>").replace(/(^|[^*])\*([^*]+)\*/g,"$1<em>$2</em>").replace(/ {2,}\n/g,"<br>").replace(/\n/g," ").replace(/ -- /g," — ").replace(/\u0000(\d+)\u0000/g,(a,o)=>e[Number(o)]??"")}function ne(t){return Kc(fs(t))}function Vc(t){const e=t.split(`
`).map(m=>m.trim()).filter(Boolean),n=e.find(m=>!m.includes(" :: ")),a=e.filter(m=>m.includes(" :: ")).map(m=>{const u=m.indexOf(" :: ");return{left:m.slice(0,u).trim(),right:m.slice(u+4).trim()}}),o=a.filter(({left:m})=>m.startsWith("=")).map(({left:m,right:u})=>({value:Number(m.slice(1)),name:u})),s=a.filter(({left:m})=>!m.startsWith("=")).map(({left:m,right:u})=>{const[g="",k]=u.split("|").map(v=>v.trim()),w=Number(g.replace(/!$/,"").trim());return{label:m,value:w,shown:k??String(w),marked:g.endsWith("!")}}),r=Math.max(0,...s.map(({value:m})=>m),...o.map(({value:m})=>m))||1,i=m=>(Math.max(0,m)/r).toFixed(3),h=o[0],l=s.map(({label:m,value:u,shown:g,marked:k})=>`<tr${k?' class="marked"':""}><th scope="row">${ne(m)}</th><td><span class="bar" style="--p:${i(u)}"></span><span class="value">${S(g)}</span></td></tr>`).join(""),c=h?` style="--rule:${i(h.value)}"`:"",d=h?` The line is ${S(h.name)}, at ${h.value}.`:"",p=n||h?`<figcaption>${n?ne(n)+".":""}${d}</figcaption>`:"";return`<figure class="bars"><table${c}${h?' class="ruled"':""}><tbody>${l}</tbody></table>${p}</figure>`}const lo=/^(?:[-*]|\d+\.)\s/;function Xc(t,e,n){if(!lo.test(t[0]??""))return!1;const a=e.slice(n).find(o=>o.trim()!=="");return a!==void 0&&lo.test(a)}function Zc(t){const e=[],n=t.replace(/\r\n?/g,`
`).split(`
`);let a=[],o=!1;return n.forEach((s,r)=>{if(s.startsWith("```")){o=!o,a.push(s),o||(e.push(a),a=[]);return}if(!o&&s.trim()===""){if(Xc(a,n,r+1))return;a.length&&e.push(a),a=[];return}a.push(s)}),a.length&&e.push(a),e}function Qc(t){return t.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}function ed(t){const e=/^(#{1,4})\s+(.*)$/.exec(t[0]??"");if(!e||!t.slice(0,-1).every(s=>/ {2,}$/.test(s)))return null;const a=e[1]?.length??1,o=[e[2]??"",...t.slice(1)].join(`
`);return`<h${a} id="${Qc(o)}">${ne(o)}</h${a}>`}function td(t){if(!t[0]?.startsWith("```"))return null;const e=t[0].slice(3).trim(),n=t.slice(1,-1).join(`
`);return e==="flow"?Dc(n):e==="bars"?Vc(n):e==="math"?Wc(n):`<pre><code>${sn(n,e)}</code></pre>`}function nd(t,e){const n=[];for(const a of t)e.test(a)?n.push(a.replace(e,"")):n.length&&(n[n.length-1]+=`
${a.trim()}`);return n}function ad(t){const e=t[0]??"",n=/^\d+\.\s/.test(e),a=/^[-*]\s/.test(e);if(!n&&!a)return null;const o=n?/^\d+\.\s+/:/^[-*]\s+/;if(!t.every(i=>o.test(i)||/^\s/.test(i)))return null;const s=n?"ol":"ul",r=nd(t,o).map(i=>`<li>${ne(i)}</li>`).join("");return`<${s}>${r}</${s}>`}function od(t){return t.every(n=>n.includes(" :: "))?`<dl>${t.map(n=>{const a=n.indexOf(" :: ");return[n.slice(0,a),n.slice(a+4)]}).map(([n,a])=>`<dt>${ne(n)}</dt><dd>${ne(a)}</dd>`).join("")}</dl>`:null}function sd(t){if(!t.every(n=>n.startsWith(">")))return null;const e=t.map(n=>n.replace(/^>\s?/,"")).join(" ");return`<blockquote>${ne(e)}</blockquote>`}function rd(t){const e=/^::([a-z0-9-]+)((?:\s+--[a-z0-9-]+)*)$/.exec(t[0]??"");if(!e||t.length!==1)return null;const n=(e[2]??"").split(/\s+/).filter(Boolean).map(a=>a.slice(2));return`<div class="app" data-app="${e[1]}"${n.length?` data-dials="${n.join(" ")}"`:""}></div>`}function id(t){return t.length===1&&/^-{3,}$/.test(t[0]??"")?"<hr>":null}function hd(t){const e=t.length===1&&/^(\\+)$/.exec(t[0]??"");return e?`<div class="space" style="--n:${e[1]?.length??1}"></div>`:null}function ld(t){return t.length===1&&/^!\[[^\]]*\]\([^)\s]+(?:\s+"[^"]*")?\)$/.test(t[0]??"")?`<figure>${ne(t[0]??"")}</figure>`:null}function cd(t){return`<p>${ne(t.join(`
`))}</p>`}const dd=[id,hd,ed,td,sd,rd,ld,od,ad];function gs(t){return Zc(t).map(e=>{for(const n of dd){const a=n(e);if(a!==null)return a}return cd(e)}).join(`
`)}function jn(t){return t==="/"?"~":`~${t.replace(/\/$/,"")}`}function ws(t,e){return`<p class="ran"><span class="ps1">${S(t)} $</span> ${S(e)}</p>`}function ud(t,e){const n=t.childrenOf(e.route);if(n.length===0)return"";const a=n.map(o=>`<li><a class="entry" href="${o.route}"><code>${S(o.name)}${o.link?"@":"/"}</code><span class="title">${S(o.title)}</span>`+(o.summary?`<span class="summary">${S(o.summary)}</span>`:"")+"</a></li>").join("");return`${ws(jn(e.route),"ls")}
<ul class="listing">${a}</ul>`}function md(t,e){const n=t.trailTo(e.route).slice(1).map(a=>a.name).join("/");return ws("~",n?`cd ${n} && cat README.md`:"cat README.md")}function pd(t,e){return`${md(t,e)}
${gs(e.body)}
${ud(t,e)}`}function fd(t,e){const n=document.querySelector("main");if(!n)return()=>!1;const a=(o,{push:s=!0,keep:r=!1}={})=>{const i=t.at(o);if(!i)return!1;r||(n.innerHTML=pd(t,i));const h=yc(i);for(const l of bc){const c=h[l];c?document.documentElement.setAttribute(l,c):document.documentElement.removeAttribute(l)}document.title=i.route==="/"?"David Rodenas":`${i.title} — David Rodenas`;for(const l of document.querySelectorAll("nav .navlink"))vc(o,l.getAttribute("href")??"\0")?l.setAttribute("aria-current","page"):l.removeAttribute("aria-current");return s&&(o===window.location.pathname?window.history.replaceState({route:o},"",o):window.history.pushState({route:o},"",o),r||window.scrollTo({top:0})),window.goatcounter?.count?.({path:o,title:document.title}),e(i,r),!0};return document.addEventListener("click",o=>{if(o.defaultPrevented||o.button!==0||o.metaKey||o.ctrlKey||o.shiftKey||o.altKey)return;const s=o.target?.closest("a[href]");if(!s||s.target||s.dataset.run)return;const r=new URL(s.href,window.location.href);if(r.origin!==window.location.origin)return;const i=r.pathname.endsWith("/")?r.pathname:`${r.pathname}/`;t.at(i)&&(o.preventDefault(),i!==window.location.pathname&&a(i))}),window.addEventListener("popstate",()=>{const o=window.location.pathname.endsWith("/")?window.location.pathname:`${window.location.pathname}/`;a(o,{push:!1})}),a}class gd{typed=[];drafts=[];index=0;get lines(){return this.typed}add(e){this.typed.push(e),this.drafts=[...this.typed,""],this.index=this.typed.length}previous(e){return this.moveTo(this.index-1,e)}next(e){return this.moveTo(this.index+1,e)}moveTo(e,n){return this.drafts.length===0&&(this.drafts=[""]),e<0||e>=this.drafts.length?n:(this.drafts[this.index]=n,this.index=e,this.drafts[e]??n)}}function wd(t,e,n,a){if(t==="k"){const o=e.slice(n);return{line:e.slice(0,n),caret:n,killed:o||a}}if(t==="u"){const o=e.slice(0,n);return{line:e.slice(n),caret:0,killed:o||a}}return t==="y"?{line:e.slice(0,n)+a+e.slice(n),caret:n+a.length,killed:a}:null}function ys(t){return t.split(/\s*(?:;|&&)\s*/).map(e=>e.trim().split(/\s+/).filter(Boolean)).filter(e=>e.length>0)}function de(t,e){const a=e.startsWith("~")||e.startsWith("/")?[]:t.split("/").filter(Boolean),o=e.replace(/^~/,"").split("/").filter(Boolean),s=[...a];for(const r of o)r!=="."&&(r===".."?s.pop():s.push(r));return s.length===0?"/":`/${s.join("/")}/`}function yd(t){return t.replace(/(?:^|\/)(?:README\.md|\*)$/,"")||"."}const bd={name:"cat",usage:"cat <file>",description:"print a page, README.md or * for the one here",run({site:t,cwd:e},[n]){if(!n)return{text:"cat: usage: cat <file>",error:!0};const a=de(e,yd(n)),o=t.at(a);return!o||/\.md$/.test(n)!==/README\.md$/.test(n)?{text:`cat: ${n}: no such file`,error:!0}:{html:gs(o.body),at:o.route}}},vd={name:"cd",usage:"cd [dir]",description:"go to a directory (the address follows)",run(t,[e="~"]){const n=de(t.cwd,e),a=t.site.at(n);return a?(t.cwd=a.route,{at:a.route}):{text:`cd: ${e}: no such directory`,error:!0}}},kd={name:"clear",usage:"clear",description:"clear what the shell has printed",run(){return{clear:!0}}},xd={name:"find",usage:"find [path] [word]",description:"every page under a directory; with a word, only those it is in the name or title of",run({site:t,cwd:e},n){const[a,o]=n,s=a!==void 0&&(a==="."||a.includes("/")||t.at(de(e,a))!==void 0),r=s?a??".":".",i=(s?o:a)?.toLowerCase(),h=de(e,r);if(!t.at(h))return{text:`find: ${r}: no such directory`,error:!0};const l=u=>t.childrenOf(u).filter(g=>!g.link).flatMap(g=>[g,...l(g.route)]),d=[t.at(h),...l(h)].filter(u=>!i||u.route.toLowerCase().includes(i)||u.title.toLowerCase().includes(i));if(d.length===0)return{text:`find: nothing under ${r}${i?` with "${i}" in it`:""}`};const p=Math.max(...d.map(u=>u.route.length)),m=u=>" ".repeat(p-u.route.length);return{text:d.map(u=>`${u.route}${m(u)}  # ${u.title}`).join(`
`),html:`<pre class="listing">${d.map(u=>`<span class="line"><a href="${S(u.route)}">${S(u.route)}</a>${m(u)}<span class="hint">  # ${S(u.title)}</span></span>`).join("")}</pre>`}}},Xt=40,$d=t=>t.replace(/\]\([^)]*\)/g,"]").replace(/[#*_`>\[\]]/g,"").trim(),Td={name:"grep",usage:"grep <word> [path]",description:"the lines of every page under a directory that say a word",run({site:t,cwd:e},[n,a="."]){if(!n)return{text:"grep: usage: grep <word> [path]",error:!0};const o=de(e,a);if(!t.at(o))return{text:`grep: ${a}: no such directory`,error:!0};const s=n.toLowerCase(),r=t.pages.filter(c=>c.route.startsWith(o)).flatMap(c=>c.body.split(`
`).map((d,p)=>({page:c,number:p+1,line:$d(d)})).filter(({line:d})=>d.toLowerCase().includes(s)));if(r.length===0)return{text:`grep: no page under ${a} says "${n}"`};const i=r.slice(0,Xt),h=r.length>Xt?[`… and ${r.length-Xt} more. Give grep a directory to look in.`]:[],l=c=>S(c).replace(new RegExp(S(n).replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),"ig"),d=>`<mark>${d}</mark>`);return{text:[...i.map(({page:c,number:d,line:p})=>`${c.route}:${d}: ${p}`),...h].join(`
`),html:`<pre class="listing wrap">${[...i.map(({page:c,number:d,line:p})=>`<span class="line"><a href="${S(c.route)}">${S(c.route)}</a>:${d}: <span class="hint">${l(p)}</span></span>`),...h.map(c=>`<span class="line">${S(c)}</span>`)].join("")}</pre>`}}},Sd={name:"help",usage:"help [command]",description:"this",run({commands:t},[e]){if(e){const r=t.find(i=>i.name===e);return r?{text:`${r.usage}
  ${r.description}`}:{text:`help: ${e}: no such command`,error:!0}}const n=Math.max(...t.map(r=>r.usage.length)),a=t.map(r=>`${r.usage.padEnd(n)}  ${r.description}`),o="Tab completes; → takes the grey suggestion. ↑↓ recall. ^K kills to the end of the line, ^U back to the start, ^Y puts it back.",s=t.map(r=>`<dt><a href="#" data-run="help ${r.name}">${S(r.usage)}</a></dt><dd>${S(r.description)}</dd>`).join("");return{text:["Commands:",...a,"",o].join(`
`),html:`<p>Commands:</p><dl class="help">${s}</dl><p>${S(o)}</p>`}}};function Md(t){const e=t.filter(a=>a.startsWith("-")).flatMap(a=>a.slice(1).split("")),n=t.find(a=>!a.startsWith("-"))??".";return{flags:e,path:n}}function Ad(t,e,n,a){const o=a==="."?"":`${a.replace(/\/$/,"")}/`;return[...e?[{mode:"dr-x",name:"..",title:e.title,summary:e.summary,href:e.route,run:`cd ${o}..`}]:[],{mode:"--r-",name:"README.md",title:t.title,summary:t.summary,href:t.route,run:`cat ${o}README.md`},...n.map(s=>s.link?{mode:"lr-x",name:`${s.name}@`,title:`-> ${s.route}  ${s.title}`,summary:s.summary,href:s.route}:{mode:"dr-x",name:`${s.name}/`,title:s.title,summary:s.summary,href:s.route})]}function co(t){const e=t.run?` data-run="${S(t.run)}"`:"";return`<a href="${S(t.href)}"${e}>${S(t.name)}</a>`}function Id(t,e){const n=Math.max(...t.map(i=>i.name.length)),a=i=>" ".repeat(n-i.length),o=i=>e?`${i.mode}  ${i.name}${a(i.name)}  ${i.title}${i.summary?` — ${i.summary}`:""}`:`${i.name}${a(i.name)}  # ${i.title}`,s=i=>e?`<span class="line">${i.mode}  ${co(i)}${a(i.name)}  ${S(i.title)}${i.summary?`<span class="hint"> — ${S(i.summary)}</span>`:""}</span>`:`<span class="line">${co(i)}${a(i.name)}<span class="hint">  # ${S(i.title)}</span></span>`,r=e?[`total ${t.length}`]:[];return{text:[...r,...t.map(o)].join(`
`),html:`<pre class="listing">${[...r.map(i=>`<span class="line">${i}</span>`),...t.map(s)].join("")}</pre>`}}const Ed={name:"ls",usage:"ls [-lnr] [path]",description:"what a directory holds, in the site's own order; -l says more, -n sorts by name, -r reverses",run({site:t,cwd:e},n){const{flags:a,path:o}=Md(n),s=a.find(c=>!["l","n","r"].includes(c));if(s)return{text:`ls: -${s}: no such option. Try ls -l, -n by name, -r reversed`,error:!0};const r=de(e,o),i=t.at(r);if(!i)return{text:`ls: ${o}: no such directory`,error:!0};const h=i.parent===null?void 0:t.at(i.parent),l=[...t.childrenOf(r)];return a.includes("n")&&l.sort((c,d)=>c.name.localeCompare(d.name)),a.includes("r")&&l.reverse(),Id(Ad(i,h,l,o),a.includes("l"))}},jd={name:"pwd",usage:"pwd",description:"print where you are",run({cwd:t}){return{text:jn(t)}}},bs=[Ed,vd,bd,xd,Td,jd,Sd,kd];class Cd{context;constructor(e,n,a=bs){this.context={site:e,cwd:n,commands:a}}get prompt(){return`${jn(this.context.cwd)} $`}moveTo(e){return this.context.site.at(e)?(this.context.cwd=e,!0):!1}run(e){const n=[];for(const[a="",...o]of ys(e)){const s=this.context.commands.find(i=>i.name===a),r=s?s.run(this.context,o):{text:`${a}: command not found. Try help`,error:!0};if(n.push(r),r.error)break}return n}complete(e){const n=e.split(/\s+/),a=n.pop()??"",o=n.length===0?"":`${n.join(" ")} `;return(n.length===0?this.commandNames():this.pathNames(a)).filter(r=>r.startsWith(a)).map(r=>o+r)}commandNames(){return this.context.commands.map(e=>e.name).sort()}pathNames(e){const n=e.lastIndexOf("/"),a=n<0?".":e.slice(0,n+1),o=de(this.context.cwd,a);if(!this.context.site.at(o))return[];const s=n<0?"":a;return["README.md",...this.context.site.childrenOf(o).map(i=>`${i.name}/`)].map(i=>s+i)}}function Od(t,e,n){if(t==="")return"help";const o=[...[...e].reverse(),...n].find(s=>s.startsWith(t)&&s!==t);return o?o.slice(t.length):""}const yn="shell-pending";function Pd(t){try{t&&sessionStorage.setItem(yn,t)}catch{}}function Nd(){try{const t=sessionStorage.getItem(yn)??"";return sessionStorage.removeItem(yn),t}catch{return""}}function Ld(){window.__stopTyped?.();const t=window.__typed??[];if(window.__typed=[],t.length===0)return null;const e=[];let n="";for(const a of t)a==="Enter"?(e.push(n),n=""):a==="Backspace"?n=n.slice(0,-1):n+=a;return{finished:e,unfinished:n}}function Fd(t,e,n={}){const a=document.querySelector(".terminal"),o=document.querySelector(".screen"),s=a?.querySelector("form.prompt"),r=s?.querySelector("input"),i=s?.querySelector(".line"),h=s?.querySelector(".suggest"),l=s?.querySelector(".ps1"),c=document.querySelector(".ran.end"),d=c?.querySelector(".ps1"),p=c?.querySelector(".line"),m=c?.querySelector(".typed");if(!a||!o||!s||!r||!i||!h||!l||!c||!d||!p||!m)return null;const u=()=>{l.textContent=g.prompt,d.textContent=g.prompt},g=new Cd(t,e,n.commands),k=new gd;let w=null;const v=x=>{o.append(x)},y=()=>{w?.remove(),w=null},$=()=>{const x=r.selectionStart??r.value.length;i.style.setProperty("--caret",String(x)),i.style.setProperty("--typed",String(r.value.length)),m.textContent=r.value,p.style.setProperty("--caret",String(x)),h.textContent=x===r.value.length?Od(r.value,k.lines,g.complete(r.value)):""},I=(x,E=x.length)=>{r.value=x,r.setSelectionRange(E,E),$()},M=x=>{if(x.clear&&(o.replaceChildren(),n.clearPage?.()),x.html){const E=f("div",{class:x.text?"listing-out":"cat"});E.innerHTML=x.html,v(E)}else x.text&&v(f("pre",{class:x.error?"error":""},x.text))},b=x=>{y();const E=[],N=f("p",{class:"echo"},f("span",{class:"ps1"},g.prompt),` ${x}`);v(N);let F=!1;const L=ys(x).map(R=>R.join(" "));for(let R=0;R<L.length;R+=1){const[H]=g.run(L[R]??"");if(H){if(E.push(H),M(H),H.html&&!H.text&&(F=!0),H.at&&!n.moveTo?.(H.at))return Pd(L.slice(R+1).join(" && ")),window.location.assign(H.at),E;if(H.error)break}}return u(),$(),F?N.scrollIntoView({block:"start"}):window.scrollTo({top:document.documentElement.scrollHeight}),E},T=()=>{if(y(),r.value.trim()===""){I("help");return}const x=g.complete(r.value);x.length===1?I(x[0]??r.value):x.length>1&&(w=f("p",{class:"hint"},x.map(E=>E.split(" ").pop()).join("  ")),s.insertAdjacentElement("afterend",w),window.scrollTo({top:document.documentElement.scrollHeight}))};s.addEventListener("submit",x=>{x.preventDefault();const E=r.value.trim();I(""),E&&(k.add(E),b(E))});let C="";r.addEventListener("keydown",x=>{if(x.key==="Tab")x.preventDefault(),T();else if(x.key==="ArrowUp")x.preventDefault(),I(k.previous(r.value));else if(x.key==="ArrowDown")x.preventDefault(),I(k.next(r.value));else if(x.key==="ArrowRight"&&r.selectionStart===r.value.length&&h.textContent)x.preventDefault(),I(r.value+h.textContent);else if(x.ctrlKey&&!x.metaKey&&!x.altKey){const E=wd(x.key,r.value,r.selectionStart??r.value.length,C);if(!E)return;x.preventDefault(),y(),I(E.line,E.caret),C=E.killed}else y()});for(const x of["input","keyup","click","focus","select"])r.addEventListener(x,$);let P=!0;r.addEventListener("input",()=>{P&&r.value!==""&&window.scrollTo({top:document.documentElement.scrollHeight}),P=r.value===""}),document.addEventListener("selectionchange",()=>{document.activeElement===r&&$()}),o.addEventListener("click",x=>{const E=x.target?.closest("a[data-run]");E?.dataset.run&&(x.preventDefault(),b(E.dataset.run))}),window.addEventListener("keydown",x=>{const N=x.target?.matches("input, textarea, select, [contenteditable]")??!1,F=x.key.length===1&&!x.ctrlKey&&!x.metaKey&&!x.altKey;N||!F||r.focus({preventScroll:!1})}),s.addEventListener("click",()=>r.focus()),c.addEventListener("click",()=>r.focus()),$();const j=Nd();j&&b(j);const A=Ld();if(A){for(const x of A.finished)x.trim()&&(k.add(x.trim()),b(x.trim()));I(A.unfinished),r.focus()}return{run:b,moveTo:x=>{g.moveTo(x)&&(o.replaceChildren(),u(),$())}}}function Rd(t,e){return t.pages.find(n=>n.body.split(`
`).some(a=>a.trim()===`::${e}`))}function Dd(t){const e=`${t.label}: ${t.description}`;return"choices"in t?{type:"string",enum:t.choices,default:t.initial,description:e}:{type:"number",minimum:t.min,maximum:t.max,default:t.initial,description:e}}function Bd(t){return{type:"object",properties:Object.fromEntries(t.parameters.map(n=>[n.name,Dd(n)])),required:[],additionalProperties:!1}}const vs=t=>t.length<2?t.join(""):`${t.slice(0,-1).join(", ")} or ${t.at(-1)}`;function Hd(t,e){if("choices"in t){if(e===void 0)return{value:t.initial};const a=xe(String(e)),o=t.choices.find(s=>xe(s)===a);return o===void 0?{error:`${t.name}: ${String(e)} is not one of ${vs(t.choices.map(xe))}`}:{value:o}}const n=e===void 0?t.initial:typeof e=="number"?e:typeof e=="string"&&e.trim()!==""?Number(e):Number.NaN;return Number.isFinite(n)?n<t.min||n>t.max?{error:`${t.name}: ${n} is outside ${t.min} to ${t.max}`}:{value:n}:{error:`${t.name}: ${String(e)} is not a number`}}function ks(t,e){const n=t.parameters.map(s=>s.name),a=Object.keys(e).find(s=>!n.includes(s));if(a!==void 0)return{error:`no option ${a}: choose ${vs(n)}`};const o={};for(const s of t.parameters){const r=Hd(s,e[s.name]);if("error"in r)return r;o[s.name]=r.value}return{values:o}}const Wd={amp:"&",lt:"<",gt:">",quot:'"',"#39":"'",nbsp:" "};function qd(t){return t.text?t.text:t.html?t.html.replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/g,"").replace(/<\/(p|h[1-6]|li|tr|div|pre|dt|dd|figcaption|blockquote)>|<br\s*\/?>/g,`
`).replace(/<[^>]+>/g,"").replace(/&(amp|lt|gt|quot|#39|nbsp);/g,(e,n)=>Wd[n]??"").split(`
`).map(e=>e.replace(/\s+/g," ").trim()).filter(Boolean).join(`
`):""}const xs=t=>`Refused, nothing was run: ${t}`;function _d(t,{site:e,goTo:n}){const a=`.app[data-app="${t}"]`,o=document.querySelector(a);if(o)return o;const s=Rd(e,t);return!s||!n(s.route)?null:document.querySelector(a)}function zd(t,e){return{name:t.name,description:`${t.summary}. The reader sees it too: the site goes to the program's page and its dials move to what was asked. Answers in words, then the figures as JSON.`,inputSchema:Bd(t),annotations:{readOnlyHint:!0},async execute(n){const a=ks(t,n);if("error"in a)return xs(a.error);const o=t.run(a.values);return Yd(t.name,a.values,e),`${o.text}

${JSON.stringify(o.data)}`}}}function Yd(t,e,n){const a=_d(t,n);a&&(hn(a,e),a.scrollIntoView?.({behavior:"smooth",block:"start"}))}function Gd({run:t,programs:e}){return{name:"shell",description:`Runs a line at this site's prompt, as if the reader had typed it, and they see it echoed and answered. The site is laid out as directories of pages: ls, cd, cat README.md, find, grep and help work over it, and so does every program: ${e.map(n=>n.name).join(", ")}. Commands chain with &&.`,inputSchema:{type:"object",properties:{line:{type:"string",description:"the line to run, e.g. `cd projects && ls`"}},required:["line"],additionalProperties:!1},async execute(n){const a=t(String(n.line??"")),o=a.map(qd).filter(Boolean).join(`

`);return a.some(s=>s.error)?xs(o):o}}}function Ud(t,e){if(!t)return()=>{};const n=new AbortController,a=[...e.programs.map(o=>zd(o,e)),Gd(e)];for(const o of a)t.registerTool(o,{signal:n.signal});return()=>{n.abort();for(const o of a)t.unregisterTool?.(o.name)}}const Jd=[{file:"book/index.md",markdown:`---
title: The Emotional and Technical Guide to Rescue Stalled Software
summary: Never rewrite. Never stop delivery. A book about rescuing stalled software, 2024, 156 pages.
order: 10
isbn: 978-8409652532
published: 2024-10-19
pages: 156
cover: /book/BookGuide.jpeg
---



#  The Emotional and Technical Guide to Rescue Stalled Software

\\

![The cover of the book](/book/BookGuide.jpeg "large")

> Never rewrite. Never stop delivery.

Conquering technical debt without sacrificing your sanity or shipping
schedule. This guide acknowledges both the technical and emotional challenges
developers face when dealing with legacy code.

**Technical mastery.** Practical techniques to transform legacy code into
maintainable, reliable paths, using TDD as a transformation tool.

**Emotional intelligence.** The fear, anxiety and frustration that come from
maintaining unsustainable code, and proven strategies to address them.

**Continuous delivery.** Making impactful changes while keeping continuous
delivery and team momentum.

It grew out of [an essay of the same name](https://drpicox.medium.com/the-emotional-and-technical-guide-to-rescue-stalled-software-e8aad48d95f4)
from 2023 and the pieces that followed it, woven into one argument: TDD is not
a testing tool but a transformation tool, and changes small enough to always
be deliverable are the only kind that rescue a stalled project.

Paperback and Kindle on [Amazon](https://www.amazon.com/Emotional-Technical-Stalled-Software-Stories/dp/8409652536),
and on [Goodreads](https://www.goodreads.com/book/show/220915522-the-emotional-and-technical-guide-to-rescue-stalled-software-and-other-s).
Self-published, 19 October 2024, 156 pages, ISBN 978-8409652532.
`},{file:"essays/index.md",markdown:`---
title: Essays with more than half a million views
summary: More than 250 essays on Medium, one every Saturday since 2022, read more than half a million times.
order: 20
---

# Essays with more than half a million views

One every Saturday since 2022, on [Medium](https://drpicox.medium.com), without
missing one. More than 250 of them, in fourteen publications, read more than
half a million times between them. Grouped here by what they are about, and
within each group the ones Medium's members stayed with longest come first.

## Testing

The subject most of them are about, and the one with the longest argument: that the industry's idea of a unit test is what makes tests fragile.

- [Confirmed: Code Coverage Is a Useless Management Metric](https://medium.com/better-programming/confirmed-code-coverage-is-a-useless-management-metric-35afa05e8549)  
  A simple proof that dismantles the metric every tech leader trusts.

- [Two Disks: Code and Tests. You Can Only Save One.](https://drpicox.medium.com/two-disks-code-and-tests-you-can-only-save-one-3628f537ef6e)  
  Rolldown threw away the code and kept the tests. Robert C. Martin's parable, solved.

- [The Unit Test Trap](https://medium.com/p/4a83e4012b17)  
  Do you find your unit tests costly? You have fallen into the trap.

- [QA-Unit Tests vs. Agile-Unit Tests](https://medium.com/p/qa-unit-tests-vs-agile-unit-tests-f437fbd3bc2c)  
  How different agile testing is from traditional testing, and why the confusion costs so much.

- [BDD is not E2E](https://medium.com/p/bdd-is-not-e2e-365a58f13097)  
  Why people confuse the two, and what BDD actually is.

- [What Is Business Rules Coverage?](https://medium.com/p/what-is-business-rules-coverage-a7ec9fe5ebbd)  
  Everyone knows code coverage. You may want to change your focus.

- [Improve Your Testing #1: Play With Your Tests](https://medium.com/p/level-up-testing-1-play-with-tests-bdaa154bc4bf)  
  Turn testing into a game and see the hidden connections between code and tests. The first of nineteen.

## Technical debt and legacy code

What the book is about, in pieces: never rewrite, never stop delivery.

- [The Strangler Fig Pattern](https://drpicox.medium.com/the-strangler-fig-pattern-a8ea077e4480)  
  A pattern from 2004 that every developer should know: never rewrite from scratch, transform incrementally.

- [Technical Debt Is Brain Debt](https://drpicox.medium.com/technical-debt-is-brain-debt-15440a72c773)  
  Teams that stop refactoring may lose the ability to write clean code at all.

- [Refactor All the Things All the Time](https://drpicox.medium.com/refactor-all-the-things-all-the-time-9cfbd49df35e)  
  Stop tiptoeing through the code; make it embrace the next feature.

- [Improving Software Quality through Small Changes](https://drpicox.medium.com/improving-software-quality-through-small-changes-70a3c6cb4e45)  
  Not new developers, not more process: one chain reaction that tips the balance.

- [We've Been Rewriting the Same Software for 70 Years](https://medium.com/p/weve-been-rewriting-the-same-software-for-70-years-691ea9b0e4ec)  
  Languages, architectures and paradigms changed. The applications did not. The limit was never the machine.

- [The Craziest Piece of Software I've Ever Seen](https://drpicox.medium.com/the-craziest-piece-of-software-ive-ever-seen-4605085ceb5b)  
  A library that made computers share memory by crashing on purpose.

## Teams, agile and estimates

How the work actually gets done, against how the method says it does.

- [Scrum vs Extreme Programming: Was XP Right All Along?](https://drpicox.medium.com/scrum-vs-extreme-programming-was-xp-right-all-along-1bb1061e9e6b)  
  Could the most popular methodology be the thing holding teams back?

- [Asking for Estimates: The Telltale Sign of Ineffective Software Development Practices](https://medium.com/p/cd54a9d8c60d)  
  "When will it be done?" is the wrong question.

- [If Developers Nail Estimates, They Are Lying To You](https://medium.com/p/if-developers-nail-estimates-they-are-lying-to-you-1b69a3ad5ad0)  
  Reliable estimates are read as maturity. Are they?

- [Improve Your Story Breakdown](https://medium.com/p/how-to-properly-breakdown-stories-b58b9e44e596)  
  The most effective agile technique, and the most overlooked.

- [Stop Tracking Every Version Manually](https://drpicox.medium.com/if-you-know-which-version-is-in-production-you-are-not-using-continuous-delivery-218714df8a31)  
  If you know which version is in production, you are not doing continuous delivery.

- [This Simulator Shows What Meetings Do to Developer Productivity](https://medium.com/p/this-simulator-shows-why-developers-hate-meetings-16ecf426f43b)  
  That 2 PM meeting just cost you the afternoon. Drag it around and watch.

## Code, languages and architecture

The most read one is here, and the one that argues with Dijkstra.

- [The JavaScript framework war is over](https://medium.com/p/bd110ddab732)  
  And there is only one winner.

- [Software Development Is A Beautiful Mess](https://drpicox.medium.com/software-development-is-a-beautiful-mess-45edab1fab73)  
  In 1968 Dijkstra banned GOTO, and he did it for the wrong reason.

- [Coroutines, The Old Gem That Keeps Making Complex Code Simple](https://drpicox.medium.com/coroutines-the-old-gem-that-keeps-making-complex-code-simple-c44c2fbe473f)  
  A trick from the 1980s, right under our noses, that still untangles overlapping behaviours.

- [What Are Micro-Frontends Really For?](https://drpicox.medium.com/what-are-micro-frontends-for-aad66e9c2cf8)  
  They got lost in the microservices hype; their real value is somewhere else.

- [Domain-Driven Design Was the Key Piece Missing from My Computer Science Degree](https://medium.com/p/domain-driven-design-was-the-key-piece-missing-from-my-computer-science-degree-0819acd7bbc4)  
  What finally connected requirements, design and code.

- [React 19 Broke Update Stability, Keeping Half of Developers Stuck](https://drpicox.medium.com/react-19-broke-update-stability-keeping-half-of-developers-stuck-8f6f152dd695)  
  A two-stage update strategy should have prevented it. It did not.

- [We're All Typing Commands Again](https://drpicox.medium.com/were-all-typing-commands-again-ec3cad3b143d)  
  Keyboards are back, and this time they are solving what the GUI never could.

## Working with an AI

Since December 2022, from the angle of someone who tests things: what an agent is, what it costs, and what it does to the person using it.

- [Context Engineering Makes AI Behave Like Software That Works](https://medium.com/p/context-engineering-makes-ai-behave-like-software-that-works-2adc0c4c7706)  
  Your agent does not run out of skill; it runs out of a clean context. Compaction, subagents, skills, RAG and guardrails, seen as one thing.

- [A Tool Call Is Just Text and a Loop You Own](https://drpicox.medium.com/llms-never-call-tools-5904ac72d686)  
  Tool calling is a calling convention: the model writes a request, your code writes the result back. Real Ollama code, zero credits.

- [An LLM Can't Keep a Secret](https://drpicox.medium.com/an-llm-cant-keep-a-secret-a87216dcc461)  
  It fails at hangman for a reason no bigger model will fix, and solving it shows what tool calls are really for.

- [Don't Chat With Your AI. Mob With It.](https://drpicox.medium.com/dont-chat-with-your-ai-mob-with-it-83358a68f6ac)  
  The chat loop makes you wait. Put the agent in a loop over your files, leave the instructions in the files, and run several at once.

- [Tab, Tab, Tab: Copilot's Ticking Technical and Cognitive Debt](https://medium.com/p/tab-tab-tab-copilots-ticking-technical-and-cognitive-debt-2a009993ef86)  
  Copy-paste on steroids removed the pain that made us better developers.

- [Two Months of Pure Prompting Almost Ruined My Coding](https://medium.com/p/two-months-of-pure-prompting-almost-ruined-my-coding-37023881ba0a)  
  A week without Copilot showed what had been lost, and how to take it back.

- [GitHub Copilot Code Review Is Probably Better Than Your Team](https://medium.com/p/github-copilot-code-review-is-probably-better-than-your-team-816c3de54b86)  
  It is not smarter. It is always available and paying attention.

- [Your AI Is Not Your Intern. It's Your Senior, Junior](https://medium.com/p/your-ai-is-not-your-intern-its-your-senior-junior-1598e97dce5c)  
  An Anthropic trial, 52 developers, half with AI. The deciding factor was not AI versus no AI.

- [The New Role of TDD in the Incoming AI Era](https://medium.com/p/now-tdd-is-more-important-than-ever-dfaf65024d9)  
  December 2022: now that ChatGPT and Copilot are here, TDD matters more than ever.

## In series

Some of them are courses in disguise: *Improve Your Testing*, in nineteen
parts (2024–2025), and *How to TDD with BDD-Gherkin*, in six. And one essay
grew until it became [the book](/book/).
`},{file:"index.md",markdown:`---
title: David Rodenas
summary: PhD. I lay the foundations other engineers build on.
order: 0
---

# I lay  
the foundations  
other engineers build on.

Computer enthusiast, doctor and engineer. Former vice-dean of COEINF, the
professional college of computer engineers of Catalonia.

## The book

![The cover of the book](/book/BookGuide.jpeg) *The Emotional and Technical
Guide to Rescue Stalled Software* (2024) is about conquering technical debt
without sacrificing your sanity or your shipping schedule. Its rule fits on
one line: never rewrite, never stop delivery. [About the book.](/book/)

What a shortcut costs, in one dial: two teams build the same features, and
one of them saves time on each and pays interest on it after.

::technical-debt --shortcuts

## Essays

> > More than half a million views.

More than 250 on [Medium](https://drpicox.medium.com), one every Saturday
since 2022, and not one missed. The most read, and two of the ones read
longest:

- ![The cover of the essay](/essays/covers/framework-war.jpg "card") [The JavaScript framework war is over](https://medium.com/p/bd110ddab732)  
  And there is only one winner.

- ![The cover of the essay](/essays/covers/beautiful-mess.jpg "card") [Software Development Is A Beautiful Mess](https://drpicox.medium.com/software-development-is-a-beautiful-mess-45edab1fab73)  
  In 1968 Dijkstra banned GOTO, and he did it for the wrong reason.

- ![The cover of the essay](/essays/covers/scrum-vs-xp.jpg "card") [Scrum vs Extreme Programming: Was XP Right All Along?](https://drpicox.medium.com/scrum-vs-extreme-programming-was-xp-right-all-along-1bb1061e9e6b)  
  Could the most popular methodology be the thing holding teams back?

[All of them, by subject.](/essays/)

## More to run

- ![The near stars, with the trip to Proxima Centauri drawn](/projects/shots/rocket.jpg "card") [A relativistic rocket](/projects/rocinante/)  
  Both clocks, the ship's and home's, and the fuel.

- ![The auction floor: five buyers and a box of prawns](/projects/shots/fish-market.jpg "card") [The agent that won the fish auction](/projects/fish-market/)  
  A Dutch auction, December 2000. Seat your own agent.

- ![The Fibergochi, a stick figure in a yellow egg](/projects/shots/fibergochi.jpg "card") [The Fibergochi](/projects/fibergochi/)  
  A student kept like a Tamagotchi, 1999. Playable.

- ![A letter A drawn on a grid, and the network reading it](/projects/shots/letters.jpg "card") [The first network](/projects/first-network/)  
  Letters told apart by backpropagation, first written in C in 1994. Draw your own.

- ![The map of the adventure beside its first room](/projects/shots/adventure.jpg "card") [Sixty-four rooms](/teaching/adventure/)  
  A text adventure from a first-year course.

- ![A fractal planet of seas, land and snow](/projects/shots/worlds.jpg "card") [The planet in the header](/projects/worlds/)  
  Grown as this page opened, by a program I wrote in 2000. Reload for another.

[All of them.](/projects/)

## Open source

[Two public APIs of AngularJS are mine](/open-source/angularjs/), and I made
its compiler faster. They are still in 1.8.3, the last release it had.
`},{file:"open-source/angularjs.md",markdown:`---
title: Two public APIs of AngularJS are mine
summary: Core work in AngularJS, none of it documentation — the compiler, ngClass, the testing module, two benchmark suites and a directive — and what is still in the final release.
order: 1
was: /code/
---

# Two public APIs  
of AngularJS  
are mine.

\`$compileProvider.commentDirectivesEnabled()\` and
\`$compileProvider.cssClassDirectivesEnabled()\` went into the AngularJS
compiler on 8 August 2016 -- 1,115 lines across eight files -- and they were
never taken out. They shipped in 1.5.9 and 1.6.0 that same year, and six years
of releases later they are still in 1.8.3, the last one the framework had, in
April 2022. The commit message says what
they were for: *this can result in a compilation speed-up of around 10%*. They
are [in the compiler](https://github.com/angular/angular.js/blob/master/src/ng/compile.js)
today; [the change itself](https://github.com/angular/angular.js/commit/4c2964d01b55ebb279ea526ae9f44343e513bb8f)
and [the argument that got it in](https://github.com/angular/angular.js/pull/14850) are both there to read.

\`\`\`js
app.config(function ($compileProvider) {
  // Nobody writes directives as comments or classes
  // any more: stop the compiler looking for them.
  $compileProvider.commentDirectivesEnabled(false);
  $compileProvider.cssClassDirectivesEnabled(false);
});
\`\`\`

## Where I worked

Not on the documentation. Of the lines I put into AngularJS, thirty-four are
documentation, and they describe the option I had just added. The rest went
into the parts of a framework that people are careful about letting you touch:

The compiler :: Two performance changes in \`src/ng/compile.js\`, both listed under *Performance Improvements* in the changelog, in [1.5.8](https://github.com/angular/angular.js/pull/14848) and [1.5.9](https://github.com/angular/angular.js/pull/14850). Both still in the released bundle.
\`ngClass\` :: [A fix to how it watches](https://github.com/angular/angular.js/pull/14405), in 1.5.5 and backported to 1.4.11. [A test suite](https://github.com/angular/angular.js/commit/7b2ed4ae41956656079c6e411ccf4012aaf611f6). [A benchmark](https://github.com/angular/angular.js/pull/15243). And [the idea and much of the implementation](https://github.com/angular/angular.js/pull/14404) behind the rewrite that shipped in 1.6.1 -- the one with the big number.
The testing module :: [The implementation](https://github.com/angular/angular.js/commit/72b96ef57a28743e2dfed523701cc2e88e3b473b) of \`$componentController\`, the helper \`ngMock\` gives you to unit-test a component's controller without compiling any DOM. Mine since 1.5.0-rc.1, and still mine, verbatim, in 1.8.3.
The benchmarks :: Two benchpress suites, [\`bootstrap-compile-bp\`](https://github.com/angular/angular.js/tree/master/benchmarks/bootstrap-compile-bp) and [\`ng-class-bp\`](https://github.com/angular/angular.js/tree/master/benchmarks/ng-class-bp), both written because a maintainer asked for numbers he could check. Both still in the repository.
A directive :: [\`ngRef\`](https://github.com/angular/angular.js/blob/master/src/ng/directive/ngRef.js), which I [proposed as \`ngAs\`](https://github.com/angular/angular.js/pull/14080) in February 2016 and which [shipped](https://github.com/angular/angular.js/commit/bf841d35120bf3c4655fde46af4105c85a0f1cdc) in June 2018 with my name in the commit.

## The compiler

A maintainer asked, reasonably, for numbers he could check. So I wrote a
benchmark for the compiler in benchpress -- AngularJS's own measuring harness --
and posted what it said: about 12% off compiling Bootstrap's carousel template,
about 10% off its theme. Ten per cent is what this change is worth, and I have
seen much larger figures attributed to me for it. The large number is real, but
it belongs further down this page and to a different change.

[The second compiler change](https://github.com/angular/angular.js/commit/3aedb1a70d9f925cf866ed7ba07f59c7eb13baa3)
is smaller and I like it more: a \`try/catch\` inside the function that
collected comment directives was stopping V8 from optimising the whole
function, so I moved it into a function of its own. Nineteen lines, and
measured on a customer's code over two hundred runs, [about 5% off parsing
and compiling](https://github.com/angular/angular.js/pull/14848). It shipped in 1.5.8. The comment I left
explaining why is still in the source.

## ngClass, and the hundredfold number

\`ng-class="{lent: book.lendTo}"\` needs exactly one thing from \`book.lendTo\`:
whether it is there. But \`lendTo\` might be a person, and a person has books,
and those books have people. AngularJS was deep-watching the expression --
copying that whole graph and comparing the copy -- on every digest, for every
element on the page. The cost was proportional to your data, and as I wrote in
the pull request at the time, the data could be big enough to take seconds to
copy.

Everyone who knew this wrote the second line instead, so the watcher saw a
boolean:

\`\`\`html
<!-- copies the person, their books, their people -->
<li ng-class="{ lent: book.lendTo }">

<!-- copies true -->
<li ng-class="{ lent: !!book.lendTo }">
\`\`\`

Everyone who did not know spent the afternoon finding out why the page had
frozen, and the answer was a \`!!\` somebody had forgotten -- or had never heard
of. The fix makes the first line cost what the second one does, so the \`!!\`
stopped being a thing you had to know. That is the whole of it, and it is why
it was worth months.

It shipped in 1.6.1, in [a commit](https://github.com/angular/angular.js/commit/b82097085d53ad89940828d3c0825518569b1e4a)
written by another maintainer on top of [mine](https://github.com/angular/angular.js/pull/14404), and the
changelog entry for it links to my pull request. His commit message:

> "In large based on #14404. Kudos to @drpicox for the initial idea and a big
> part of the implementation." -- Georgios Kalpakas, [in the commit that shipped it](https://github.com/angular/angular.js/commit/b82097085d53ad89940828d3c0825518569b1e4a)

He asked for a benchmark, so I wrote that too: [\`ng-class-bp\`](https://github.com/angular/angular.js/pull/15243),
reviewed and merged into AngularJS's own benchmark suite, where it still is.
It has the case twice: once written the way everyone writes it, and once with
the \`!!\`. On a single element bound to a large object the fix
measured **more than a hundred times faster** -- about 1.5 milliseconds a
digest down to between 0.02 and 0.08, which is to say down to what the \`!!\`
had been buying by hand. On long lists, five to ten times, from seven or
thirteen milliseconds down to about one.

Those are the numbers I posted, from the framework's benchmark, and the
maintainers took them and shipped the change. The same benchmark also says
that on data already written the careful way, by hand, the new code is about
25% *slower*. Which is the honest summary of the whole thing:
it does automatically what an experienced Angular programmer would have done
manually, and it is worth having for the same reason type inference is.

## The testing module

\`$componentController\` is how you unit-test an AngularJS component: give it
the component's name and it hands you the controller, with its bindings,
without compiling a template or touching the DOM. It is the API the component
guide teaches.

\`\`\`js
it("greets", inject(function ($componentController) {
  var bindings = { name: "Ada" };
  var hello = $componentController("hello", {}, bindings);
  expect(hello.text()).toBe("Hello, Ada");
}));
\`\`\`

I did not invent it. A maintainer added it on 10 January 2016. Two days later I
rewrote how it worked, for two reasons. His version kept a registry inside the
production compiler purely so that a test helper could read it -- test-only
code in \`angular.min.js\` -- and mine derives the same thing from the injector,
entirely inside the testing module. And if two directives shared a name, his
picked whichever had been registered last; mine filters for the one that is a
component, and refuses if there is not exactly one. That second point came out
of [the review](https://github.com/angular/angular.js/pull/13732), where the objection to my version turned out
to be a bug in the existing one, and the design that settled it is the code
that shipped.

It shipped in 1.5.0-rc.1, so the production bundle never carried the extra
bytes in any public release, and it is the implementation in
\`angular-mocks.js\` at 1.8.3, comments included. It is [there
today](https://github.com/angular/angular.js/blob/master/src/ngMock/angular-mocks.js).

## ngRef, and how long it took

\`ngRef\` publishes a controller, or an element, into scope, so that the template
around a component can talk to it:

\`\`\`html
<todo-list ng-ref="todos"></todo-list>
<p>{{ todos.remaining() }} left</p>
\`\`\`

I [proposed it](https://github.com/angular/angular.js/pull/14080) on 18
February 2016. It was discussed for two years and three months and
fifty-eight comments. On 1 June 2018 my pull request was closed. Four days
later a maintainer [opened his own](https://github.com/angular/angular.js/pull/16511), rebased from mine with two
changes, and merged that.
The directive shipped in 1.7.1 three days after that. His commit message:

> "Thanks to @drpicox for the original implementation: PR #14080." -- Martin Staffa, [in the commit](https://github.com/angular/angular.js/commit/bf841d35120bf3c4655fde46af4105c85a0f1cdc)

## Whose name is on the commit

There is no count of anything on this page, and this is why. On that project a
maintainer would take your pull request, rebase it, and land it himself:

> "@drpicox I can also make these changes, so just tell me if you'll do it or I
> should. :)" -- Martin Staffa, [July 2016](https://github.com/angular/angular.js/pull/14850#issuecomment-234206359)

Every commit of mine on the main branch was put there by a maintainer's hand,
and GitHub records almost all of my pull requests as never merged -- two of
them my own scaffolding for another. The merge button measures who pressed it.
What it does not measure, one of them wrote down while turning down a different
idea of mine:

> "But totally 👍 for all the great ideas and work that you've been putting in
> to this and other features lately-ish. Really great stuff!" -- Georgios Kalpakas, [September 2016](https://github.com/angular/angular.js/pull/15112)

## Elsewhere

- [RxJS](https://github.com/Reactive-Extensions/RxJS/pull/1177) -- merged.
- [ducks-modular-redux](https://github.com/erikras/ducks-modular-redux) -- merged,
  and the canonical repository for the Ducks pattern lists two of my
  implementations in its README: \`ducks-reducer\` and \`ducks-middleware\`.
- Merged, too, into webpack's documentation site, \`rollupify\`, \`kata-log\`,
  \`jest-runner-eslint\` and \`fetch-intercept\`.
`},{file:"open-source/index.md",markdown:`---
title: Open source
summary: Code of mine that is in other people's hands: what is still inside AngularJS, the npm packages strangers install, and what else is public.
order: 40
---

# Open source

Most of what I have written belongs to whoever paid for it. This is the part
that does not: code that is public, and that other people have run, merged,
or built on.

- [AngularJS](/open-source/angularjs/) -- two public APIs of the compiler are mine, with the \`ngClass\` rewrite built on my work, the testing module's \`$componentController\`, two benchmark suites and a directive. All of it still in 1.8.3, the last release the framework had. The whole account, commit by commit.
- [What strangers install](/open-source/packages/) -- thirty-four npm packages, most written for one project. A few kept being downloaded for years by people nobody told about them: what npm counted, year by year.

Elsewhere on this site, and just as public:

- [Worlds](/projects/worlds/) -- the fractal planet generator of 2000, [Mons fractals](https://github.com/drpicox/mons-fractals), rewritten here with its dials outside.
- [Raft, and a recipe for concurrency](/teaching/raft/) -- [a consensus algorithm in one Java class](https://github.com/drpicox/uoc-raft-2013p), from the year before its paper was presented.
- [Research](/research/) -- the tools of my thesis were released under the GPL: the [stream compiler](https://github.com/drpicox/acotescc), its [runtime](https://github.com/drpicox/acolib) and a [tracing library](https://github.com/drpicox/mintaka).
- [The next word](/projects/next-word/) and [a relativistic rocket](/projects/rocinante/) -- two small things rewritten for this site, each with its original a link away.

And this site itself, with nothing underneath it:
[drpicox/david-rodenas.com](https://github.com/drpicox/david-rodenas.com).

Use \`ls\` to see them, or \`cat angularjs\` to read one here.
`},{file:"open-source/packages.md",markdown:`---
title: What strangers install
summary: Thirty-four npm packages, most written for one project. A few kept being downloaded for years, by people nobody told about them.
order: 2
was: /projects/packages/
---

# What strangers install

Thirty-four packages on npm are mine. Most were written for one project and
are of interest only to it. None was ever promoted, and a few kept being
installed anyway, years after I had stopped looking:

::packages

Each row of bars is on its own scale: it shows the shape of a package's life,
and the number beside it says how much.

## What is in it

- **\`string-cache-map\` had its best year four years after it was written.**
  It is from 2018 and was downloaded a few hundred times a year until 2021;
  in 2022 it was downloaded fifty thousand times.
- **\`async-barrier\` is still growing.** Its best year so far is 2024, six
  years after it was published, and it is a helper for writing tests.
- **\`grunt-frontmatter\` is the other shape**: it peaked in 2017 with Grunt
  itself, and has been going quietly ever since.

## What it is not

A download is not a person. The registry counts every mirror, every robot and
every build server that ever ran an install, and one company's continuous
integration can be most of a package's year. What the numbers do say is that
the code is in use somewhere, by someone who found it on their own and did not
replace it.
`},{file:"projects/adventure.md",markdown:`---
link: /teaching/adventure/
order: 51
---
`},{file:"projects/bird-cards.md",markdown:`---
title: The program that finished before the professor left
summary: A Prolog parser for a field guide to birds, 1999, and the one idea that made it instant where everyone else's took twenty minutes.
order: 42
---

# The program that finished before the professor left

*Tècniques i Mètodes d'Intel·ligència Artificial*, FIB, June 1999. The lab
was a parser: a field guide to birds, one card per species written in
ordinary Spanish sentences, to be read by a Prolog program and turned into
facts a program could ask questions of.

\`\`\`
Nombre: Abubilla, Upupa epops.

Identificación: Plumaje pardo-rosado; en vuelo alas y cola blancas y
negras, muy anchas; moño rosado, con puntas negras y largo pico…
\`\`\`

becomes

\`\`\`prolog
nombre(vulgar([abubilla]), cientifico([upupa, epops]))
identificacion([plumaje([plumaje, pardo-rosado]), vuelo([vuelo]),
                alas([alas]), cola([cola, blancas, y, negras, muy, anchas]), …])
\`\`\`

The day it was due, the professor came round with a floppy of test cards,
handed it over, and started to walk away, because with everyone else's
program the test took ten or twenty minutes to run. We put the disk in,
looked at what was on it, ran the program, and called after him before he
had reached the door. It was done.

## What the code says happened

I remembered the reason as *an LL grammar*, and after twenty-seven years I
was not sure the memory was right. The ten versions are still on a floppy — \`T1.PL\` to \`TF.PL\`, the eighth
to the fourteenth of June — and a classmate's beside them, so it can be
checked. Both are the same size and both are DCGs, Prolog's grammar rules.
The difference is the shape of the rules.

The other program looks for **keys inside a sentence**: it walks the words,
and at each one asks whether it is a key, or a superkey with keys inside it,
or a separator, and on failure it backs up and tries another reading —

\`\`\`prolog
s_SuperClave(F)        --> s_LClaves(F, [], Ffin, _), s_SuperClave(Ffin).
s_SuperClave([F|Ffin]) --> t_SuperClave(_, F, Fdins), s_VariasClaves(Fdins, []), s_SuperClave(Ffin).
s_SuperClave(F)        --> s_LPalabras(Lp, Lf), s_SuperClave_F1(F, Lp, Lf).
\`\`\`

Three alternatives for the same head, none of which can be told apart
without reading ahead, so Prolog tries them in turn and, deep inside a long
card, tries them again and again. That is what a twenty-minute run is.

Mine decides at the **first word**:

\`\`\`prolog
s_UnaFicha(F) --> s_Identificacion(F).
s_UnaFicha(F) --> s_Nidificacion(F).
s_UnaFicha(F) --> s_Alimentacion(F).
s_UnaFicha(F) --> s_Habitat(F).
s_UnaFicha(F) --> s_Nombre(F).

s_Nombre(nombre(vulgar(Lv), cientifico(Lc)))
    --> t_Nombre, t_DosPuntos, s_NomPalabras(Lv), s_NomSeparador, s_NomPalabras(Lc), s_Punto_PotserNula.
\`\`\`

Every alternative of \`s_UnaFicha\` begins with a terminal that no other
begins with — \`Nombre\`, \`Identificación\`, \`Alimentación\` — so the first
token picks the rule and nothing is ever tried twice. Inside each rule the
same holds: lists are read by "one more, or none" pairs that never need to
look back, and \`analisis\` cuts, with \`!\`, at the first parse. The grammar is
LL(1) by construction — which is what I had set out to write, having just
learnt in the compilers course what it bought — and the facts the cards had
to become were rewritten until a grammar of that kind could produce them,
which is the other half of the trick.

It is the same lesson as the one the thesis taught later about
[loops](/research/loops-into-zones/): the algorithm was not made faster. It
was rewritten so that the machine underneath — here, Prolog's search — had
nothing to search.
`},{file:"projects/developer-meetings.md",markdown:`---
title: Developer meetings
summary: How the kind and timing of meetings affect focus, fatigue and how many features a week finishes.
order: 22
was: /simulators/developer-meetings/
---

# Developer meetings

How different meeting types and schedules, through their effect on focus and
fatigue, change what a developer delivers over several weeks.

## How it works

1. **Focus and fatigue**: each hour of work adds to both. What gets done in that hour is the difference, clamped between 0 and 100.
2. **Meetings** produce nothing, and move focus and fatigue by what that kind of meeting does to a person. Lunch resets both; a planning session drains focus and adds fatigue.
3. **A feature** is finished when the hours add up to its size. Finishing one costs the focus that was built up for it.
4. **Weeks** are five days of eight hours, 9:00 to 17:00.

## The simulation

Pick a meeting type, then click and drag on the calendar to schedule it. Click
a meeting to remove it. Everything recalculates as you change it.

::developer-meetings

## Things to try

- **High focus, low fatigue**: focus 75, fatigue 10, and few meetings. Watch the features pile up.
- **A meeting-heavy week**: several boring meetings a day. Watch the compound effect on delivery.
- **No lunch**: remove the lunches and watch fatigue build through the afternoon.
- **Planning on Monday**: put the sprint planning first thing, and compare with spreading it through the week.

## What it tends to show

Breaks that reduce fatigue pay for themselves. Meetings that break focus cost
more than their length. Where a disruptive meeting sits in the day matters as
much as whether it happens. And a consistent rhythm beats an erratic one.
`},{file:"projects/fibergochi.md",markdown:`---
title: The Fibergochi
summary: A student of the FIB kept like a Tamagotchi, written in JavaScript in 1999, one of the first interactive pages I made. Keep it studying, working at a terminal, sleeping and going to the bar, until it gets its degree, or it will be thrown out.
order: 41.5
---

# The Fibergochi

A Tamagotchi, but the pet is a student at the FIB, the computer science
faculty in Barcelona. It has to study for exams, find a free terminal for
its labs, sleep, go to the bar with its friends, and not get bored or
stressed, until it gets its degree, or it is thrown out. I wrote it in
JavaScript in the winter of 1999; the code is signed *Night*. It was one of
the first interactive pages I made.

This is the version of 2 March 1999, the one that was online, with its own
drawings. I drew them pixel by pixel in February, as sixteen-colour bitmaps,
and made them into GIFs for the web. Its words were in Spanish, and here
they are in English.

::fibergochi

The keys on the egg are its own little drawings; the mouse over one says
what it does. **Study/Sleep** sends it to study or to bed, and it decides
which: it tosses a coin. **Find terminal** sends it to look for a free
terminal, and once it has one, it does its labs there on its own. **http**
sets it browsing, if it holds a terminal. **Bar** takes it for a drink, and
it stays for as long as it has friends there; **Friends** makes more.
**Beg** is for after the last day of class: it begs for the subject nearest
to passing, and three times in ten it works. **alfa** tells the score.

The three lamps beside the drawing are an exam to study for, a lab to do,
and a terminal held. After the last day of class the first two blink, and
under the date it says how much there is of each.

It has habits. What it has lately done most, it goes back to on its own: a
student who chats more than works drifts from the lab to http, and one who
drinks more than studies is taken to the bar from the books, easily by day
and hardly early in the morning. The habits fade a tenth every day. Looking
for a terminal and begging stress it, and the bar calms it down. The
terminal rooms were classrooms too, and in the middle of the day a class
can turn it out.

A day has sixteen hours, and a term has twenty-five days, twenty of them
with classes. The marks come out on the twenty-second day. A subject is
passed if less than an hour of work is left on it. It had three speeds, and
has them here: a step every second, which it starts at, every 0.4 seconds,
and every hundredth. The drawings move on a clock of their own, whatever
the speed. Time passes only while the egg is on screen. The Fibergochi is
kept in your browser, as a cookie kept it then, and **new** starts another.

Left alone, it is thrown out for boredom on the sixteenth day of its first
term.

## The rules of the faculty

It starts in the *Fase de Selección*, the first phase of the degree: nine
credits, and in this game a credit is a subject. Anyone who has passed none
after two terms is out, with a single word: *BACARRA*. After four terms,
anyone more than two credits short is out. Anyone one or two short is let
through, but only to the *Técnica*, the shorter degree, twenty-five credits
more. Anyone who passes all nine chooses: the *Superior*, forty, or the
*Técnica*.

After that come the *alfas*: for each of the last six terms, the credits
passed over the credits taken. Four of them below half, and it is out. More
than a hundred of stress, and it leaves. And anyone who finishes the degree
gets two messages, the second of which is an error in \`KERNEL386.EXE\`,
because nobody was expected to get that far.

## What the code of 1999 says

The notes at the top of the file tell how it was made. I did not know how
to use arrays in JavaScript, and I had no internet connection to find out.
So the ten subjects are ten variables, \`credito0\` to \`credito9\`, and they
are reached by building the variable's name and evaluating it:

\`\`\`js
function LeerArray (nom, index)
  {
    return eval (nom + index);
  }
\`\`\`

A browser kept only twenty cookies, which was not enough for a cookie per
number. So all fifty numbers went into one cookie, four characters each,
which is why every number in it had to stay between −999 and 9999. The notes
also warn that Netscape did not tell upper case from lower case in names. So
anything changed was to be tried in Explorer first.

Two things were wrong, and are mended here. A student let through to the
*Técnica* after four terms was never taken out of the *Fase de Selección*,
so the next term threw them out after all. And the score counted its alfas
starting from nothing at all, not from zero, so it always found a spotless
record. Two slips in what the score says are mended with it: it counted the
subjects to pray for with the count of the ones going well, and numbered
the alfas from the oldest as if it were the latest. The rules are otherwise
as they were.

## Where it was found

The copy I had kept was of 15 February, two weeks before this one, and in
it the bar, the friends and begging did nothing yet. The version of March
was on the Internet Archive, from the university server it lived on, but
not its drawings. Those were on a backup disk, the bitmaps beside the GIFs.

The credits in the code give the original idea to Sardakuar, and the idea
of actually making it to Josep Llosa, "who does not know we have mentioned
him, or does".
`},{file:"projects/first-network.md",markdown:`---
title: The first network
summary: A network that tells letters apart, taught by backpropagation, first written in C in 1994 and shown to my class on the PC I carried from home. Draw on its grid, and teach it letters of your own.
order: 41
---

# The first network

In 1994, in my second year of BUP, I wrote a neural network in C that told
two letters apart, drawn on a small grid. To learn how, I went to the
university and, with help, searched for papers over Gopher. It was a school
project, and I presented it to the whole class. To do it I carried the PC
from home: the tower and its CRT screen.

This is the same idea again, in this site's own code: a grid of five cells
by five, ten hidden nodes, one output for each letter, and
backpropagation. Press a cell to ink it or clear it, and the network reads
the drawing again.

::letters

It has been taught A and B, two hundred rounds. Each round shows it every
letter twice, once as drawn and once with one cell wrong, so that it learns
the letter and not the drawing. Tick more letters and it starts again with
all of them. O, C and D are there to be confused. **Forget everything**
leaves it guessing; **teach 100 more rounds** and it comes back.

Or teach it a letter of your own. Draw it, give it a name of up to three
characters, and press **remember this drawing**. It joins the letters
taught, and the network learns them all again from the start. Your
letters stay in your browser, and × forgets one.

## The code

This is the whole of the learning, as it runs on this page:

\`\`\`js
learn(input, target, rate) {
  const values = this.forward(input);
  const output = values[values.length - 1];
  // Each output is to blame for its error,
  // times the slope of the squash where it stands.
  let blame = output.map((value, n) => {
    return (value - target[n]) * value * (1 - value);
  });
  for (let layer = this.weights.length - 1; layer >= 0; layer -= 1) {
    const below = [...values[layer], 1];
    const nodes = this.weights[layer];
    // A node below takes the blame of the nodes it feeds,
    // by its weight on each: before those weights move.
    const passed = values[layer].map((value, i) => {
      let sum = 0;
      for (let n = 0; n < nodes.length; n += 1) {
        sum += nodes[n][i] * blame[n];
      }
      return sum * value * (1 - value);
    });
    for (let n = 0; n < nodes.length; n += 1) {
      for (let i = 0; i < below.length; i += 1) {
        nodes[n][i] -= rate * blame[n] * below[i];
      }
    }
    blame = passed;
  }
  let error = 0;
  for (let n = 0; n < output.length; n += 1) {
    error += (output[n] - target[n]) ** 2;
  }
  return error / 2;
}
\`\`\`

\`forward\` works the other way: every node adds up the values below it by
its weights, plus a bias, and squashes the sum between 0 and 1. Then
\`learn\` starts from the answer. Each output is to blame for how far it
missed. The blame goes down a layer, shared out by the weights. Every
weight moves a little against its share.

## A robot, the same year

That same school year I did a robotics workshop at the Museu de la Ciència.
We had to move a small robot, and in theory in plain C, with the moves
written out by hand. I used what I knew about networks to simulate one
instead, with the weights set by hand and no backpropagation, and it worked
at once. They changed the problem: first find a light, then find it avoiding
obstacles. It was enough to give the robot a *feeling*: aversion to
obstacles. Then they asked for a maze, and told us the trick of keeping a
hand on the right-hand wall. The robot got the feeling of *needing to touch
something on its right*, and the change was almost instant. This part is
memory. None of that code is here.
`},{file:"projects/fish-market.md",markdown:`---
title: The agent that won the fish auction
summary: A Dutch auction, a class of competing agents, December 2000, and the one number ours stood on — the margin at which the market clears. Run it again, and seat your own.
order: 43
---

# The agent that won the fish auction

*Aplicacions d'Intel·ligència Artificial*, FIB, autumn 2000. The lab was a
competition. Every group wrote a buyer for the same simulated fish market
and the marks went by how the buyers did against each other: a 10 for the
best, down to about a 4 for the worst. There were two general rounds with
every group's agent in the room, the second counting for more. Ours won
both — the first with the agent below, the second with the one we handed in
two weeks later.

The market is a **Dutch auction**. A box of fish comes onto the floor, every
buyer is told what it resells for, and the auctioneer names a price *above*
that and brings it down. The first buyer to shout takes the box at that
price. Nobody bids up; there is nothing to decide but *when*. And since a
price on a box of known resale value is a margin, \`(value − price) / price\`,
what a buyer decides is the margin below which it will not shout.

::fish-market

Press **next lot** and one box is sold, or withdrawn if nobody wanted it.
**Run** sells them at reading pace, **whole morning** at once. The board
shows what each buyer asks for the box on the floor, what it holds, and what
it has made; under it, box by box, who took it at what price and the price
every buyer was ready to shout at — which is the whole of each one's mind
at that moment. **Seat your own agent** below the board and it plays too.

## The one number

Vicente — the agent was called that — knows two sums: what all the fish
still on the floor resells for, and how much credit the buyers have left
between them. If that money bought all that fish, every unit spent would
return

\`\`\`math
margin = frac{fish - money}{money}
\`\`\`

That is the margin at which the market *clears*: the price level at which
the money in the room and the fish in the room exactly meet. Vicente shouts
at that margin and not before. Both sums move as the morning goes — each box
sold leaves the first, each price paid leaves the second — and the margin
moves with them.

\`\`\`java
private void recalcularGanancia()
{
    ganancia = sumValor - sumCredito;
    ganancia /= sumCredito;
}

public void evOffer(Good g, double precio)
{
    double valor;
    double gananciaActual;
    valor = g.getResalePrice();
    gananciaActual = valor - precio;
    gananciaActual /= precio;
    if (gananciaActual <= 0)
        return;
    if (gananciaActual >= ganancia && canIBid)
        bid(precio);
}
\`\`\`

That is \`Vicente.java\`, less a line that printed. In English, name for
name:

\`\`\`java
private void recomputeMargin()
{
    margin = fishLeft - moneyLeft;
    margin /= moneyLeft;
}

public void onOffer(Good g, double price)
{
    double value;
    double marginNow;
    value = g.getResalePrice();
    marginNow = value - price;
    marginNow /= price;
    if (marginNow <= 0)
        return;
    if (marginNow >= margin && canIBid)
        bid(price);
}
\`\`\`

\`fishLeft\` is \`sumValor\`, the resale value of what is still on the floor;
\`moneyLeft\` is \`sumCredito\`, the credit in the room counted at 90%. The one dial is \`eficacia\`, 0.9: the credit of the others is counted at 90%,
on the assumption that they will not manage to spend it all. Less money
chasing the same fish means a higher clearing margin, so 0.9 is a measure of
greed. The dial above the board is that number. Turn it down and Vicente
asks for more and buys less; turn it to 100% and he asks exactly what the
room can pay.

## Why it wins

Watch a morning with the dial at 50% money. The two naive buyers act first:
the hasty one takes box after box at a 5% margin, and the patient one waits
for half price and gets it now and then, when nobody else wants a box. For
the first twenty or thirty boxes Vicente does nothing. The market's margin is over 100% and
no box falls that far while the hasty one has credit — so he does not shout,
and he keeps his money.

Then the hasty one is out of credit. Now the money left in the room is
mostly Vicente's, the fish left is most of the fish, and the clearing margin
tells him so: he can demand twice what the room could have paid an hour ago,
and get it, box after box, until his credit and the fish run out together.
He does not chase the best box. He buys everything that returns more than
the average, and lets the others fight over the rest.

This is not a trick against those two buyers. The clearing margin is where
the price would settle if every buyer were rational; a buyer asking more
than that goes home with money, a buyer accepting less has overpaid against
the room. The agent that stands on the number is the one that cannot be
argued down.

## What came after it, in seventeen days

The files kept their dates, and there was not one agent but four.

- **1–3 December — Vicente.** The clearing margin, alone.
- **2 December — Nulo.** A buyer that never shouts. It only watches, and
  writes down the margin each kind of fish went for. It was the instrument
  for the next one.
- **10 December — Wanda.** The clearing margin, believing the others will
  spend 98%, corrected as the morning goes: 5% choosier each time she wins a
  box, 5% less each time a rival who is doing at least as well takes a box at
  a margin she would have accepted — because somebody is buying under her.
  She also carried a margin learnt per kind of fish, meant to cap the
  market's; the one line that chose between the two returned the market's on
  both branches, so the kinds never spoke. She is seated above as she ran.
- **15 December — the one we handed in.** Where Wanda corrected her margin
  after the fact, this one *plans* it. It keeps a histogram of the value
  sold so far by the margin it went at — \`p(m)\`, the share of everything
  sold that went at margin \`m\` — and assumes the fish still on the floor
  will go the same way. Then it sums over every margin it could demand,
  from the highest down, what the fish it expects to find there would cost,
  and demands the largest \`m\` at which that sum still covers the credit it
  has left:

\`\`\`math
sum_{m' >= m} p(m') · frac{fish}{1 + m'} >= credit
\`\`\`

That margin is the most it can ask and still spend all its money. Until
anything has sold, it is Vicente.

The thread is clean: one global number, then measure, then a number that
corrects itself, then a number computed from what was measured and what is
left to spend. On the board the three are close, and which of them comes out
ahead depends on the morning; the two naive buyers are never in it.

## Your own agent

Under the board is an editor with the body of a JavaScript function. It is
given \`lot\`, the box on the floor; \`market\`, with the lots still to sell,
everyone's remaining credit and every sale so far; and \`me\`, your name in
the credits. It returns the margin you demand. It starts out as Vicente in
eight lines, so the first agent you seat already holds its own — change the
0.9 first, then try to beat him. A mistake in it is shown in the engine's own
words, and the auction goes on without you. It runs in your browser and
stays there.

## What this is and is not

The auction here is a reconstruction, not the original market: the price
falls in steps of 2% of the resale value from 150% of it, a box is withdrawn
at 25%, and when two buyers shout at once a coin decides where the original
restarted the round higher. The agents are the ones in the files, rule for
rule. The two naive buyers are not from the class; they are
there to show what the number is for.

Eighteen years later I set a class the same problem turned inside out:
[a lagoon whose fish breed if left alone](/teaching/fishing-lagoon/), and
bots that have to decide how much to take from it.
`},{file:"projects/fishing-lagoon.md",markdown:`---
link: /teaching/fishing-lagoon/
order: 52
---
`},{file:"projects/hot-nights.md",markdown:`---
title: Hot nights, counted
summary: How many nights a year never cool below 20 °C, at nine weather stations, and whether the second half of each record differs from the first.
order: 32
was: /open-data/hot-nights/
---

# Hot nights, counted

A night whose lowest temperature stays at 20 °C or above is called a tropical
night: the house does not cool down and nobody sleeps well. The Meteocat
publishes the daily minimum of every automatic station it runs. This counts
them, year by year, and cuts each record in two to see whether it has moved:

::weather

The threshold slides, because what the site keeps is not the count but a
histogram of each month's days. Move it to 25 °C and the nights are torrid;
choose another kind of day and the same page counts hot afternoons, frost, or
rain.

## What is in it

- **Every one of the nine stations has more tropical nights in the second
  half of its record than in the first.** At Badalona, 75.1 a year became
  86.1. At the Raval, in the middle of Barcelona, 93.2 became 103.0.
- **The nights at 25 °C or more are where the Raval changes most**: 6.1 a
  year before 2016, 19.8 since.
- **2022 is the year with most tropical nights at four of the nine, and with
  most days at 30 °C or more at eight of them.**
- **The exception is worth as much as the rule.** The Observatori Fabra, on
  its hill above Barcelona, has fewer days at 30 °C or more in its second
  half than in its first, 33.9 against 42.3. Its first half holds the summer
  of 2003.
- **Rain does not move the same way.** Days with 1 mm or more go slightly up
  at some stations and slightly down at others, and the largest difference
  between two halves is five days a year.

## What it is not

Each station is cut in half over its own years, so two stations' halves are
different periods: a record that starts in 2009 has no flat 1990s in it, and
will look steeper for that alone. Compare a station with itself.

The series are not homogenised. A sensor replaced, a screen moved, a car park
built next door: each can make a step that has nothing to do with the climate,
and nothing here corrects for it. A station is never joined to another, even
in the same town. A year missing more than one day in twenty is drawn as an
outline and kept out of every mean. The year still running is not shown.

The names — tropical night, torrid night — are common usage, not official
definitions. Frost is "below 0 °C" rather than "0 °C or below" because only
the first can be counted exactly from the histograms. The difference between
two halves is a description of what a record did. It is not a forecast, and it
does not say why.

## Where it comes from

This is the small version of an explorer I built in the summer of 2026, which
has every station of the network that is still reporting, humidity and a map:
[Nits de calor a Catalunya](https://david-rodenas.com/heatwave/). Here there
are nine stations and four variables, the daily series stays at its source,
and the site keeps only what it derives from it, a finished year at a time.
`},{file:"projects/index.md",markdown:`---
title: Projects
summary: Small programs you can run here, each made of one idea — from a network of 1994 and an auction of 2000 to a language model you can count by hand, with public data added up and two models of how software work goes wrong.
order: 30
was: /simulators/, /open-data/
---

# Projects

Small things, each made of one idea, and almost all of them something you
can move: a dial, a grid, a seed, a seat at the table.

## Ideas, taken apart

- [The next word](/projects/next-word/) -- a language model with everything taken away but the idea: count which word follows which, then throw the dice. Let it read this website.
- [A relativistic rocket](/projects/rocinante/) -- how long a trip takes on board and how long for those left at home, and why a ship that crosses the solar system in days cannot reach a star in a lifetime.

## How software work goes

Abstract things in software development, as small models you can turn the
dials of and watch.

- [Technical debt](/projects/technical-debt/) -- how shortcuts create compound productivity losses over time: the true cost of a shortcut, the break-even point between clean and debt-driven development, and what the interest rate does to it.
- [Developer meetings](/projects/developer-meetings/) -- how the kind and the timing of meetings affect a developer's focus and fatigue, and with them how many features a week actually finishes. Paint a calendar and see.

## Public data, added up

The Generalitat de Catalunya publishes what its measuring networks record,
and most of it is only ever looked at a day at a time. These add it up
another way. The sums are kept in this site's repository, a finished year at
a time, and the portal is asked again only when a year has ended; while you
read, nothing is fetched from anyone but this site.

- [NO2 by the hour and the month](/projects/no2/) -- thirty years of hourly measurements, averaged by hour of the day and month of the year. A city's working day turns out to have a shape, and it does not reach the top of the hill.
- [Hot nights, counted](/projects/hot-nights/) -- how many nights a year never cool below 20 °C, at nine weather stations, and whether the second half of each record differs from the first.

## Before the doctorate, in the order they were made

- [The first network](/projects/first-network/) -- a network that tells letters apart, taught by backpropagation, first written in C in 1994 and shown in class. Draw on its grid, and teach it letters of your own.
- [The Fibergochi](/projects/fibergochi/) -- a student of the FIB kept like a Tamagotchi, in the JavaScript of March 1999: study, sleep, find a terminal, go to the bar, and get through the Fase de Selección. Playable, in its own drawings.
- [The program that finished before the professor left](/projects/bird-cards/) -- a Prolog parser for a field guide to birds, 1999, and the one idea that made it instant where everyone else's took twenty minutes: a grammar that never has to look back.
- [The agent that won the fish auction](/projects/fish-market/) -- a Dutch auction, a class of competing agents in December 2000, and the one number ours stood on: the margin at which the market clears. Run it again, and seat your own.
- [Worlds](/projects/worlds/) -- the fractal planet generator of 2000, the one that grows the world in the header, with its dials exposed.
- [A maze you could not fly over](/projects/maze/) -- a VRML maze generator of May 2001: a depth-first dig, and spheres that jump across the walls so it cannot be solved from above. Grown again from the same seeds, with two things the spheres did that nobody noticed.

## Also here, from the teaching

Two labs I set, which are just as much things to play: they live under
[teaching](/teaching/), and are listed here too.

- [Sixty-four rooms](/teaching/adventure/) -- the text adventure of a first-year course, 2007, playable.
- [The fishing lagoon](/teaching/fishing-lagoon/) -- a commons whose fish breed if left alone, 2018. Seat your own bot.

Use \`ls\` to see them all, or \`cat next-word\` to read one here.
`},{file:"projects/maze.md",markdown:`---
title: A maze you could not fly over
summary: A VRML maze generator from May 2001, a depth-first dig with spheres that jump you across the walls, grown again here room for room from the same seeds, and what the spheres did that nobody noticed.
order: 45
---
# A maze you could not fly over

*Realitat Virtual i Geometria*, FIB, spring 2001, with Toni Preciado. The
course was VRML, the language the web of 2000 was going to walk around in: a
scene is a text file, and a plug-in in the browser lets you move through it.
Our project was a maze. Not one drawn by hand: a Java program,
\`LaberintoSimple\`, that grew one of any size and wrote it out as a VRML
world, a floor for every room and a wall wherever two rooms were not joined.

::maze

That is the maze the program wrote on 20 May 2001, seven rooms a side, from
seed 543: the file it produced, \`test.wrl\`, is still there, and the maze
above is grown again from the same seed and checked against it wall for
wall. North is at the top, the way in is at the bottom left and the way out
at the top right. **Walk the camera** follows the route the program dug the
rooms in; **another** grows a new one.

## The dig

Start in the corner. From the room you are in, try the neighbours in turn;
for each one nobody has dug yet, knock down the wall between you and dig
from there. When there is nowhere left to go, step back and try the next
neighbour of the room before. That is a depth-first search, and since every
room is entered exactly once, from exactly one other, the result is a tree:
one way, and only one, between any two rooms. The report that went with it
says it plainly: *"todos los laberintos tienen una única solución"*, and
from anywhere you can reach anywhere.

The steps back are kept too. The program wrote the whole route, back-tracks
and all, into the VRML as an animation, and a camera rode along it: pick
*Cam DFS* in the viewer and you watched the maze being dug, room by room.
The report offers it as the first of the two games — a replacement for the
Windows OpenGL screensaver — and the second as solving the maze on foot.

One thing about "try the neighbours in turn": the order is not shuffled. The
program picks one of three fixed orders — north, east, west, south; west,
south, east, north; or south, east, west, north — so of the twenty-four ways
to order four directions it only ever uses three. The mazes do not look it.

## The spheres

A week after the first version, the program learnt to cheat. In one room in
ten, before digging on, it picks a room anywhere in the maze. If nobody has
dug that room yet, it puts a green sphere in both, joins them, and digs on
from the far one. In the viewer the sphere was a link, meant to take you to
its pair through every wall in between. The maze above marks both ends of a
jump with the same letter.

\`\`\`java
public void generar(int x, int y)
{
    int orden;

    anadirDFS(x, y);
    if (random.nextInt(10) < 1)
        generarHLink(x, y);

    orden = random.nextInt(3);
    switch (orden)
    {
        case 0:  generarNorte(x, y); generarEste(x, y); generarOeste(x, y); generarSur(x, y);   break;
        case 1:  generarOeste(x, y); generarSur(x, y);  generarEste(x, y);  generarNorte(x, y); break;
        default: generarSur(x, y);   generarEste(x, y); generarOeste(x, y); generarNorte(x, y); break;
    }
}

public void generarHLink(int x, int y)
{
    int x2 = random.nextInt(w);
    int y2 = random.nextInt(h);

    if (laberinto[x2][y2] != 0)
        return;

    laberinto[x][y] |= CNX_HLINK;
    laberinto[x2][y2] = CNX_HLINK;
    hLinks[x][y] = new Pt(x2, y2);
    hLinks[x2][y2] = new Pt(x, y);

    generar(x2, y2);
    anadirDFS(x, y);
}
\`\`\`

That is \`LaberintoSimple.java\`, with the four \`switch\` cases set a line
each. In English, name for name:

\`\`\`java
public void dig(int x, int y)
{
    int order;

    rememberStep(x, y);
    if (random.nextInt(10) < 1)
        digSphere(x, y);

    order = random.nextInt(3);
    switch (order)
    {
        case 0:  digNorth(x, y); digEast(x, y);  digWest(x, y);  digSouth(x, y); break;
        case 1:  digWest(x, y);  digSouth(x, y); digEast(x, y);  digNorth(x, y); break;
        default: digSouth(x, y); digEast(x, y);  digWest(x, y);  digNorth(x, y); break;
    }
}

public void digSphere(int x, int y)
{
    int x2 = random.nextInt(width);
    int y2 = random.nextInt(height);

    if (maze[x2][y2] != 0)
        return;

    maze[x][y] |= HAS_SPHERE;
    maze[x2][y2] = HAS_SPHERE;
    sphereTo[x][y] = new Point(x2, y2);
    sphereTo[x2][y2] = new Point(x, y);

    dig(x2, y2);
    rememberStep(x, y);
}
\`\`\`

A jump is just another way into an undug room, so the maze is still a tree
and still has one way through. But now the tree is no longer flat. The
report: *"El laberinto es de dos dimensiones (en ningún momento hay que
subir ningún piso), pero dado que hay partes incomunicadas tan solo
alcanzables con los hipervínculos se puede considerar que está en 3
dimensiones."* Two dimensions you can walk, and a third you can only jump
along. That was the point. A maze in VRML has a weakness a maze on paper
does not: you can leave the floor and look down. We added fog, which also
made large scenes faster, and the spheres, and with those a maze could not
be solved from above, because from above there is no seeing where a sphere
goes.

The report names five files, \`mini.wrl\`, \`med.wrl\`, \`gran.wrl\`, \`mm.wrl\` and
\`10k.wrl\`, *"el más complicado y con diferencia"*. They did not survive; the
program did, so the dial above goes to thirty a side, which is plenty on a
screen. Untick the spheres and you have the version of 13 May, which never
rolled for them.

## What the spheres did that nobody noticed

Run the Java today and it grows the same mazes it grew then — the page's
generator is checked against it — and it shows two things the report does
not.

**Some spheres lead nowhere.** When the room a sphere lands in rolls a
sphere of its own, the program overwrites that room's pair. The new pair
works both ways; the first sphere now points at a viewpoint nobody wrote.
And since the rooms behind it were reached only through that sphere, they
are cut off, way out included if it was among them. In the first thousand
seven-by-seven mazes the Java grows, 133 have a dead sphere and 117 have no
way out at all; at twenty a side, it is most of them. The maze of 20 May
happens to be one of the lucky ones. On the page a dead sphere is a dashed
circle with a cross, and **show the way out** says when there is none.

**The live ones all land in the same place.** Each sphere carries the
viewpoint it jumps to, but the viewpoint is written without a position, and
VRML puts a viewpoint without one at its default, (0, 0, 10). Every link in
the file takes you to that one spot, on a wall a few steps north of the way
in. Here a sphere joins the rooms it was meant to join, which is what the
report describes.`},{file:"projects/next-word.md",markdown:`---
title: The next word
summary: A language model with everything taken away but the idea: count which word follows which, then throw the dice.
order: 11
---

# The next word

A language model does one thing: given the words so far, it says what may
come next, and how likely. Everything else is how well it says it. This one
says it as badly as possible, so that the whole of it can be seen. It reads a
text, counts which word followed which, and throws dice weighted by the counts.

::next-word

Press **next word** and it throws the dice once. Press a word it offers and
you are the dice. Press **write** and watch it go.

## Things to try

- **Count it yourself.** In the eight short sentences, *the* is followed by
  *cat* three times, *dog* three times and *car* twice. Those are the chances
  it offers, and there is nothing else inside.
- **Turn the temperature down to 0** and it always says the likeliest thing,
  and soon goes round in a circle. **Turn it up to 2** and the unlikely words
  get their turn. It is the same dial the real ones have, doing the same sum.
- **Let it read this website**, and look two or three words back instead of
  one. One word back it babbles; three words back it starts quoting the pages
  it read, because so long a context has usually been seen only once. More
  memory needs more text: that trade is the whole history of the field.
- **Start from a word it never saw.** It takes the nearest word it knows, by
  counting letters. A real model avoids the problem by cutting words into
  pieces.

## What it is not

A real model does not keep a table. It would need a row for every run of
thousands of words ever written, and nearly every row would be empty. It
squeezes the table into a network that answers for contexts nobody has seen,
because they resemble ones somebody has — which is where everything
interesting, and everything that goes wrong, comes from. But the question put
to it is this one, and the answer is used this way: a list of chances, a dial,
and dice.

## Where it comes from

The first version is from February 2026, made to be shown in a talk rather
than explained: [the original, with its Catalan
texts](https://david-rodenas.com/next-word-generator/). This one is written
again for this site, with nothing underneath it.
`},{file:"projects/no2.md",markdown:`---
title: NO2 by the hour and the month
summary: Thirty years of hourly NO2, averaged by hour of the day and month of the year. A city's working day turns out to have a shape.
order: 31
was: /open-data/no2/
---

# NO2 by the hour and the month

Nitrogen dioxide in a city is mostly traffic. The Generalitat de Catalunya
measures it every hour at fixed points and publishes every reading since 1991.
Looked at a day at a time it is noise. Averaged by **hour of the day** and
**month of the year**, it is a picture:

::no2

Each cell is the mean, in µg/m³, of every measurement taken at that hour in
that month over the years selected. The colour says whether it is good or bad
before the number is read: green is clean, red is the European annual limit of
40, and purple going to black is beyond it. Press a bar to see one year alone.

## What is in it

At Barcelona's Poblenou, a station away from the big roads, over its whole
record:

- **Two ridges.** The morning one peaks at hour 09 and is there all year. The
  evening one, around hours 20 to 22, is the higher of the two from November
  to February, and by July it is less than half of what it was in January.
- **The afternoon.** Between the ridges is a valley, deepest at hours 16 and
  17 in August, at 15 µg/m³: a quarter of a January evening.
- **August.** Its mean is 28 µg/m³; no other month is below 33. The city
  leaves, and it shows at every hour.
- **The week.** From Monday to Friday the mean is about a quarter higher than
  on Saturdays and Sundays. Choose the weekends and the morning ridge is gone.
- **The years.** 57.4 µg/m³ in 2003, 36.7 in 2019, 29.0 in 2020, 22.0 in 2025.
  It has not been over the European limit of 40 since 2017.

Choose the **Eixample**, which measures traffic, and the same shape is there
in purple: 70 µg/m³ in 1999, 49.5 in 2019, 35.2 in 2020. The year of the
lockdowns was its first under the limit; 2022 went back over it, and 2025
closed at 29.1. The same shape, higher or lower, is at every urban station
here.

## Height

Choose the **Observatori Fabra**. It is in Barcelona, 415 m up the hill the
city climbs, and its table is green: 7.4 µg/m³ in 2025, when the Eixample
below it closed at 29.1 and Poblenou at 22.0. It has no rush hours either. Its
highest cells are late morning in summer and late afternoon in winter, and
none of them reaches 20; its lowest are the early morning, just when the
streets below are filling. Same city, same traffic: little of it is measured
up there.

The other green table is La Castanya, in the Montseny, where the yearly mean
has stayed under 4 µg/m³ since 2013: that is what air with no road under it
measures. Those two are the only stations of these eleven that ended 2025 under
the 10 µg/m³ the WHO has recommended since 2021.

## What it is not

The cells are means, and a mean hides the bad days. Public holidays are
counted as whatever day of the week they fell on. The dataset numbers its
hours 01 to 24 and does not say by which clock. A year drawn as an outline had
less than three quarters of its hours measured; Eixample has no 2010 at all.
These are open data added up, not validated science: for anything that
matters, go to the source.

## Where it comes from

I first drew this table in 2021, for myself, in a small app that asked the
portal for everything on every visit. This page is that analysis again, with
the asking moved out of the reader's way: the site keeps the sums, a finished
year at a time, and asks the portal only when a year has ended.
`},{file:"projects/rocinante.md",markdown:`---
title: A relativistic rocket
summary: How long a trip takes on board, how long for those left at home, and why a ship that crosses the solar system in days cannot reach a star in a lifetime.
order: 12
---

# A relativistic rocket

A ship that can keep its engine burning does not fly the way a probe does. It
speeds up to halfway, turns round, and slows down the rest. Near the speed of
light its own clock falls behind the ones at home, so a trip has two lengths.
Here they are side by side, for one ship, to ten places:

::rocket

The map is the neighbourhood: every star within twelve light-years of the
Sun, each on a stem down to the plane of the celestial equator, so that the
eye can tell above from below. Drag it to turn it. The ship flies the chosen
trip over and over with its two clocks beside it — watch them part when the
ship is fast. Press a row of the table, or a ringed star, to fly there.

The ship it opens with is a fusion torch: thirty thousand tonnes, a sixth of
it fuel, a third of a g.

## Things to try

- **It owns the solar system and nothing else.** Mars in under four days,
  Pluto in a month, on a little over a thousand tonnes of fuel. Proxima
  Centauri takes sixty-five years: in the first eleven weeks it burns a
  little more than half its fuel, keeping just enough to stop, reaches 7% of
  the speed of light, and coasts with the engine off for sixty-four years.
  At that speed the two clocks still agree.
- **Give it fuel.** Slide it up until the row for Proxima stops saying
  *coasts*: twenty ships' worth of fuel for every ship. The trip drops to
  seven years on board and eight and a half at home. This is the rocket
  equation: fuel has to carry the fuel.
- **Make it perfect**: exhaust at 100% of c, one g, and all the fuel the
  slider has. Now the clocks part. Proxima is 3.5 years on board and 5.9 at
  home. The centre of the galaxy is 20 years on board and 26,002 at home, and
  Andromeda is 29. You could go, inside a working life; nobody you knew would
  hear of it. The fuel for Andromeda is six million million ships for every
  ship, with an engine nobody knows how to build.
- **Go where Project Hail Mary goes.** Tau Ceti is 11.9 light-years away.
  With the perfect engine at one g it is 5.1 years on board and 13.7 at
  home. Turn the acceleration up and see how little it buys at home, and
  how much on board.

## What it is not

Straight lines from a standing start, and star positions good to a picture, not to a navigator: no orbits, no launch windows, no gravity
wells, and the planets are taken at the gap between their orbit and ours. No
shielding either, and at these speeds the thin gas between the stars arrives
as hard radiation. The arithmetic is the [relativistic rocket of the Usenet
Physics FAQ](https://math.ucr.edu/home/baez/physics/Relativity/SR/Rocket/rocket.html),
and its table of trips at one g is what this page's tests are checked against.

## Where it comes from

This is the arithmetic of the [Rocinante
Simulator](https://david-rodenas.com/rocinante-simulator/), which I built in
October 2025: the solar system and the thirty nearest stars in three
dimensions, a ship to configure, and a sphere showing how far it can reach.
Go there to fly it. This page keeps only the sums, written again for this
site with nothing underneath.

![The Rocinante Simulator: the inner solar system in three dimensions, the ship's dials on the right, and on the left a trip to Mars of 3.76 days and 132.71 tonnes of fuel](/rocinante-simulator.jpg "wide")

Its Mars is this page's Mars: the same ship, 3.76 days and 133 tonnes.

## The two books behind it

The name is the ship of *The Expanse*, the novels of James S. A. Corey,
the pen name of Daniel Abraham and Ty Franck, which begin with *Leviathan
Wakes* in 2011, and the television series made of them. The *Rocinante* is
named after Don Quixote's horse. What makes that universe possible is the
Epstein drive, which keeps up a steady thrust on almost no fuel. This page
is what the rocket equation says when there is no Epstein drive.

*Project Hail Mary*, Andy Weir's novel of 2021, filmed in 2026, sends its
ship to Tau Ceti on an engine fed by Astrophage, single-celled organisms
that take in light and give it out again. Its story turns on the two clocks
this page keeps apart: the years its crew lives through are not the years
that pass at home.
`},{file:"projects/technical-debt.md",markdown:`---
title: Technical debt
summary: How shortcuts create compound productivity losses over time.
order: 21
was: /simulators/technical-debt/
---

# Technical debt

The compound effect of technical debt on productivity. Taking shortcuts saves
time at first, and creates interest that slows every feature after.

The simulator models two teams building the same features:

1. **Clean development**: a consistent pace, no shortcuts, steady productivity.
2. **Debt-driven development**: an initial boost from shortcuts, then a compound slowdown.

::technical-debt

## What the dials do

- **Base time**: how long a feature takes when it is done properly.
- **Shortcuts**: how much of that time a shortcut saves, at first.
- **Interest**: how much dearer each shortcut feature makes the next one.
- **Timeline**: how far ahead to look.

## What it shows

The moment when clean development overtakes debt-driven development in total
features is the break-even point. Short-term gains become long-term losses;
the higher the interest, the sooner. Zero interest is the only case where the
shortcut wins, and zero interest is not a thing that happens to real code:
skipped tests, quick fixes and accumulated complexity are all paid for by
whoever touches the code next.

## Real-world implications

This is what happens in projects that skip tests, documentation or design,
take quick fixes instead of proper solutions, and let complexity accumulate.
The hidden cost is not the shortcut. It is every change that comes after it.
`},{file:"projects/worlds.md",markdown:`---
title: Worlds
summary: The fractal planet generator of 2000, in the browser, with the dials exposed.
order: 44
theme: dark
sky: stars
was: /worlds/
---

# Worlds

[Mons fractals](https://david-rodenas.com/mons-fractals/) was a university
graphics assignment of the autumn of 2000: Java 1.1.8 on MS-DOS, a pipeline
of filters that grew a planet and wrote it out as VRML for a browser plugin to
fly around. This is the same pipeline, in TypeScript, with nothing underneath
it, and the dials on the outside so you can play.

::worlds

Drag the world to turn it; let it go and it keeps turning. Every dial is one of
the filters:

- **Seed** picks the world. The same seed always grows the same one.
- **Detail** is how many times every edge is split in two. Each round has four times the triangles of the one before; six rounds are 81,920.
- **Roughness** is how far a new midpoint may move, as a fraction of the edge it came from. The original default was 0.1; a little more makes for better mountains at this size, and a lot more makes something that is not a planet.
- **Sea** is the share of the surface under water. The sea is a minimum radius: everything below it is raised up to it.

The pipeline runs in order, and the order is the meaning: raise the land, put
in the sea, work out the climate from height and latitude, and only then
paint. Paint first and there is nothing to paint.
`},{file:"research/graph-matching.md",markdown:`---
title: Graph matching on a desktop
summary: Universitat Rovira i Virgili, 2009–2011. Two computer-vision algorithms rewritten for CUDA and OpenMP on an eighteen-watt desktop: an hour and a quarter became under two minutes, without changing the result by a bit.
order: 3
---

# Graph matching on a desktop

The second half of [the thesis](/research/), at the Universitat Rovira i
Virgili between 2009 and 2011: the [tools of the first
half](/research/parallel-tools/), put to work on a problem that needed them.

Computer vision likes to describe things as graphs: a house is a roof, a
door, two windows, and how they touch. Comparing two graphs exactly is
exponential in their size, and even the good approximations were too slow to
use outside a laboratory.

I took two of those algorithms, graduated assignment for a pair of graphs and
for the common labelling of many, and rewrote them for what a desktop had
become: a multi-core processor beside a graphics card. The method is what the
first half had taught, and [it has a page of its own](/research/loops-into-zones/). Transform the equations, not the code — splitting,
tiling and reordering loops in a notation close to the mathematics — so that
the program falls into the same two levels of parallelism, and the result
does not change by a single bit.

The machine was chosen for what it did not have: an Intel Atom with two
cores, the kind put in netbooks, and the small graphics chip sold beside it.
Eighteen watts between them.

::graph-matching-runs

Matching every pair of 150 graphs of 24 vertices took one thread an hour and
a quarter. OpenMP on the same two cores brought it to twenty minutes; the
graphics chip, to under two. The common labelling of fifty such graphs went
from twenty hours to thirty-nine minutes. And the larger the graphs, the
larger the gain — sixteen, twenty-two, forty times — which is the right way
round: it is the large ones that were out of reach.

The same programs on a fast desktop of the day, a four-core i7 with a
ninety-six-core card, did that hour and a quarter in nineteen seconds: two
hundred and thirty times faster than where it started, one thread of the
Atom. The thesis rounds it to 250.

On the largest graphs tried, 512 vertices, the thesis reports the parallel
version 366 times faster than the serial one, whose run at 1,024 vertices was
not attempted: it was estimated at forty-two days.

That is close to real time, on hardware a robot or a fingerprint reader could
carry, which is what the algorithms had been waiting for.

Both are first-author papers in Springer's Lecture Notes in Computer Science:
[IbPRIA 2011](https://doi.org/10.1007/978-3-642-21257-4_63) and
[GbR 2011](https://doi.org/10.1007/978-3-642-20844-7_14).
`},{file:"research/index.md",markdown:`---
title: Research
summary: A PhD on making parallel hardware usable by people who are not parallel programmers. Runtimes, a simulator, a compiler, and then graph matching on a GPU.
order: 50
---

# Research

In 2003 every new processor had run old programs faster for twenty-five
years, and it seemed it would last for ever. My thesis began from the hunch
that it would not: that the desktop would go multi-core, and that the problem
would stop being the hardware and become **the programmer**, who now had to
write many coordinated lists of instructions instead of one, and mostly did
not know how.

So the question of the whole PhD is one of usability. Supercomputers had been
parallel for decades, and most of their users were not computer scientists.
What they used, OpenMP, lets you take a serial program and annotate it, a
line at a time, until it runs in parallel. Could that way of working be
carried to the machines everyone was about to own, which did not share
memory, and whose cores were not all the same?

*Algorithms Acceleration of Pattern-Matching in Multi-Core Architectures*,
Universitat Rovira i Virgili, defended in Tarragona on 8 July 2011, cum laude,
directed by Francesc Serratosa. Eight years, two universities, and an unusual
spread for one thesis: a runtime, a simulator, a compiler, and an algorithm.

## What is in it

- [Tools for parallel machines](/research/parallel-tools/) -- UPC and the Barcelona Supercomputing Center, 2003–2008. OpenMP on a chip with 128 hardware threads, written with IBM Research; OpenMP on a cluster with no shared memory; a simulator of a heterogeneous processor; and a compiler that turns annotated serial C into streams, in a European project.
- [Streams by annotation](/research/streams-by-annotation/) -- the stream compiler by the examples of its own poster: a serial C program becomes a pipeline of tasks by writing in its margin what goes in and what comes out, with what the prototype measured.
- [Graph matching on a desktop](/research/graph-matching/) -- Universitat Rovira i Virgili, 2009–2011. Two computer-vision algorithms rewritten for CUDA and OpenMP on an eighteen-watt desktop, with the measurements: up to forty times faster, without changing the result by a bit.
- [Loops into zones](/research/loops-into-zones/) -- the method of the thesis, step by step: two loop transformations and two annotations that give a serial algorithm the shape of a graphics card, without changing what it computes.

- [One lock at a time](/research/one-lock-at-a-time/) -- in between the two, a year inside a database engine, making its core concurrent: each technique with the speed-up it bought, including the right change that made everything twice as slow.

## What it left

The thesis ends on a sentence I still use: *desktop computers are indeed
desktop supercomputers, not only by their performance, but also by their
complexity*. Its tools were released under the GPL, and its last slide argued
that research software should be published with its sources, the way a paper
is published with its proofs.

And it left a habit. Everything I have built since for other engineers — a
platform, a test harness, a course — starts from the question this started
from: not what the machine can do, but what the person in front of it can be
expected to get right. A small case of it: [the recipe for concurrency](/teaching/raft/) I
wrote a consensus algorithm by, so that students could.

The thesis lists sixteen publications. The record:
[the thesis, at Dialnet](https://dialnet.unirioja.es/servlet/tesis?codigo=99231),
and [what DBLP indexes](https://dblp.org/pid/36/5675).

Use \`ls\` to see the parts, or \`cat parallel-tools\` to read one here.
`},{file:"research/loops-into-zones.md",markdown:`---
title: Loops into zones
summary: The method of the thesis, step by step. Two loop transformations and two annotations turn a serial algorithm into one shaped like a graphics card, without changing what it computes.
order: 4
---

# Loops into zones

A graphics card is not many processors. It is two kinds of parallelism, one
inside the other. Outside, **blocks**: many of them, loosely coupled, which
should hardly talk to each other. Inside each block, **threads**: tightly
coupled, in step, sharing a small memory that is private to the block and
very fast. A program is quick on a card when its work has that same shape,
and slow, whatever else is done to it, when it has not.

I had met that shape before. The NAS multi-zone benchmarks, which had scaled
so well [on Cyclops and over distributed memory](/research/parallel-tools/),
are built the same way: coarse zones outside that barely communicate, fine
loops inside each. So the method of the second half of the thesis is one
sentence: **take the algorithm you have and make it multi-zone**. The rest is
how to do that to an algorithm nobody wrote that way, without changing what
it computes.

## The algorithm

Graduated assignment matches two graphs by refining a matrix of
probabilities, \`P[a,i]\`: how likely it is that vertex \`a\` of one graph is
vertex \`i\` of the other. Each round computes, for every pair,

\`\`\`
Q[a,i] = sum over b, j of  P[b,j] · C[a,i,b,j]
P[a,i] = exp(β · Q[a,i])
\`\`\`

where \`C\` says how compatible matching \`a\` with \`i\` is with matching \`b\` with
\`j\`. Written the way anyone would write it first, it is two loop nests:

\`\`\`
for a in 1 .. R:
  for i in 1 .. R:
    Q[a,i] = 0
    for b in 1 .. R:
      for j in 1 .. R:
        Q[a,i] += P[b,j] · C[a,i,b,j]

for a in 1 .. R:
  for i in 1 .. R:
    P[a,i] = exp(β · Q[a,i])
\`\`\`

Four loops deep over the vertices, \`R⁴\` products a round. It is correct, and
it has no shape at all: every iteration may touch any part of \`P\` and of \`C\`,
so on a card every thread wants both whole, and nothing fits in a block's
memory. The two steps that follow are done to the short nest first, where
they are easy to see, and then to the long one.

## Step one: tile the loops

Replace each index by a tile and a position inside it: \`a = c·B + d\`,
\`i = k·B + l\`. The loop over \`a\` becomes two, one over the tiles \`c\` and one
over the positions \`d\`, and the loop over \`i\` likewise:

\`\`\`
for a in 1 .. R:          before

for c in 0 .. R/B:        after: which tile,
  for d in 1 .. B:        and where in it
    a = c·B + d
\`\`\`

Done to both loops of the short nest:

\`\`\`
for c in 0 .. R/B:
  for d in 1 .. B:
    for k in 0 .. R/B:
      for l in 1 .. B:
        a = c·B + d
        i = k·B + l
        P[a,i] = exp(β · Q[a,i])
\`\`\`

Nothing has changed: the same assignments happen, in the same order. But the
matrices are now visibly cut into sub-matrices of \`B × B\`, and a sub-matrix
is something that fits in a block. These are the zones.

## Step two: reorder the loops

Now move the loops until the nest has the card's shape: the tile loops
outside, the position loops inside.

\`\`\`
for c in 0 .. R/B:            ← blocks
  for k in 0 .. R/B:          ← blocks
    for d in 1 .. B:          ← threads
      for l in 1 .. B:        ← threads
        P[a,i] = exp(β · Q[a,i])
\`\`\`

The long nest gets the same two steps. Its inner indices are tiled too,
\`b = e·B + f\` and \`j = u·B + v\`, and the tile loops \`e\`, \`u\` go outside the
position loops \`f\`, \`v\`:

\`\`\`
for c, k in tiles:                      ← blocks
  for d, l in positions:                ← threads
    Q[a,i] = 0
    for e, u in tiles:                  ← one sub-matrix of P at a time
      for f, v in positions:
        b = e·B + f
        j = u·B + v
        Q[a,i] += P[b,j] · C[a,i,b,j]
\`\`\`

Now the innermost two loops walk one \`B × B\` sub-matrix of \`P\` from corner to
corner before moving to the next, which is exactly what a block's small
memory can hold. One thing is still in the way: \`C\` has four dimensions and
no sub-matrix of it is small. So \`C\` is replaced by what it is made of — the
adjacency of each graph and the compatibility of their attributes — four
small factors that can each be fetched a sub-matrix at a time.

Reordering is where a programmer knows what a compiler does not: that these
iterations do not depend on each other. Compilers tile and reorder loops by
themselves when they can prove it is safe, and here they cannot.

## Step three: say it in the margin

The loops now have the right shape; what is left is to say which is which.
Two annotations, in the manner of OpenMP:

\`\`\`
#pragma hy parallel for [into(threads)] [reduction(OP:r)]
#pragma hy parallel fetch(m : sizes : origin : indexes [: permutation])
\`\`\`

\`parallel for\` alone spreads a loop across blocks; with \`into(threads)\`,
across the threads of a block. \`parallel fetch\` copies a sub-matrix of \`m\`
into the block's private memory and redirects every access inside the
statement to the copy, in whatever order of dimensions keeps the accesses
contiguous; if the statement writes to it, it is flushed back. It comes from
the \`peek\` of [the stream compiler](/research/parallel-tools/) of the first
half.

On a processor, \`into(threads)\` and \`fetch\` are ignored and the rest is
OpenMP. **The same source is the CPU version and the GPU version**, which is
what the whole thesis had been after: a serial program, still readable, with
its parallelism written beside it.

## One algorithm, two parallelisations

The method does not give one answer, and that turned out to be a result.

Large graphs :: The graph does not fit in a block. Tile it, as above, and let blocks work on different sub-matrices. It scales with the size of the graph — up to 1,024 vertices, where the serial version was estimated at forty-two days and not run — and is poor on small graphs, which do not have enough tiles to fill a card.
Many small graphs :: A whole graph fits in a block. So a block is a graph: the outer level is many matchings at once that never talk to each other, the inner level is one matching. That is a multi-zone program exactly, and it is the one [measured against OpenMP and one thread](/research/graph-matching/).

The common labelling of many graphs is a different algorithm, and the method
carried over: reordering to find loops that several parts of it shared and
merge them into tightly coupled kernels, and fission to split what did not
belong together. Of the tile sizes tried, \`B = 8\` was the best for CUDA.

## What it does not change

The result. Tiling and reordering move the same operations around; they do
not approximate, drop or relax anything, and the thesis reports the parallel
versions giving the same values as the serial one. That matters more than
the speed: a faster algorithm that answers slightly differently is a new
algorithm, and has to be validated again by the people who trusted the old
one. This one does not.
`},{file:"research/one-lock-at-a-time.md",markdown:`---
title: One lock at a time
summary: Making a database engine's core concurrent, one technique at a time, each with its number — including the right change that made everything twice as slow.
order: 5
---

# One lock at a time

For a year I worked inside a database engine. It was not mine — everything
that makes it a database was there when I arrived — and I worked all over it.
This page is about one part of that year: making its core concurrent. It ran
under one global lock, and that is worse than it sounds.

What follows is about the techniques, which are anybody's, and about what
each one bought, which I measured. How the engine is made inside is its
owners' business, and is not here.

## Where it started

The benchmark was a standard one: twenty queries, run by 1, 2, 4, 8 and 16
threads at once, three times each after a warm-up. Every figure on this page
is a speed-up against the same thing: the original engine, doing the same
work with one thread.

\`\`\`bars
speed-up, the original engine
= 1 :: one thread alone
2 threads :: 0.62
4 threads :: 0.67
8 threads :: 0.78
\`\`\`

Below one, all the way. Eight threads finished the work in a quarter more
time than one thread would have needed. A global lock does not merely fail to
help: the threads spend their time handing it to each other.

## Measure the locks, not the program

A profiler says where the time goes. It does not say who was waiting for
whom. So I put counters inside the locks themselves: how many times each was
taken, and how many of those found it already held.

The answer was not spread out. One lock was taken 93 million times in a run,
and 6.6% of those collided; every other lock sat near zero. That redirected
the whole effort.

## The steps, and what each one bought

Every step lived on a branch of its own and was run through the same
benchmark, so each has a number. Speed-up with eight threads:

\`\`\`bars
speed-up with eight threads, as each technique went in
= 1 :: the original with one thread
where it started: one global lock :: 0.77
scratch space of each thread's own :: 0.75
readers share, writers exclude :: 0.36 !
a lock replaced by atomic counters :: 2.41
the hottest path made lock-free :: 2.82
one lock split into many :: 3.34
the same, tuned :: 4.39
\`\`\`

Six techniques, and none of them is exotic.

Thread-local scratch space :: What every operation scribbles on while it works stops being shared. On its own it bought nothing, because nothing could run side by side yet to fight over it; it had to be there before anything else could work.
A shared/exclusive lock :: Queries read and rarely write, so the one lock becomes shared for readers and exclusive for writers, swapped in a critical section at a time.
Atomic counters :: Where a lock only protected a count going up and down, the count becomes atomic and the lock goes.
A lock-free hot path :: The operation every query performs thousands of times is rewritten around compare-and-swap: read the state, compute the new one, swap only if nobody moved it, and undo if a second thing it depends on changed meanwhile.
Finer granularity :: What is left of that lock is split: one lock for each part of the structure instead of one for all of it, so that two threads collide only when they want the same part.
Positional I/O, and ordered locking :: Files read and written by position, so that a file needs no lock just to keep its cursor still; and whenever several locks must be held at once, they are taken in order of memory address, which is the whole of deadlock avoidance when you can do it.

## The bar that went the wrong way

The marked bar is the one worth the page. Letting readers in together was
the right change, and it made everything twice as slow.

Why would letting readers in be slower than making them queue? Because of
what is underneath. With one exclusive lock at the door, a thread waits once,
and then finds every lock inside free: they are all taken and released with
nobody else asking, which costs almost nothing. Open the door and the readers
meet at every one of those inner locks instead, many times an operation, and
a thread that finds a lock taken gives up the processor and has to be woken
again. My notes of the time say it in a line: *each conflict means losing the
CPU*. One long queue had been traded for thousands of short ones, each with a
sleep in it.

The next bar says which lock it was. Replacing one inner lock by atomic
counters, and nothing else, took the same benchmark from 0.36 to 2.41. Nearly
every query had slowed down by the same factor under the shared lock, and
nearly every one came back with that single change.

A concurrent program is only as wide as its narrowest lock, and widening any
other makes the queue at that one longer. Coarse to fine is the right
direction, and the first step along it can cost you, until the last of the
narrow places is gone.

## Which lock

Which primitive, too, mattered more than I expected. I timed some twenty
combinations of mutex and lock — POSIX's, spins, futexes, condition
variables, with priority for readers or without — and on the same query with
eight threads the slowest took eight times as long as the fastest.

The lock I ended with has five states. Readers see three of them, and the
one called *closing* is where its fairness is: once a writer has asked, no
new reader gets in, so a stream of readers cannot starve it.

\`\`\`flow
free[Free] -->|a reader enters| shared[Shared\\nreaders counted in and out]
shared -->|a writer asks| closing[Shared, closing\\nno new readers]
closing -->|the last reader leaves| free
\`\`\`

Writers see the other two, and the same idea the other way round: whoever
asks while a writer is inside is remembered, and woken when it leaves.

\`\`\`flow
idle[Free] -->|a writer enters| exclusive[Exclusive]
exclusive -->|someone asks| awaited[Exclusive, awaited]
awaited -->|the writer leaves, and wakes them| idle
\`\`\`

## Write it down first

Before writing the lock-free path I wrote it down: every atomic step
numbered, each with its precondition and postcondition, under the invariants
of the whole, and drew its states. A first attempt, without that, had been
thrown away for its bugs. No test finds the interleaving that happens once a
week; an invariant does.

## Where it ended

The same benchmark, the same machine, at the end of the year:

\`\`\`bars
speed-up at the end of the year
= 1 :: the original with one thread
1 thread :: 1.24
2 threads :: 1.93
4 threads :: 3.07
8 threads :: 4.39
16 threads :: 4.42
\`\`\`

Faster than the original even with a single thread: a lock nobody contends
for still costs something, and most of them were gone.

From 0.78 to 4.39 at eight threads. The queries that mostly read went
further: 7.0 for the best of them, and above 6 for three more. One query of
the twenty never scaled at all: 0.83 at sixteen threads.

Sixteen threads added nothing over eight. And it was not finished when I
left: the most advanced version still had bugs open.

## The other half: tasks

Making an engine safe for threads is no use to someone who cannot write
threads. So its programming interface got a small framework of tasks: serial,
parallel and for-each, with cancellation, and exceptions that arrive where
the task was started. The benchmark's queries were rewritten on it to see
whether it held.

It is the same idea as [my thesis](/research/), which it sat in the middle of, and as
[the recipe I used for Raft](/teaching/raft/) four years later: the machine
being parallel is the easy part.
`},{file:"research/parallel-tools.md",markdown:`---
title: Tools for parallel machines
summary: UPC and the Barcelona Supercomputing Center, 2003–2008. OpenMP on a chip with 128 threads and on a cluster with no shared memory, a simulator of a heterogeneous processor, and a compiler that turns serial C into streams.
order: 1
---

# Tools for parallel machines

The first half of [the thesis](/research/), at UPC and the Barcelona
Supercomputing Center between 2003 and 2008. Four pieces of work with one
aim: that a program written one line after another can be made parallel by
annotating it, a line at a time, on machines that make that hard.

OpenMP on many cores :: IBM's Cyclops put 32 cores and 128 hardware threads on one chip, with small caches. A first port of OpenMP to it had scaled poorly. I found why: the threads' stacks were fighting over the same cache lines. I fixed it twice, once in the runtime and once as a change proposed to the hardware, and showed scalability 40% to 100% better than the earlier port, and speed-ups above 80 on the multi-zone benchmarks. Written with IBM T.J. Watson Research; I am first author. [IPDPS 2005](https://doi.org/10.1109/IPDPS.2005.317).
OpenMP without shared memory :: The same annotated programs running on a cluster, over software distributed shared memory instead of MPI. It works, and it works best on programs with two levels of parallelism, coarse outside and fine inside. That observation came back six years later.
A simulator of a heterogeneous chip :: CellSim, a modular simulator of the Cell processor, built by two teams; I am third author of its papers. The accelerator cores are the other team's. Ours was the rest, and what I wrote is its base: the general-purpose core, which is an interpreter of its PowerPC instructions; the emulation of the operating system under it, where a system call runs natively and reaches into the simulated program's memory as it needs to; the loader that puts a compiled binary in that memory; and the protocol by which modules talk to each other purely as memory accesses, so that any of them can be connected to any other. A program compiled for the real chip ran on it unchanged: only the library of system calls and threads had to be swapped for mine. My thesis calls the protocol its best contribution. [The paper, at the BSC](https://www.bsc.es/ca/research-and-development/publications/cellsim-cell-processor-simulation-infrastructure).
A compiler for streams :: In the European project ACOTES, with NXP, IBM Haifa, INRIA and STMicroelectronics: annotations that turn a serial C program into a pipeline of tasks passing data along. Two clauses, \`input\` and \`output\`, are enough. I wrote the ACOTES phase of the BSC's Mercurium compiler — the compiler itself is not mine — with its runtime library and a tracing library. [The model, by its own examples](/research/streams-by-annotation/). [SAMOS 2007](https://doi.org/10.1007/978-3-540-73625-7_13), and the consortium's paper in the [International Journal of Parallel Programming](https://doi.org/10.1007/s10766-010-0132-7).

## In numbers

The Cyclops chip had 32 cores and 128 hardware threads, and caches small
enough that how the threads were laid out over them decided everything.

\`\`\`bars
speed-up on one Cyclops chip, as the thesis and its defence state it
= 32 :: one for each core
the earlier port of OpenMP, 128 threads :: 15
the NAS multi-zone benchmark SP, 127 threads in 16 groups :: 80 !
\`\`\`

Past the line, because a core there ran four threads at once and the
multi-zone programs kept every one of them fed. The fix for the cache
conflict alone, without touching the programs, was worth 10% to 70% done in
the runtime, and 40% to 100% as the change proposed to the hardware. The
programs that did not balance their work across threads stopped near 30
whatever was done for them, which is its own lesson.

On the cluster with no shared memory, the same annotated program came close
to its hand-written MPI version, and was far easier to write and keep. And
the stream compiler took an FM radio written as plain serial C and ran it 3.5
times faster as a pipeline, with nobody drawing the pipeline by hand; the
limit was one filter heavier than all the others.

## What connects them

Each piece took away something OpenMP assumed: that caches were large, that
memory was shared, that the cores were all alike, that the program was a loop
rather than a stream. What survived every time was the way of working: keep the serial program, keep it readable, and
say in the margin what may run together. The thesis calls it incremental
parallelisation, and its conclusions call it the corner stone of everything
else in it.

Next: [what all this was for](/research/graph-matching/).
`},{file:"research/streams-by-annotation.md",markdown:`---
title: Streams by annotation
summary: A serial C program becomes a pipeline of tasks by writing in its margin what goes in and what comes out. The model, by the examples of its own poster, and what the prototype measured.
order: 2
---

# Streams by annotation

A radio, a video decoder, a filter: a program that reads a value, works on
it, writes a result, and does it again for ever. Written in C it is a \`while\`
loop. Run on several cores it should be a pipeline, every stage on a core of
its own with the data flowing between them — and the usual way to get there
is to throw the C away and write it again in a streaming language.

The stream programming model of the European project ACOTES, which is [the
compiler I wrote](/research/parallel-tools/) at the Barcelona Supercomputing
Center, does it the way OpenMP does loops: **the program stays, and the
pipeline is written in its margin**. What follows are the examples of the
poster it was presented with at HiPEAC's summer school in 2008, which I
signed with Roger Ferrer, Xavier Martorell and Eduard Ayguadé.

## From plain C, one line at a time

A program that turns capitals into small letters:

\`\`\`c
int main()
{
  char c;

  while (fread(&c, sizeof(c), 1, stdin)) {

    if ('A' <= c && c <= 'Z')
      c= c - 'A' + 'a';

    fwrite(&c, sizeof(c), 1, stdout);
  }
  return 0;
}
\`\`\`

First say where the stream is. One line, and the program still runs exactly
as it did, because a compiler that does not know the annotation ignores it:

\`\`\`c
  #pragma acotes taskgroup
  while (fread(&c, sizeof(c), 1, stdin)) {
\`\`\`

Then say what the stages are, and what each takes in and gives out:

\`\`\`c
  #pragma acotes taskgroup
  while (fread(&c, sizeof(c), 1, stdin)) {

    #pragma acotes task input(c) output(c)
    if ('A' <= c && c <= 'Z')
      c= c - 'A' + 'a';

    #pragma acotes task input(c)
    fwrite(&c, sizeof(c), 1, stdout);
  }
\`\`\`

That is the whole of it. From \`input\` and \`output\` the compiler isolates each
task's code, works out who feeds whom, and builds the graph:

\`\`\`flow
read[the loop\\nfread] -->|c| lower[task\\nto lower case]
lower -->|c| write[task\\nfwrite]
\`\`\`

Three things run at once: the loop reading, the first task converting the
character before, the second writing the one before that. Add a suffix,
\`output(c:bp)\`, and the values travel in blocks instead of one at a time,
which is where most of the speed of a stream is.

The point of doing it a line at a time is that the program works after every
line. It can be debugged serially, the annotations can be switched off, and
the code that was already written and trusted is still the code.

## A task with a memory

Real filters remember things. A task's variables are its own, and the
annotation says how they start and how they end:

\`\`\`c
  #pragma acotes task input(v) output(o) \\
          copyinstate(stats) copyoutstate(stats) \\
          initializestate(buff) finalizestate(buff)
  {
    o= compute_buffer(buff, v);
    stats++;
  }
\`\`\`

And a filter that needs the last few values does not have to keep them
itself. \`peek\` gives the task a window on its input stream, so the task stays
without state and nothing is copied:

\`\`\`c
  #pragma acotes task copyinstate(i, a[3]) input(v) output(o)
  {
    #pragma acotes peek(v;a)
    {
      a[2]= a[1];  a[1]= a[0];  a[0]= v;
    }
    o= a[0]*.25 + a[1]*.5 + a[2]*.25;
  }
\`\`\`

## Splitting a task that is too slow

A pipeline runs at the speed of its slowest stage. When one task is the
bottleneck, it is split: \`team(3)\` makes three instances of it, a replicator
deals the input out among them and a merger puts the results back in order.

\`\`\`c
  #pragma acotes task team(3) copyinstate(a[3]) inputreplicate(c) output(o)
  {
    #pragma acotes teamreplicate
    h(c, a)

    o= ffd(c, a);
  }
\`\`\`

\`\`\`flow
read[the loop\\nfread] --> deal[replicator]
deal --> one[ffd · instance 1]
deal --> two[ffd · instance 2]
deal --> three[ffd · instance 3]
one --> merge[merger]
two --> merge
three --> merge
merge --> write[task\\nfwrite]
\`\`\`

The difficulty is that the task has state, and three copies of a task with
state compute three different things. \`teamreplicate\` marks the part that
updates the state, and that part runs in *every* instance for *every* value,
so each copy's state stays exactly what the single task's would have been;
only the expensive part is shared out. Data parallelism, from a task that was
not data-parallel.

A loop that is already in the program can be used the same way:
\`forreplicate(i)\` turns its iterations into instances, and a \`port\` says
which elements of an array go to which. And tasks that are not in a pipeline
at all — a microphone being played while a keyboard changes the volume — can
share a value with \`async\`, \`update\` and \`check\`, the programmer deciding
when it is looked at.

## What it measured

The prototype compiler and its runtime ran on a machine with four cores. They
were a proof that the model could be compiled, not an attempt to be fast, and
the numbers should be read that way.

\`\`\`bars
speed-up of the FM radio on four cores
= 4 :: one for each core
tasks and pipeline only :: 3.5
\`\`\`

An FM radio written as plain C, annotated, and turned into a stream program
by the compiler with nobody drawing the graph by hand: 3.5 times faster on
four cores. What held it back was one filter much heavier than the rest, the
FFD. Give that one task a \`team\` and, in the thesis's words, the radio *is
able to use effectively all four available cores*. A Wi-Fi 802.11a receiver
scaled slightly better than the number of cores.

Replicating the FFD alone scaled poorly with the radio's own parameters — the
runtime's overhead was larger than the work — and well once the filter was
made heavier, as well as the same filter did in StreamIt, the streaming
language it was being compared with. Which is the honest summary of the whole
model: the same three kinds of parallelism as a language designed for them —
task, pipeline and data — from a C program that was never rewritten.

The FM radio, taken from GNU Radio's examples and stripped down to pure
serial C, is one of the tools the thesis released. The
[compiler](https://github.com/drpicox/acotescc), its
[runtime](https://github.com/drpicox/acolib) and the
[tracing library](https://github.com/drpicox/mintaka) are public, under the GPL.
`},{file:"talks/index.md",markdown:`---
title: Talks
summary: Twenty-one years of them: two international conferences as first author, the Barcelona JavaScript circuit of 2013–2017, and since 2022 talks about algorithms for people who do not write them.
order: 70
---

# Twenty-one years  
of standing up  
and explaining.

The archive holds more than sixty decks between 2013 and 2024, and about forty
occasions I can date and name. The early ones were written as repositories, so
they could be read and run, and they are still on GitHub: [GruntJS](https://github.com/drpicox/tutorial-gruntjs-v1),
[Promises](https://github.com/drpicox/tutorial-promises-v1), [JS & Patterns](https://github.com/drpicox/tutorial-jspatterns-v1),
[AngularJS for designers](https://github.com/drpicox/tutorial-angulardesigners-v1). Most of the rest
were written for a room.

## The one I am proudest of, and never put on a CV

On **21 June 2016** I moderated a public Q&A with **Miško Hevery**, who created
AngularJS, at the FIB, the computing faculty of the UPC in Barcelona. My deck
for it is not slides. It is the list of questions: dependency injection, the
hierarchical injector, why TypeScript, what the web looks like in five years.

## BarcelonaJS and the Barcelona meetups

2013 to 2017 were the years of the meetups. I spoke at BarcelonaJS and helped
organise it, and co-organised the WeNode conference in 2014. In 2022 and
2023 I went back to it, twice.

2013-05 :: **[GruntJS](https://github.com/drpicox/tutorial-gruntjs-v1)**, BarcelonaJS.
2013-09 :: **[Promises](https://github.com/drpicox/tutorial-promises-v1)**, BarcelonaJS -- promises against callbacks, when that was the argument.
2014-05-25 :: **[JS & Patterns](https://github.com/drpicox/tutorial-jspatterns-v1)**, BarcelonaJS. Given again a year later.
2016-01-29/31 :: Three talks across one weekend at the **first AngularCamp Barcelona** -- an un-conference backed by Google Developers, born out of the AngularBeers meetup: *Angular Community and API Decisions*, *MVC: the Model, the great forgotten*, and *Modules in Angular 2*.
2016-03 and 2016-07 :: **MVS: MVC in Angular**, twice, the second time with exercises.
2016-06 :: **The Bowling Game Kata**, twice in a fortnight. It is [still here](/teaching/kata/).
2016-11 → 2017-12 :: **Testing**, four times, and each time a different room: a workshop, then *from the company to the university and back*, then *company, university and professionalism*.
2017-03-17 :: **Jornades de l'Institut Bernat el Ferrer**, Molins de Rei -- a secondary school. The history of software engineering from Dijkstra in 1968 to Agile in 2001, TDD with a calculator, and how to get into university.
2022-10-25 :: **[TDD is not a stupid idea, it's brilliant](https://www.meetup.com/barcelonajs/events/289045382/)**, BarcelonaJS -- an open meetup, hosted in the Travelport office, with two of my former students in the audience.
2023-04-25 :: **[Redux and Domain-Driven Design](https://www.meetup.com/barcelonajs/events/293039826/)**, BarcelonaJS, again in the Travelport office -- how much the two have in common, and what an implementation gains by taking the design principles they share from both.

## Before that, the conferences

2005 :: **IPDPS**, Denver. First author and speaker on *Optimizing NANOS OpenMP for the IBM Cyclops multithreaded architecture*, with co-authors from IBM T.J. Watson.
2006 :: Co-organiser of the **7th IEEE/ACM Grid Computing Conference**, Barcelona.
2007 :: **HiPEAC industrial workshop** at IBM Haifa, on the Cell simulator.
2011 :: **GbR**, Münster. First author and speaker on parallel graph matching on GPGPUs -- Springer LNCS 6658.
2012 :: Co-organiser of the graph-database track at **FOSDEM**.

## Inside companies, 2017–2023

Training weeks on JavaScript, React and Redux, run twice, in Barcelona and in
Denver. Brown bags and TAST sessions. Sessions on TDD and BDD for teams in two
countries, one of which someone recorded and passed around.

## Since 2022: algorithms, for people who do not write them

Data, algorithms and generative AI, for neighbours, families and teachers --
the audience that has to make decisions about all three and was never given
the vocabulary. Since 2024 mostly with [Aixeca el cap](https://aixecaelcap.cat/),
a platform for a responsible use of screens, of which I am a member.

It began a year earlier, in front of my own profession.

2021-11-26 :: **Realitats ètiques d'avui i demà a les professions informàtiques**, a round table at La Lul·liana 2021, the yearly celebration of COEINF, the college of computer engineers of Catalonia. I was the developer, beside a sociologist, a CIO and a lawyer. I spoke of the six months I had spent in the pilot of GitHub Copilot, and how fast it had changed; of software that has killed people, and the oath Robert C. Martin asks programmers to take; and of TDD as a discipline. Asked at the end who is responsible for the code a machine writes, I said the programmer: whoever accepts the change, and with the test written first, knows what they accepted. [The college's account](https://enginyeriainformatica.cat/letica-lenginyeria-informatica-i-la-3a-edicio-talent-tic-a-la-lulliana-2021/); the video [from my first turn](https://youtu.be/v1GHzQGZtfg?t=5981), and [that answer](https://youtu.be/v1GHzQGZtfg?t=9504).

2022-10-15 :: **Algorismes i Intel·ligència Artificial, influència en la vida quotidiana** -- the opening talk of the XXII Fòrum TIC Social, the open-air evening that Llefi@net, the citizens' network of Llefià, has held in Plaça Trafalgar in Badalona every summer since 2000. [The slides](https://llefia.org/wpforum/wp-content/uploads/sites/10/2022/10/Algorismes_i_IA_a-_la_vida_quotidiana.pdf) and [their account of the evening](https://llefia.org/blog/2022/11/19/cronica-xxii-forum-tic-social-de-badalona/) are on llefia.org.
2024-07-06 :: **Impacte social de la Intel·ligència Artificial**, the same forum two summers on, in conversation with Ariel Guersenzvaig and Xavier Vinaixa -- and the talk that followed, on screens at school, whose slides I wrote with Marina Gispert. [Documents and video.](https://llefia.org/blog/2024/07/07/documents-i-videos-xxiii-forum-tic-social-2024/)
2025-02-05 :: **Els nostres fills no són un experiment**, invited to *III Jornada. L'educació a debat*, at the Universitat Pompeu Fabra. [The session is on the university's channel.](https://youtu.be/4i-mpwbL7Fg)
2025 → 2026 :: **Vols una galeta?** -- Sabadell, Barcelona, Altafulla, Sant Celoni, Teià, el Masnou. It grew from 125 slides to 188, and then I cut it to 54, which took eight drafts of the script and is the version I would give again.
2026-03-27 :: **Qui crIA els teus fills?**, Escolàpies, el Masnou. Commissioned and paid for by the parents' association -- the only one anybody has ever paid me for. They then recommended me to the town council, which is how the last one happened.
`},{file:"teaching/adventure.md",markdown:`---
title: Sixty-four rooms
summary: UPC, 2007. A text adventure as the lab of a first-year course, built so that four traversal-and-search schemas were all a student needed. Playable.
order: 2
---

# Sixty-four rooms

In the autumn of 2007 I taught the lab of *Introducció als Ordinadors* at the
UPC: first year, first term, first programs in C. The lab was a text
adventure. It is small — one file of C, six hundred lines, and three text
files it reads at the start — and it is playable, here, exactly as it was:

::adventure

The game was written in Spanish for the class and is translated here, word
for word; its own words still work at the prompt — \`norte\`, \`sur\`, \`este\`,
\`oeste\`, \`coger\`, \`atacar\` — beside the English ones. You start in the south-west corner with sixteen points of life and
nothing in your hands, and the pantry is one room away through a door you
have no key for. The map fills in as you go.

## Four schemas, and nothing else

A first-year student cannot yet hold a program in their head. What they can
hold is a recipe. So the course taught **four schemas** and the lab was
designed so that four schemas were all it took:

\`\`\`
traversal, without a mark        search, without a mark
  first();                         found = 0;
  while (more()) {                 first();
    e = get();                     while (more() && !found) {
    treat(e);                        e = get();
    next();                          if (is_it(e)) { treat(e); found = 1; }
  }                                  next();
  finish();                        }
                                   finish();
\`\`\`

and the same two again *with a mark*, for a sequence that ends in a sentinel
rather than a count — a file, a line ending in a full stop. Every problem in
the lab is one of the four, with \`first\`, \`more\`, \`get\`, \`treat\` and \`is_it\`
filled in for the case at hand: reading the items file is a traversal with a
mark (end of file); finding the monster a room names is a search over a list;
the game loop itself is a traversal with a mark, the mark being the word
\`salir\`. The theory sheet said so in as many words: *decide which of the four
it is, then replace each operation for the case*.

The data structures followed the same rule. A list is an array and a count.
A room is a record: a name, a description, four exits, what it holds. The
world is a matrix of rooms, eight by eight, so that *north* is \`i + 1\` and
*east* is \`j + 1\` and there is no graph to traverse, only a grid to index.

## The map came first

I drew the map on squared paper before anything else, so that it would be
worth exploring: the house in the south-west corner, the orchard and the
farm along the south, the river across the middle, the forest to the
north-east and the caves to the north-west, and the pantry — the goal — one
locked door from where you start. Then I typed it into \`habitaciones.txt\`,
one room at a time, each with its four exits and what it holds.

Everything the game knows is in those three files, and a student could
change any of it without touching the C: add a room, move a monster, invent
a weapon. The program reads them with \`fscanf\` and a format string, which is
its own small lesson in what a sequence is.

## What it does not do

Kill you. The check on the player's life is in the source, commented out: a
first-year lab is not the place to lose. So the numbers were never balanced
for survival, and the last fight, as it happens, costs exactly the sixteen
points there are. A door you open stays open only from the side you opened
it. And one line of the rooms file had a typo that left the bridge in the
forest without its gnome; here the gnome is on his bridge, which is the one
thing changed.
`},{file:"teaching/fishing-lagoon.md",markdown:`---
title: The fishing lagoon
summary: A lab from 2018 where the assignment is a commons: a lagoon whose fish breed if left alone, bots that share it, and a tit-for-tat that only cooperates with those who do. Play it, and seat your own bot.
order: 3
---

# The fishing lagoon

Tecnocampus, spring 2018, *Laboratori de Software 1*. Eighteen years after
[the fish auction](/projects/fish-market/) I set a class the same shape of
problem turned inside out. There, buyers competed for fish somebody else had
caught. Here, the fish are still in the water, they breed if they are left
alone, and the bots have to decide how much to take from a lagoon they
share. The starter is public:
[fishing-lagoon-starter](https://github.com/drpicox/fishing-lagoon-starter).

The rules fit in a paragraph. A round is a lagoon with some fish in it and a
number of weeks. Before the round, each bot hands in its orders for every
week — a number of fish, or a rest — knowing who else is on the lagoon and
what happened in earlier rounds, but not what the others will order now.
Each week the lagoon serves the smallest order first, whole, and splits
what is there between equal orders when it does not stretch; then the fish
that are left breed, half as many again. A bot's score is what it caught.

::lagoon

**Play a round** and the board shows the week by week: what each bot
caught, in grey when it got less than it asked for, and what was left in
the water. **Play five** and the season builds; the tit-for-tats remember.
The 40% bot starts on the bank. **Seat your own bot** below and it plays too.

## What there is to see

Three fish left alone become four, six, nine, thirteen, nineteen,
twenty-eight, forty-two, sixty-three, ninety-four. A hundred fished by
nobody for nine weeks are over three thousand in the tenth. So the most a
lagoon can give is everyone resting until the last week and splitting what
grew — and every fish taken early is one that would have bred.

Play the first round as it is set. The lagoon grows all round, to about six
hundred, and the two tit-for-tats rest and take their share the last week.
But the bot that takes 10% of what it believes is there ends the round with
the most, nearly three times what either of them got: it fed on their
patience, a tenth a week of a lagoon they were letting grow. And in the
last week, when the tit-for-tats finally order, the smaller orders are
served first — they always are — and the two of them split what is left: a
quarter of what they had planned on.

Now tick **40%** and play again. It takes forty the first week and the
lagoon is empty by the third; nobody catches anything after that, not the
bot that only ever asked for one. Play a second round and watch the two
tit-for-tats: they take a full share from the first week now, and the 40%
bot ends with half of what it got before. That is the strategy the starter
shipped as the one worth beating. **Tit for tat** rests every week but the
last and takes one share. But whoever took a full share or more in the
first week of a round is a traitor, for good, and on a lagoon with a traitor
tit for tat takes a full share every week itself, so that the traitor
cannot grow rich on its patience. Two of them cooperate; against a greedy
bot they take back what they can. Its test is the first week only, which is why it
never turns on Power, which rests the first week and takes everything in
the last two — the kind of hole a student finds by losing to it.

## Why a software lab

The subject was software, not game theory. What a student had to build was
the strategy behind an interface of three methods — where to sit, what to
order, what to learn from the round — against a server the class shared, and
the lagoon itself came with its tests: the breeding sequence, the smallest
order served first, a bot that fishes more than there is. The commons was
there so that the strategy was worth testing: a bot's orders depend on what
it believes the lagoon will hold, and that belief is a small simulation of
the rules, which is wrong the first time everyone writes it.

## Your own bot

Under the board is an editor with the body of a JavaScript function. It is
given \`fish\`, what the lagoon starts with; \`weeks\`; \`bots\`, the names on the
lagoon; \`me\`; and \`rounds\`, every round played so far, each with everyone's
orders, the weeks as they went, and the totals. It returns your orders: one
number a week, 0 to rest. It starts out as the cooperative half of tit for
tat, so the first bot you seat is a good neighbour — the first thing to try
is being a bad one, and then watching what the two tit-for-tats do to you
in the round after. A mistake in it is shown in the engine's own words and
your bot rests that round. It runs in your browser and stays there.
`},{file:"teaching/index.md",markdown:`---
title: Teaching
summary: Courses I taught and what I built for students to stand on: a lab whose specifications are blog posts that compile into tests, a text adventure, a commons of fish that breed, Raft through a recipe for concurrency, and a kata.
order: 60
---

# Teaching

I have taught at three universities. The first time was in 2002, through the
UPC's foundation: computing for people between 65 and 97 years old; five years
later, at the UPC itself, the first programs of the first year. In the courses
below I ended up building what the students stood on, so that the difficulty
they met was the one the course was about and not three others.

- [The post comes first](/teaching/software-lab/) -- Tecnocampus, six autumns, 2017 to 2022. *Laboratori de Software 2*: teams building a game the way software is built, where a feature starts as a blog post in markdown that compiles into a test for the server and a test for the client, the writer of a post is never its coder, and the grades are read from the repository's history.
- [Sixty-four rooms](/teaching/adventure/) -- UPC, 2007, *Introducció als Ordinadors*. A text adventure as the lab of a first-year course, built so that four traversal-and-search schemas were all a student needed, on a map drawn on squared paper first. Playable.
- [The fishing lagoon](/teaching/fishing-lagoon/) -- Tecnocampus, 2018, *Laboratori de Software 1*. A lab whose assignment is a commons: a lagoon whose fish breed if left alone, bots that share it and hand in their orders blind, and a tit-for-tat that cooperates only with those who do. Play it, and seat your own bot.
- [Raft, and a recipe for concurrency](/teaching/raft/) -- UOC, the distributed systems laboratory, 2013. A consensus algorithm as the assignment, the year before its paper was presented, and the three steps -- copy inside the guard, work outside it, check before writing -- that let someone writing their first concurrent program get it right.
- [The Bowling Game Kata](/teaching/kata/) -- Robert C. Martin's kata, as I gave it twice in June 2016, with the slides and a repository to do it in JavaScript or Java.

At the Tecnocampus, between 2017 and 2023, I designed three subjects from
scratch -- *Enginyeria del Software III*, *Laboratori de Software 2* and
*Arquitectura de Serveis* -- with a first-year lab, a front-end course and
final-project tutoring around them.

Use \`ls\` to see them, or \`cat software-lab\` to read one here.
`},{file:"teaching/kata.md",markdown:`---
title: The Bowling Game Kata
summary: Robert C. Martin's kata, with slides and a repository to do it in JavaScript or Java.
order: 5
was: /kata/
---

# The Bowling Game Kata

Robert C. Martin published the Bowling Game Kata in 2005 at
[butunclebob.com](http://www.butunclebob.com/ArticleS.UncleBob.TheBowlingGameKata).

He describes the kata intention as:

> A kata is meant to be memorized. Students of a kata study it as a form, not as
> a conclusion. It is not the conclusion of the kata that matters, it's the
> steps that lead to the conclusion. If you want to lean to think the way I
> think, to design the way I design, then you must learn to react to minutia the
> way I react. Following this form will help you to do that. As you learn the
> form, and repeat it, and repeat it, you will condition your mind and body to
> respond the way I respond to the minute factors that lead to design
> decisions. -- Robert C. Martin

It contrasts with other katas that you might know. It is not an exercise of the
resolution of a problem; it is the study of each step to create a solution.

The intention is to show and learn TDD. This kata is a profound study of the
TDD. It presents a list of steps that you must follow in a TDD development.

The way of the kata is simple: repeat step by step, innovate nothing, replicate
what you see. Be careful, do not add extra steps; do not skip any step.

Although you have the code, do not copy blindly. Try to understand each step;
try to see the beauty. Enjoy how the code takes form and how the test transforms
itself. Learn how tests leverage in the code and how the code leverages on
tests. Code changing the internal representation step by step, first adding the
new representation, then adding the setters, changing the getters, and finally
removing the old code. And all in green.

And repeat, and repeat. Once you have finished the kata, wait a week, and repeat
it. Then, wait a few weeks and repeat. Then wait a month and repeat. And then,
repeat the kata twice a while.

## Updated kata

Here you have the slides and the instructions to do the kata in JavaScript and Java.

1. Download the slides for [JavaScript](/docs/BowlingGameKata-JS.pdf) or [Java](/docs/BowlingGameKata-Java.pdf)
2. Clone the repository at [JavaScript](https://classroom.github.com/a/jLHCISqT) or [Java](https://classroom.github.com/a/BC1YAdho)
3. Follow the steps of the kata

There are three sections in the slides:

- The Kata analysis: it replicates the study of a developer of the problem.
- TDD Overview: it explains what is TDD
- The Kata

The last section is the exercise itself. Each slide is meaningful by itself and
deserves a moment of attention. If you look carefully, some slides have a
message on the top right in orange: «commit X.» It starts at zero and increments
in one each time that appears. Some slides also have a green or a red bar; it
represents the current state of tests. Red if tests are failing, green if tests
pass after the current slide.

The code is in a git repository. It starts in the «commit 0,» and it expects
from you to replicate each slide in it. Be careful, and go slide by slide. Each
time that you finish copying the changes of a slide verify two things: the
commit number and the test bar status. If the test bar status matches the
condition of your current tests, and there is a commit number, then commit the
git repository with the commit number as a message. Once you have finished it,
remember to push changes.
`},{file:"teaching/raft.md",markdown:`---
title: Raft, and a recipe for concurrency
summary: A consensus algorithm as a laboratory assignment in 2013, and the three-step recipe that lets someone who has never written concurrent code get it right.
order: 4
---

# Raft, and a recipe for concurrency

In the autumn of 2013 the distributed systems laboratory at the UOC set its
students a consensus algorithm to implement: Raft, which was then a draft
going round, a year away from being presented. I worked on that laboratory,
and [my implementation is public](https://github.com/drpicox/uoc-raft-2013p):
one Java class over the course's skeleton, dated October 2013.

Raft was designed to be understandable, and it is. The hard part of the
assignment is somewhere else. A server is doing four things at once —
timing out, asking for votes, answering other servers' requests, replicating
its log — every one of them reads and writes the same few fields, and between
any two lines the network may hand it a message that makes it a different
kind of server. That is a lot to ask of someone writing their first
concurrent program.

## The recipe

So the implementation follows a recipe simple enough to be followed by
someone who cannot yet reason about interleavings, and still concurrent:

\`\`\`flow
lock1[1 · inside the guard\\ncheck who you are\\ncopy what you need] --> out[2 · outside the guard\\ncompute, wait, talk\\nto the network]
out --> lock2[3 · inside the guard again\\ncheck nothing changed\\nonly then write]
lock2 -->|something changed| drop[give up quietly\\nthe next timeout\\nwill try again]
\`\`\`

1. **One guard for all the state.** Not a lock per field: one. Take it,
   check that you are still what you think you are — *only leaders send
   heartbeats* — and copy everything you are about to need into local
   variables that nothing else can touch.
2. **Let go before doing anything slow.** Never hold the guard across the
   network. The remote call runs with the copies, on another thread, for as
   long as it takes, and the server goes on answering everyone else.
3. **Take the guard again, and trust nothing.** The answer arrives in a world
   that has moved. Am I still the leader? Is it still the same term? Is this
   follower's index still where I left it? If any answer is no, drop the
   result and return. There is nothing to undo, because nothing was written.

Here it is in the leader's heartbeat, shortened but in the code's own words
and with its own comments:

\`\`\`java
synchronized (GUARD) {
    // only leaders perform heartbeats
    if (state != RaftState.LEADER) return;

    // gather common info (from iteration to iteration may become rotten)
    term = persistentState.getCurrentTerm();
    prevLogIndex = nextIndexes.get(otherServer) - 1;
    prevLogTerm = persistentState.getTerm(prevLogIndex);
    entries = prevLogIndex > -1 ? persistentState.getLogEntries(prevLogIndex+1) : new ArrayList<LogEntry>();
    commitIndex = this.commitIndex;
}

// send the message (and listen the answer) in concurrent
executorQueue.execute(new Runnable() {
    public void run() {
        AppendEntriesResponse response = RMIsd.getInstance()
            .appendEntries(otherServer, term, leaderId, prevLogIndex, prevLogTerm, entries, commitIndex);

        // execute inside the guard, any sent data could be changed and must be reevaluated
        synchronized (GUARD) {
            // still leader?
            if (state != RaftState.LEADER) return;
            // term changed?
            if (term != persistentState.getCurrentTerm()) return;
            // prevLogIndex changed?
            if (nextIndexes.get(otherServer) - 1 != prevLogIndex) return;

            // … only now is anything written
        }
    }
});
\`\`\`

That is the whole of it. The two comments that matter are the code's own: *gather
common info (from iteration to iteration may become rotten)* going in, and
*execute inside the guard, any sent data could be changed and must be
reevaluated* coming back.

## Why it works

It removes the two things a beginner gets wrong. There is one lock, so there
is no order of locks to get wrong and no deadlock. And no lock is held while
waiting, so nothing stalls behind a slow server. What is left is the one real
difficulty, stale data, and the recipe turns it from something to reason
about into something to check: a list of \`if\`s at the top of step three.

It costs something. Work is sometimes thrown away, and it leans on Raft
being built the same way — terms and indices are exactly the version numbers
step three needs. But that is not a coincidence to apologise for. Optimistic
concurrency, compare-and-swap, a database's \`UPDATE … WHERE version = ?\`:
read, work outside, write only if nothing moved. It is the pattern most
concurrent code that works turns out to have.

Making parallel machines usable by people who are not parallel programmers
was [what my PhD was about](/research/). This was the same problem, with
students in place of scientists.
`},{file:"teaching/software-lab.md",markdown:`---
title: The post comes first
summary: Six autumns of Laboratori de Software 2 at Tecnocampus, and the platform built for it — posts in markdown compiled into tests for server and client, the server's answers replayed to the client, and a grader that read the repository.
order: 1
---

# The post comes first.  
Then the test.  
Then the code.

Six autumns, 2017 to 2022, of a fourth-year course at the Tecnocampus in
Mataró: *Laboratori de Software 2*. Teams -- of three at first, of five give or
take one later -- each with its own repository and its own game to build: an
adventure game, then planets, then cards, then cities, then cards again. And a
term to build it in, the way software is built: a small piece at a time, on a
branch, through a pull request, with a test.

It was one of three subjects I designed from scratch there, between 2017 and
2023, alongside *Enginyeria del Software III* and *Arquitectura de Serveis* --
with a first-year lab, a front-end course and final-project tutoring around
them. It is the one I built the most for.

The games are the students'. What is mine is what they stood on.

## A post is a test

Before writing code, a student writes a post: a markdown file with a title, a
writer, and a list of steps.

\`\`\`
* Go to the blog section,
* You should see a list of posts,
* The last post title should be "Hello Blog", this post
\`\`\`

The template reads the post and writes the tests -- one in Java for the server,
one in JavaScript for the client -- with one call per step, in the order
written: \`context.goToTheBlogSection()\`, then
\`context.theLastPostTitleShouldBeSThisPost("Hello Blog")\`. Those methods do not
exist yet. Writing them is the work. The generated test carries the post's
checksum, so a post edited after the fact fails until the tests are made again;
the file the student fills in is written once and never overwritten.

This is the client's test for that post, exactly as the 2022 template wrote it,
each step beside the line it came from:

\`\`\`js
// !!! IMPORTANT !!!
// This test file is AUTOGENERATED by yarn create-tests
// DO NOT MODIFY manually. Keep running yarn create-tests instead,
// while editing your posts.

test("2022-07-15_hello_blog.md", async () => {
  await runBeforeTestStarts(
    "2022-07-15_hello_blog",
    "ee5216b03b56d4c41fe753c274af3c88"
  );

  const context = new Post_20220715_HelloBlog_Context();
  await context.beforeTest();

  // ## How to use the blog
  await context.goToTheBlogSection(); //                            // * Go to the blog section,
  await context.youShouldSeeAListOfPosts(); //                      // * You should see a list of posts,
  await context.theLastPostTitleShouldBeSThisPost("Hello Blog"); // // * The last post title should be "Hello Blog", this post
  await context.goToTheSPost("Hello Blog"); //                      // * Go to the "Hello Blog" post,
  await context.youShouldSeeTheSPost("Hello Blog"); //              // * You should see the "Hello Blog" post
  await context.thePostShouldContainSWhichIsHere("this text"); //   // * The post should contain "this text", which is here.

  await context.afterTest();
  await runWhenTestSuccessful();
});
\`\`\`

A quoted word in a step becomes an argument, and the long number is the
post's checksum. The Java test for the server is the same list of calls.

Here is the compiler itself, with the two files it writes. Edit the post and
the test follows; break a rule and it says what it said to the students:

::post-tests

If that sounds like BDD, it is. It is not Cucumber, and not because of any
objection to Cucumber. In the first editions the students had to bind each
step to its code with a regular expression, and they did not know regular
expressions, and they said so. Worse, they could not see the link between the
post and the code: the step was read at run time by something they had not
written, and it was magic to them. Compiling the post into a test file they
could open, with one method call per line and the line beside it as a
comment, took the magic out. The post had a body. So the change was not
away from BDD; it was towards being able to see it.

The post itself was doing a second job. To write one, a student has to explain
the feature to the player -- what they will see, what they should do, what
should happen -- and that puts them in the player's head. Written from there,
the post says nothing about functions, identifiers, tables or databases,
because the player has none of those; it says what the game does. The
implementation followed the post, not the other way round, and the low-level
reflex that first-year programmers arrive with had nowhere to go.

One rule, enforced in code: *the writer of a post cannot be the coder who
implements it.* Within a team, one student wrote the post and another built
it, so sooner or later the two had to sit down over a sentence that one of
them had thought was clear. That was the lesson, and no lecture gives it: what
you wrote is what the other person understood, and the only way to find out
the difference is to watch someone build from it. Then you learn to write the
next one better.

The compiler did its part: it read the steps and refused the vague ones.
Every post had to have at least one step with *should* in it, and to end on
one. A step could not say *given* and *should* at once. A step with *there is*,
*has* or *needs* in it had to say which it was, setup or assertion, or it was
sent back. Every refusal said what it had found, what it had expected, and what
to do about it.

That makes it a harness, in the sense the word has since taken for working
with a coding agent: it did not write the code, it made sure the specification
was one a machine could hold you to, and it told you plainly when it was not.
The same guidance would do an AI good today.

## The server answers once

\`\`\`flow
post[post.md\\ntitle · writer · steps] --> gen[yarn create-tests]
gen --> java[Post_Test.java\\nthe server's test]
gen --> js[Post_Test.spec.js\\nthe client's test]
java -->|mvn test| calls[apiCalls/post.json\\nevery request and answer,\\nsaved only when green]
calls -->|replayed, in order| js
\`\`\`

The server is implemented first. While its test runs, every request the test
makes and every answer it gets is recorded -- and saved only when the test
passes. The client's test for the same post then replays the recording: the
same steps, the same calls, in the same order, without a server running. The
client is tested against what the server actually said. Ask for something the
server was never asked and the test stops, with a diff of the two requests.

The error messages were written for people meeting this for the first time:

> Did you run the backend tests before the frontend tests?

From 2019 the posts were executed as tests, by an interpreter that read them
at run time. From 2022 they were compiled. The same idea, three generations
of it.

## The week is the unit

One small post at a time -- *better little, simple and clear*, the first day's
slide said, and then showed a post that tried to do too much, with the seven
questions it left unanswered. The grade was computed week by week and capped, so
a burst at the end could not stand in for cadence. Roles rotated every week, and
every student did both the server and the client of the same pull request.

## The exam is the same thing, alone

At the start of the term a team took a week over one feature. At the exam each
student had three, alone, in one sitting: the post first, then the code, with
the commit messages prescribed so that the order could be checked. In 2022
every student got a different pairing of scenarios -- ninety-four
permutations for forty-eight people -- and the repositories were harvested
every ten minutes throughout, ten times, so the grade could see when each
thing happened as well as whether it worked.

## From a post to production

\`\`\`flow
write[write the post] --> tests[yarn create-tests\\nwrites both tests, red]
tests --> fill[fill in the Context\\nuntil both are green]
fill --> pr[commit · push · pull request]
pr --> ci[GitHub Actions\\ncreate-tests · mvn test\\njest --coverage · build]
ci -->|every line covered| review[review · merge to main]
review -->|the week's release manager| deploy[deploy.sh\\nboth suites again, then push]
deploy --> heroku[Heroku]
\`\`\`

On every push and every pull request, the repository compiled the posts into
tests, ran the Java suite, ran the JavaScript suite with coverage, refused any
line left uncovered, and built both. The pipeline itself is ordinary; what it
runs is not. Until 2021 the week's release manager deployed to Heroku with a
script that would not push until both suites had passed. In 2022 there was no
release environment, and the first day's slide said so.

## Reading the repository

Grades did not come from a form. In 2019 and 2020 a dashboard over the GitHub
GraphQL API scored each student by role -- posts written, pull requests opened,
reviews given, merges made, server, client, coverage -- and showed each team
its own numbers. In 2022 the grader read the git history itself, and wrote one
page per student and one per team, week by week. It was written five times in
six years, from a GitHub client in 2017 to a reader of git history in 2022,
and the last one is the one I would keep.

The 2021 and 2022 templates are public:
[classroom--cities-game--2021](https://github.com/drpicox/classroom--cities-game--2021)
and
[classroom--cards-game--2022](https://github.com/drpicox/classroom--cards-game--2022).
`}],uo="---";function Kd(t){return(/^"(.*)"$/.exec(t)??/^'(.*)'$/.exec(t))?.[1]??t}function Vd(t){const e=t.replace(/\r\n?/g,`
`).split(`
`);if(e[0]?.trim()!==uo)return{fields:{},body:t.trim()};const n=e.indexOf(uo,1);if(n<0)return{fields:{},body:t.trim()};const a={};for(const o of e.slice(1,n)){const s=o.indexOf(":");s<=0||(a[o.slice(0,s).trim()]=Kd(o.slice(s+1).trim()))}return{fields:a,body:e.slice(n+1).join(`
`).trim()}}function Xd(t){const n=t.replace(/\.md$/,"").replace(/(^|\/)index$/,"");return n===""?"/":`/${n}/`}function Zd(t){if(t==="/")return null;const e=t.slice(0,-1);return e.slice(0,e.lastIndexOf("/")+1)}function mo(t){if(t==="/")return"/";const e=t.slice(0,-1);return e.slice(e.lastIndexOf("/")+1)}function Qd(t){const{fields:e,body:n}=Vd(t.markdown),a=Xd(t.file);return{file:t.file,route:a,parent:Zd(a),name:mo(a),title:e.title??mo(a),summary:e.summary??"",order:Number(e.order??"100"),body:n,fields:e}}function eu(t){return t.endsWith("/")?t:`${t}/`}function po(t,e){return t.order-e.order||t.name.localeCompare(e.name)}class tu{byRoute;linked;constructor(e){const n=e.map(Qd),a=n.filter(o=>!o.fields.link).sort(po);this.byRoute=new Map(a.map(o=>[o.route,o])),this.linked=new Map(n.flatMap(o=>{const s=this.byRoute.get(eu(o.fields.link??""));return!o.fields.link||!s?[]:[[o.route,{...s,parent:o.parent,name:o.name,order:o.order,link:o.route}]]}))}get links(){return[...this.linked.values()].map(e=>({from:e.link,to:e.route}))}get pages(){return[...this.byRoute.values()]}at(e){const n=this.linked.get(e);return this.byRoute.get(n?n.route:e)}childrenOf(e){return[...this.pages,...this.linked.values()].filter(n=>n.parent===e).sort(po)}trailTo(e){const n=this.at(e);return n?n.parent===null?[n]:[...this.trailTo(n.parent),n]:[]}}const ge=new tu(Jd),fo=["on","off"];function go(t,e){if(t.length===0)return{text:"No flags to try just now."};const n=Math.max(...t.map(r=>r.name.length)),a=r=>e.isOn(r.name)?"on":"off",o=t.map(r=>{const i=fo.map(h=>h===a(r)?`[${h}]`:` ${h} `).join("");return`${r.name.padEnd(n)}  ${i}  ${r.description}`}),s=t.map(r=>{const i=fo.map(h=>h===a(r)?`<strong aria-current="true">${h}</strong>`:`<a href="#" data-run="flags ${r.name} ${h}" title="flags ${r.name} ${h}">${h}</a>`).join("  ");return`${r.name.padEnd(n)}  ${i}   ${S(r.description)}`});return{text:o.map(r=>r.trimEnd()).join(`
`),html:`<pre class="choices">${s.join(`
`)}</pre>`}}function nu(t,e){return{name:"flags",usage:"flags [name [on|off]]",description:"list the trials this site can be switched into, or switch one",run(n,[a,o]){return a===void 0?go(t,e):t.some(s=>s.name===a)?o!==void 0&&o!=="on"&&o!=="off"?{text:`flags: ${a}: choose on or off`,error:!0}:(e.set(a,o===void 0?!e.isOn(a):o==="on"),go(t,e)):{text:`flags: ${a}: no such flag. Try flags`,error:!0}}}}function au(t,e){const n=new URLSearchParams(e),a={};for(const{name:o}of t){const s=n.get(o);(s==="on"||s==="off")&&(a[o]=s==="on")}return a}function ou(t){if(t.includes("--help"))return{help:!0};const e={};for(let n=0;n<t.length;n+=1){const a=t[n]??"";if(!a.startsWith("--"))return{error:`${a}: options are written --name value`};const o=a.indexOf("=");if(o>0){e[a.slice(2,o)]=a.slice(o+1);continue}const s=t[n+1];if(s===void 0)return{error:`${a} needs a value`};e[a.slice(2)]=s,n+=1}return{given:e}}const su=t=>"choices"in t?t.choices.map(xe).join("|"):"n",ru=t=>"choices"in t?xe(t.initial):`${t.min} to ${t.max}, ${t.initial}`;function iu(t){const e=[t.name,...t.parameters.map(o=>`[--${o.name} ${su(o)}]`)].join(" "),n=Math.max(...t.parameters.map(o=>o.name.length+2)),a=t.parameters.map(o=>`  ${`--${o.name}`.padEnd(n)}  ${o.description} (${ru(o)})`);return[e,`  ${t.summary}`,"",...a].join(`
`)}function hu(t){return{name:t.name,usage:`${t.name} [--help] [--option n]...`,description:t.summary,run(e,n){const a=ou(n);if("help"in a)return{text:iu(t)};const o="error"in a?a:ks(t,a.given);if("error"in o)return{text:`${t.name}: ${o.error}`,error:!0};const s=t.run(o.values);return{text:s.text,html:`<div class="app program-out">${s.html}</div>`}}}}function lu(t){return[...t.flatMap(e=>e.commands??[]),...t.flatMap(e=>e.programs??[]).map(hu)]}function wo(){const t=he.flatMap(m=>m.flags??[]),e=new gc;for(const[m,u]of Object.entries(au(t,window.location.search)))e.set(m,u);const n=[...bs,...lu(he),nu(t,e)],a=fc(he),s=(m=>m.endsWith("/")?m:`${m}/`)(window.location.pathname),r=ge.at(s);let i=oo(a,{site:ge}),h=null;const l=fd(ge,(m,u)=>{i(),i=oo(a,{site:ge});for(const g of he)g.arrive?.(m);u||h?.moveTo(m.route)});if(h=Fd(ge,r?s:"/",{moveTo:m=>l(m,{keep:!0}),clearPage:()=>{i(),i=()=>{},document.querySelector("main")?.replaceChildren()},commands:n}),r)for(const m of he)m.arrive?.(r);const d={run:m=>{h?.run(m)}};for(const m of he)m.install?.(d);const p=he.flatMap(m=>m.programs??[]);Ud(wc(),{programs:p,site:ge,goTo:m=>l(m),run:m=>h?.run(m)??[]})}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",wo):wo();
