const Ko=[{name:"llave de laton",kind:"key",value:111},{name:"cristal magico",kind:"key",value:1112},{name:"llave de casa",kind:"key",value:1314},{name:"llave de la verja",kind:"key",value:2636},{name:"llave del puente",kind:"key",value:3444},{name:"llave del gnomo",kind:"key",value:4636},{name:"barca",kind:"key",value:3233},{name:"llave de la despensa",kind:"key",value:2010},{name:"diario",kind:"weapon",value:1},{name:"matamoscas",kind:"weapon",value:2},{name:"espada de madera",kind:"weapon",value:4},{name:"espada",kind:"weapon",value:8},{name:"espada venenosa",kind:"weapon",value:12},{name:"Thurmei",kind:"weapon",value:16},{name:"camisa",kind:"shield",value:2},{name:"escudo de madera",kind:"shield",value:4},{name:"escudo de escamas",kind:"shield",value:8},{name:"escudo",kind:"shield",value:12},{name:"Rharmei",kind:"shield",value:16},{name:"caramelo",kind:"food",value:2},{name:"judia",kind:"food",value:4},{name:"manzana",kind:"food",value:8},{name:"naranja",kind:"food",value:12},{name:"pocima",kind:"food",value:16}],Xo=[{name:"mosca acida",attack:4,defence:0,drops:"cristal magico"},{name:"mosca",attack:0,defence:0,drops:"caramelo"},{name:"mosquito",attack:2,defence:0,drops:"matamoscas"},{name:"polilla",attack:1,defence:1,drops:"camisa"},{name:"cucaracha",attack:1,defence:1,drops:"llave de casa"},{name:"raton",attack:2,defence:2,drops:"judia"},{name:"rana venenosa",attack:2,defence:1,drops:"espada de madera"},{name:"planta carnivora",attack:1,defence:3,drops:"escudo de madera"},{name:"raton salvaje",attack:3,defence:3,drops:"llave de la verja"},{name:"escorpion dorado",attack:12,defence:2,drops:"espada venenosa"},{name:"trucha",attack:3,defence:3,drops:"manzana"},{name:"trucha asesina",attack:4,defence:7,drops:"escudo de escamas"},{name:"minimonstruo aquatico",attack:8,defence:4,drops:"llave del puente"},{name:"lobo",attack:8,defence:6,drops:"manzana"},{name:"lobo asesino",attack:12,defence:7,drops:"escudo"},{name:"ogro",attack:6,defence:10,drops:"naranja"},{name:"gnomo de puente",attack:11,defence:11,drops:"llave del gnomo"},{name:"murcielago",attack:8,defence:8,drops:"judia"},{name:"aranya",attack:14,defence:4,drops:"Thurmei"},{name:"vampiro",attack:12,defence:13,drops:"Rharmei"},{name:"aranya gigante",attack:14,defence:14,drops:"barca"},{name:"monstruo aquatico enorme",attack:32,defence:15,drops:"llave de la despensa"}],Zo={"0,0":{name:"Bienvenida",exits:[-1,-1,0,-1],holds:"diario",text:`Bienvenido a este juego de aventura. 
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
sus otros habitantes.`}},Qt={"llave de laton":"brass key","cristal magico":"magic crystal","llave de casa":"house key","llave de la verja":"gate key","llave del puente":"bridge key","llave del gnomo":"gnome's key",barca:"boat","llave de la despensa":"pantry key",diario:"newspaper",matamoscas:"fly swatter","espada de madera":"wooden sword",espada:"sword","espada venenosa":"poisoned sword",Thurmei:"Thurmei",camisa:"shirt","escudo de madera":"wooden shield","escudo de escamas":"scale shield",escudo:"shield",Rharmei:"Rharmei",caramelo:"sweet",judia:"bean",manzana:"apple",naranja:"orange",pocima:"potion"},Fa={"mosca acida":"acid fly",mosca:"fly",mosquito:"mosquito",polilla:"moth",cucaracha:"cockroach",raton:"mouse","rana venenosa":"poison frog","planta carnivora":"carnivorous plant","raton salvaje":"wild mouse","escorpion dorado":"golden scorpion",trucha:"trout","trucha asesina":"killer trout","minimonstruo aquatico":"small water monster",lobo:"wolf","lobo asesino":"killer wolf",ogro:"ogre","gnomo de puente":"bridge gnome",murcielago:"bat",aranya:"spider",vampiro:"vampire","aranya gigante":"giant spider","monstruo aquatico enorme":"enormous water monster"},Qo={Bienvenida:"Welcome","Usa las llaves":"Use the keys","Comedor sur":"Dining room, south",Salita:"Sitting room","Huerto de pepinos":"Cucumber patch","Huerto de tomates":"Tomato patch",Caminito:"Little path",Despensa:"Pantry","Aprende a atacar":"Learn to attack",Comedor:"Dining room",Recibidor:"Hall",Patio:"Yard","Huerto de Judias":"Bean patch",Manzanos:"Apple trees",Ciruelos:"Plum trees",Banyo:"Bathroom",Habitacion:"Bedroom","Comedor norte":"Dining room, north",Cocina:"Kitchen","Huerto de calabazas":"Pumpkin patch",Naranjos:"Orange trees",Entrada:"Gate",Nogal:"Walnut trees",Cueva:"Cave","Lago interno":"Underground lake","Centro del lago":"Middle of the lake","Rio salvaje":"Wild river",Rio:"River","Bosque oscuro":"Dark forest","Rio oscuro":"Dark river","Bosque tenebroso":"Gloomy forest","Bosque sombrio":"Shadowy forest","Bosque humedo":"Damp forest",Bosque:"Forest","Claro del Bosque":"Forest clearing","Puente del bosque":"Forest bridge"},K=`The tunnel of the dark, gloomy cave goes on. The walls are damp and
water can be heard running somewhere far off. Walk carefully, or you
will slip or trip.`,be=`The forest stretches out, dark and mysterious. The light blurs
through the leaves. You can hear the animals and the forest's other
inhabitants.`,wt=`Though it is day, barely a glimmer of light gets in. Bushes, trees
and brambles make the going hard. Something moves in the dark.`,Sn=`Little light comes through the leaves of the trees. Brambles and
bushes give way to a small stream. Something moves in the dark.`,es={"0,0":`Welcome to this adventure game.
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
the apples, they are hardy and get you through the winters.`,"3,0":K,"3,1":K,"3,2":`An immense underground lake opens up before you. It is dark and you
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
but something stirs beneath the surface.`,"4,0":K,"4,1":K,"4,2":K,"4,3":wt,"4,4":`The north bank of the river is dismal. Strange noises can be heard,
and you sense a curse. Here is the bridge that crosses to the south
bank; the air feels hostile and urges you across.`,"4,5":`The river flows under the rocks and the roots of the forest's trees.
The sounds of the forest grow louder and you feel watched.`,"4,6":`A gap between brambles and bushes lets you into the gloomy forest.
Light is scarce and the shadows are threatening.`,"4,7":wt,"5,0":`The tunnel of the dark, gloomy cave goes on. A great cobweb blocks
the way south. One careless move could make you its prey.`,"5,1":K,"5,2":`The tunnel of the dark, gloomy cave goes on. The walls are damp, and
the sound of water grows louder. Walk carefully, or you will slip or
trip.`,"5,3":`The forest is dark, and beside you you have found a great wall of
solid rock to the west: the mountain, probably.`,"5,4":Sn,"5,5":be,"5,6":`The forest stretches out, dark and mysterious. You are in a small
clearing where the sky can be seen. You notice the forest is
restless.`,"5,7":be,"6,0":K,"6,1":K,"6,2":`You are inside the cave; it is dark and gloomy. The walls are damp and
water can be heard running somewhere far off. You try to look ahead,
but it seems to have no end.`,"6,3":`The forest is dark, and beside you you have found a great wall of
solid rock to the west: the mountain, probably. You notice the rock
is damp; there is very likely a cave.`,"6,4":`Little light comes through the leaves of the trees. Brambles and
bushes give way to a small stream. A bridge crosses the stream to the
eastern part of the forest; there, under a tree, is the house of a
troll you will have to get past if you want to go east.`,"6,5":wt,"6,6":`The forest stretches out, dark, mysterious and restless. You are in a
small clearing where the sky can be seen.`,"6,7":`In this part of the forest the light begins to fail. Tangles of
bushes and brambles slow your steps. You notice something moving
among the shadows.`,"7,0":K,"7,1":K,"7,2":`You are a few steps inside the cave. Cold, damp air reaches you from
within. You try to see where it ends, but you cannot. You hear
murmurs from deep inside.`,"7,3":`Little light comes through the leaves of the trees. A tangle of
climbing plants stirs to the west: it is the mouth of a cave. You
feel a presence watching you.`,"7,4":Sn,"7,5":be,"7,6":be,"7,7":be},de=(t,e)=>t[e]??e,Rt=Ko.map(t=>({...t,name:de(Qt,t.name)})),ts=Xo.map(t=>({...t,name:de(Fa,t.name),drops:de(Qt,t.drops)})),Ba=Object.fromEntries(Object.entries(Zo).map(([t,e])=>[t,{...e,name:de(Qo,e.name),holds:de(Qt,de(Fa,e.holds)),text:es[t]??e.text}])),Mn=["norte","sur","este","oeste"],ns={norte:"north",sur:"south",este:"east",oeste:"west"},as={norte:[1,0],sur:[-1,0],este:[0,1],oeste:[0,-1]},An=16,In=[0,0],En=[1,0],rt=(t,e)=>t.find(n=>n.name===e);function Cn(t){const e=rt(Rt,t);if(e)return{item:e};const n=rt(ts,t);return n?{monster:n}:null}class pe{places=new Map;at=[In[0],In[1]];life=An;weapon=null;shield=null;key=null;visited=new Set;constructor(){for(const[e,n]of Object.entries(Ba))this.places.set(e,{room:n,exits:[...n.exits],holds:Cn(n.holds)});this.visited.add(this.here())}here(){return`${this.at[0]},${this.at[1]}`}place(){const e=this.places.get(this.here());if(!e)throw new Error(`no room at ${this.here()}`);return e}get won(){return this.at[0]===En[0]&&this.at[1]===En[1]}get spent(){return this.life<=0}save(){return JSON.stringify({at:this.at,life:this.life,held:[this.weapon?.name??null,this.shield?.name??null,this.key?.name??null],visited:[...this.visited],places:[...this.places].map(([e,n])=>[e,n.exits,n.holds?"item"in n.holds?n.holds.item.name:n.holds.monster.name:null])})}static load(e){const n=JSON.parse(e),a=new pe;a.at=n.at,a.life=n.life,[a.weapon,a.shield,a.key]=n.held.map(o=>o?rt(Rt,o)??null:null),a.visited.clear();for(const o of n.visited)a.visited.add(o);for(const[o,s,r]of n.places){const i=a.places.get(o);i&&Object.assign(i,{exits:s,holds:r?Cn(r):null})}return a}look(){const{room:e,exits:n,holds:a}=this.place();return{name:e.name,text:e.text,...a&&"monster"in a?{monster:a.monster.name}:{},...a&&"item"in a?{item:a.item.name}:{},exits:Mn.flatMap((o,s)=>(n[s]??-1)>=0?[{direction:o,locked:(n[s]??0)>0}]:[]),at:[this.at[0],this.at[1]],life:this.life,...this.weapon?{weapon:this.weapon.name}:{},...this.shield?{shield:this.shield.name}:{},...this.key?{key:this.key.name}:{}}}go(e){const n=this.place(),a=Mn.indexOf(e),o=n.exits[a]??-1;if(o<0)return"There is no way out that way.";if(o>0){if(!this.key||this.key.value!==o)return"The way is locked and you are not carrying the key.";n.exits[a]=0,this.key=null}const[s,r]=as[e];return this.at=[this.at[0]+s,this.at[1]+r],this.visited.add(this.here()),""}take(){const e=this.place();if(!e.holds||!("item"in e.holds))return"There is nothing here to take!";const{item:n}=e.holds;if(n.kind==="food")return this.life=Math.min(An,this.life+n.value),e.holds=null,"Yum yum!";const a=n.kind,o=this[a];return this[a]=n,e.holds=o?{item:o}:null,{weapon:"You have taken a weapon.",shield:"You have taken a shield.",key:"You have taken a key."}[a]}attack(){const e=this.place();if(!e.holds||!("monster"in e.holds))return"There is no monster to attack!";if(!this.weapon)return"You have no weapon to attack with!";const{monster:n}=e.holds,a=[];if(this.weapon.value-n.defence>0){const s=rt(Rt,n.drops);e.holds=s?{item:s}:null,a.push("The monster has been defeated!")}const o=n.attack-(this.shield?.value??0);return o>0&&(this.life-=o,a.push("OUCH!")),a.join(" ")||"Neither of you gets anywhere."}run(e){const n=e.trim().toLowerCase(),a={norte:"norte",north:"norte",n:"norte",sur:"sur",south:"sur",s:"sur",este:"este",east:"este",e:"este",oeste:"oeste",west:"oeste",w:"oeste"}[n];return a?this.go(a):n==="coger"||n==="take"||n==="get"?this.take():n==="atacar"||n==="attack"||n==="hit"?this.attack():n==="mirar"||n==="look"||n==="l"||n===""?"":"I do not understand you."}}const os={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"};function T(t){return t.replace(/[&<>"]/g,e=>os[e]??e)}const Re=8;function ss(t,e){const n=[];for(let a=Re-1;a>=0;a-=1)for(let o=0;o<Re;o+=1){const s=`${a},${o}`,r=Ba[s],i=t.has(s),h=e[0]===a&&e[1]===o,c=["cell",i?"seen":"",h?"here":""].filter(Boolean).join(" ");n.push(`<span class="${c}" title="${i&&r?T(r.name):""}">${i&&r?T(r.name):""}</span>`)}return`<div class="map" role="img" aria-label="The map: ${t.size} of ${Re*Re} rooms seen">${n.join("")}</div>`}function rs(t){const e=t.exits.map(({direction:a,locked:o})=>`${ns[a]}${o?" (locked)":""}`),n=[t.weapon&&`weapon:${t.weapon}`,t.shield&&`shield:${t.shield}`,t.key&&`key:${t.key}`].filter(Boolean).join(" ");return`<div class="seen"><h4>===== ${T(t.name)} =====</h4><p>${T(t.text).replace(/\n/g,"<br>")}</p>`+(t.monster?`<p class="monster">There is a monster here: ${T(t.monster)}</p>`:"")+(t.item?`<p class="item">There is: ${T(t.item)}</p>`:"")+`<p class="exits">Exits: ${e.length?e.join(", "):"none"}.</p><p class="status">(${t.at[1]},${t.at[0]})| ${T(n)} ${t.life}&gt;</p></div>`}function Wa(t){return`<div class="adventure">${ss(t.visited,t.look().at)}${rs(t.look())}</div>`}const is=()=>Wa(new pe);function f(t,e={},...n){const a=document.createElement(t);for(const[o,s]of Object.entries(e))s===void 0||s===!1||(typeof s=="function"?a.addEventListener(o.slice(2).toLowerCase(),s):s===!0?a.setAttribute(o,""):a.setAttribute(o,String(s)));for(const o of n)o==null||o===!1||a.append(o);return a}const Ha="adventure",hs=["north","south","east","west","take","attack"];function ls(t){let e=cs()??new pe;const n=f("div"),a=f("p",{class:"said"}),o=f("input",{type:"text",autocomplete:"off",spellcheck:!1,placeholder:"north, south, east, west, take, attack"});function s(l=""){n.innerHTML=Wa(e),a.textContent=e.spent&&!l?"Game over; better luck next time.":l,e.won&&(a.textContent="CONGRATULATIONS! You have reached the pantry."),i()}function r(l){const d=e.run(l);s(d),o.value="",o.focus()}function i(){try{localStorage.setItem(Ha,e.save())}catch{}}const h=f("form",{onsubmit:l=>(l.preventDefault(),r(o.value))},f("span",{class:"ps1"},"> "),o),c=f("div",{class:"row"},...hs.map(l=>f("button",{type:"button",onclick:()=>r(l)},l)),f("button",{type:"button",class:"quiet",onclick:()=>(e=new pe,s(""))},"start again"));return t.replaceChildren(n,a,h,c),s(""),()=>i()}function cs(){try{const t=localStorage.getItem(Ha);return t?pe.load(t):null}catch{return null}}const ds={name:"adventure",apps:{adventure:ls},stills:{adventure:is}},us=["January","February","March","April","May","June","July","August","September","October","November","December"];function lt(t){const[e,n,a]=t.refreshed.split("-").map(Number),o=`${a} ${us[(n??1)-1]} ${e}`,s=`${Math.min(...t.years)} to ${Math.max(...t.years)}`;return`<p class="source">Source: ${T(t.attribution)} <a href="${T(t.dataset)}">The dataset, at its source.</a> This site keeps sums of the finished years ${s}, last added to on ${o}.</p>`}function en(t,e){const n=t.querySelector("p.source");if(n)return n;const a=document.createElement("div");return fetch(e).then(o=>o.json()).then(o=>{a.innerHTML=lt(o)}).catch(()=>{}),a}const le=[{code:"08019004",name:"Barcelona (Poblenou)",kind:"background",area:"urban"},{code:"08019043",name:"Barcelona (Eixample)",kind:"traffic",area:"urban"},{code:"08019044",name:"Barcelona (Gràcia - Sant Gervasi)",kind:"traffic",area:"urban"},{code:"08019057",name:"Barcelona (Palau Reial)",kind:"background",area:"urban"},{code:"08019058",name:"Barcelona (Observatori Fabra)",kind:"background",area:"suburban"},{code:"08015021",name:"Badalona",kind:"background",area:"urban"},{code:"08187012",name:"Sabadell",kind:"traffic",area:"urban"},{code:"17079003",name:"Girona (Escola de Música)",kind:"traffic",area:"urban"},{code:"25120001",name:"Lleida",kind:"traffic",area:"urban"},{code:"43148028",name:"Tarragona (Parc de la Ciutat)",kind:"background",area:"urban"},{code:"08137001",name:"Montseny (La Castanya)",kind:"background",area:"rural"}];function Ft(t,e){return e==="workdays"?[t.workdays]:e==="weekends"?[t.weekends]:[t.workdays,t.weekends]}const ms=t=>(t%4===0&&t%100!==0||t%400===0?366:365)*24,yt=t=>t.reduce((e,n)=>e+n.reduce((a,o)=>a+o,0),0);function ps(t,e){return Object.entries(t.years).map(([n,a])=>{const o=Ft(a,e),s=o.reduce((h,c)=>h+yt(c.counts),0),r=o.reduce((h,c)=>h+yt(c.sums),0),i=Ft(a,"all").reduce((h,c)=>h+yt(c.counts),0);return{year:Number(n),mean:s>0?r/s:Number.NaN,measured:i/ms(Number(n))}}).filter(({mean:n})=>!Number.isNaN(n)).sort((n,a)=>n.year-a.year)}function fs(t,e){const n=Object.entries(t.years).filter(([a])=>Number(a)>=e.from&&Number(a)<=e.to).flatMap(([,a])=>Ft(a,e.days));return Array.from({length:24},(a,o)=>Array.from({length:12},(s,r)=>{const i=n.reduce((c,l)=>c+(l.sums[r]?.[o]??0),0),h=n.reduce((c,l)=>c+(l.counts[r]?.[o]??0),0);return{mean:h>0?i/h:null,count:h}}))}const ie=[[0,[0,255,0]],[20,[225,225,0]],[40,[255,0,0]],[60,[225,0,225]],[80,[64,0,64]],[230,[16,0,8]]],gs=([t,e,n])=>(.299*t+.587*e+.114*n)/255;function tn(t){const e=Math.max(0,Math.min(t,230)),n=Math.max(1,ie.findIndex(([c])=>c>=e)),[a,o]=ie[n-1]??ie[0],[s,r]=ie[n]??ie[ie.length-1],i=(e-a)/(s-a),h=o.map((c,l)=>Math.round(c+((r[l]??0)-c)*i));return{background:`rgb(${h.join(",")})`,light:gs(h)<.45}}const at=80,qa=["January","February","March","April","May","June","July","August","September","October","November","December"],za=t=>String(t+1).padStart(2,"0");function ws(t,e,n){if(t.mean===null)return'<td class="none"></td>';const{background:a,light:o}=tn(t.mean),s=o?' class="deep"':"",r=`${qa[n]}, hour ${za(e)}: ${t.mean.toFixed(1)} µg/m³, the mean of ${t.count} measurements`;return`<td${s} style="background:${a}" title="${r}">${Math.round(t.mean)}</td>`}function ys(t){const e=`<tr><th></th>${qa.map(a=>`<th scope="col">${a.slice(0,3)}</th>`).join("")}</tr>`,n=t.map((a,o)=>`<tr><th scope="row">${za(o)}</th>${a.map((s,r)=>ws(s,o,r)).join("")}</tr>`);return`<table class="heat graded"><thead>${e}</thead><tbody>${n.join("")}</tbody></table>`}function nn(t){if(t<=0)return[0];const e=10**Math.floor(Math.log10(t)),n=t/e>=5?e:t/e>=2?e/2:e/5,a=[];for(let o=0;o<=t;o+=n)a.push(Math.round(o*100)/100);return a}const Fe=720,bt=190,Y={top:14,right:8,bottom:22,left:34},F=t=>t.toFixed(1);function _a(t,e,n){const a=Math.min(...t),o=Math.max(...t),s=Fe-Y.left-Y.right,r=bt-Y.top-Y.bottom,i=s/Math.max(1,o-a+1),h=u=>Y.left+(u-a)*i,c=u=>Y.top+r-(u-e)/Math.max(1e-9,n-e)*r,d=nn(n-e).map(u=>Math.round((u+e)*100)/100).map(u=>`<line class="grid" x1="${Y.left}" x2="${Fe-Y.right}" y1="${F(c(u))}" y2="${F(c(u))}"/><text x="${Y.left-4}" y="${F(c(u)+3)}" text-anchor="end">${u}</text>`).join(""),m=o-a>12?5:1,p=Array.from({length:o-a+1},(u,g)=>a+g).filter(u=>u%m===0).map(u=>`<text x="${F(h(u)+i/2)}" y="${bt-6}" text-anchor="middle">${u}</text>`).join("");return{slot:i,x:h,y:c,left:Y.left,right:Fe-Y.right,top:Y.top,height:r,levels:u=>u.map(({from:g,to:k,value:w,label:b})=>`<line class="span" x1="${F(h(g))}" x2="${F(h(k)+i)}" y1="${F(c(w))}" y2="${F(c(w))}"/><text class="span" x="${F((h(g)+h(k)+i)/2)}" y="${F(c(w)-5)}" text-anchor="middle">${b}</text>`).join(""),wrap:(u,g)=>`<svg class="years" viewBox="0 0 ${Fe} ${bt}" role="img" aria-label="${u}">${d}${p}${g}</svg>`}}function Bt(t,e){const n=Math.max(e.top??0,...t.map(({value:l})=>l),1),a=_a(t.map(({year:l})=>l),0,n),{x:o,y:s,slot:r}=a,i=t.map(({year:l,value:d,title:m,chosen:p,partial:u,colour:g})=>`<rect class="${["bar",p?"chosen":"",u?"partial":""].filter(Boolean).join(" ")}" data-year="${l}"${g?` style="--bar:${g}"`:""} x="${F(o(l)+r*.15)}" y="${F(s(d))}" width="${F(r*.7)}" height="${F(s(0)-s(d))}"/><rect class="hit" data-year="${l}" x="${F(o(l))}" y="${a.top}" width="${F(r)}" height="${a.height}"><title>${m}</title></rect>`).join(""),h=(e.references??[]).map(({value:l,label:d})=>`<line class="reference" x1="${a.left}" x2="${a.right}" y1="${F(s(l))}" y2="${F(s(l))}"/><text class="reference" x="${a.right-2}" y="${F(s(l)-3)}" text-anchor="end">${d}</text>`).join(""),c=a.levels(e.spans??[]);return a.wrap(e.label,`${i}${h}${c}`)}const bs=.75,vs=[{value:40,label:"EU limit, 40"},{value:10,label:"WHO guideline, 10"}];function ks(t,e){const n=t.map(({year:a,mean:o,measured:s})=>{const r=s<bs,i=r?`, from only ${Math.round(s*100)}% of the year's hours`:"";return{year:a,value:o,partial:r,colour:tn(o).background,chosen:a>=e.from&&a<=e.to,title:`${a}: ${o.toFixed(1)} µg/m³${i}`}});return Bt(n,{label:"Mean NO2 of each year, µg/m³",top:at,references:vs})}const jn={all:"every day of the week",workdays:"Monday to Friday",weekends:"Saturdays and Sundays"};function xs(){const t=Array.from({length:at/5+1},(n,a)=>tn(a*5).background),e=[0,20,40,60,at].map(n=>`<span>${n===at?`${n}+`:n}</span>`).join("");return`<div class="scale" aria-hidden="true"><div class="ramp" style="background:linear-gradient(to right,${t.join(",")})"></div><div class="ticks">${e}</div><div class="ticks words"><span>clean</span><span>EU limit</span><span>twice it</span></div></div>`}function Ga(t,e){const n=Object.keys(t.years).map(Number),a=Math.max(e.from,Math.min(...n)),o=Math.min(e.to,Math.max(...n)),s=a===o?String(a):`${a}–${o}`;return`<figure class="no2"><figcaption><strong>${t.name}</strong> · ${t.kind}, ${t.area} · mean NO2 in µg/m³ by hour of the day and month of the year · ${jn[e.days]}, ${s}</figcaption>`+ys(fs(t,e))+xs()+`<h4>The mean of each year, ${jn[e.days]}</h4>`+ks(ps(t,e.days),{from:a,to:o})+"</figure>"}function Ce(t){const e=Object.keys(t.years).map(Number);return{from:Math.min(...e),to:Math.max(...e),days:"all"}}const $s=[["all","every day"],["workdays","Monday to Friday"],["weekends","Saturday and Sunday"]];function Ts(t){const e=new Map,n=en(t,"/data/no2/index.json"),a=f("div");a.append(...t.querySelectorAll("figure"));let o=null,s={from:0,to:9999,days:"all"},r=!1;const i=(w,b=String(w))=>f("option",{value:w},b),h=f("select",{onchange:()=>{g(h.value)}},...le.map(({code:w,name:b})=>i(w,b))),c=f("select",{onchange:()=>u({days:c.value})},...$s.map(([w,b])=>i(w,b))),l=f("select",{onchange:()=>u({from:Number(l.value),to:Math.max(Number(l.value),s.to)})}),d=f("select",{onchange:()=>u({to:Number(d.value),from:Math.min(Number(d.value),s.from)})}),m=f("button",{type:"button",onclick:()=>o&&u(Ce(o))},"every year");function p(){o&&(a.innerHTML=Ga(o,s),l.value=String(s.from),d.value=String(s.to),c.value=s.days)}function u(w){s={...s,...w},p()}async function g(w){const b=e.get(w)??fetch(`/data/no2/${w}.json`).then(y=>y.json());e.set(w,b);try{const y=await b;if(r||h.value!==w)return;const $=Ce(y),A=o!==null&&(s.from!==Ce(o).from||s.to!==Ce(o).to),M=Object.keys(y.years).map(Number).filter(j=>j>=s.from&&j<=s.to),v=A&&M.length>0?{from:Math.min(...M),to:Math.max(...M)}:$;o=y,s={...v,days:s.days};const E=Object.keys(y.years);l.replaceChildren(...E.map(j=>i(j))),d.replaceChildren(...E.map(j=>i(j))),p()}catch{e.delete(w),a.replaceChildren(f("p",{},"The measurements for this station did not arrive. The rest of the page does not depend on them."))}}a.addEventListener("click",w=>{const b=w.target?.closest("[data-year]")?.getAttribute("data-year");b&&u({from:Number(b),to:Number(b)})});const k=f("div",{class:"row"},f("label",{},"Station ",h),f("label",{},"Days ",c),f("label",{},"Years ",l," to ",d),m);return t.replaceChildren(k,a,n),g(h.value),()=>{r=!0}}const Ss="https://analisi.transparenciacatalunya.cat/resource";function Ya(t,e){const n=new URL(`${Ss}/${t}.json`);for(const[a,o]of Object.entries(e))o!==void 0&&n.searchParams.set(`$${a}`,String(o));return n.toString()}const On="tasf-thgu",Ua=Array.from({length:24},(t,e)=>String(e+1).padStart(2,"0")),Ms=0,As=6,Be=()=>Array.from({length:12},()=>new Array(24).fill(0)),Is=()=>({workdays:{sums:Be(),counts:Be()},weekends:{sums:Be(),counts:Be()}});function Es(t){if(!Array.isArray(t))throw new Error("the portal did not answer with rows");if(t.length===0)throw new Error("the portal answered with no rows");return t}function Cs(t,e){const n=Number(e.month)-1;Ua.forEach((a,o)=>{const s=t.sums[n],r=t.counts[n];if(!s||!r)throw new Error(`month ${e.month} is not a month`);s[o]=(s[o]??0)+Number(e[`s${a}`]??0),r[o]=(r[o]??0)+Number(e[`n${a}`]??0)})}const js={name:"no2",directory:"public/data/no2",firstYear:1991,files:le.map(t=>`${t.code}.json`),about:{measures:"NO2, hourly, µg/m³",network:"Xarxa de Vigilància i Previsió de la Contaminació Atmosfèrica",attribution:"Generalitat de Catalunya, Xarxa de Vigilància i Previsió de la Contaminació Atmosfèrica. Dades obertes.",dataset:`https://analisi.transparenciacatalunya.cat/d/${On}`,stations:le},requestsFor(t){const e=le.map(a=>`'${a.code}'`).join(","),n=Ua.map(a=>`sum(h${a}) as s${a}, count(h${a}) as n${a}`).join(", ");return[Ya(On,{select:`codi_eoi, date_extract_m(data) as month, date_extract_dow(data) as dow, count(*) as days, ${n}`,where:`contaminant='NO2' and codi_eoi in (${e}) and data between '${t}-01-01T00:00:00' and '${t}-12-31T23:59:59'`,group:"codi_eoi,month,dow",limit:5e3})]},withYear(t,e,n){const a=Es(n[0]);if(a.some(s=>Number(s.days)>5))throw new Error("some days are in the portal twice");if(!a.some(s=>s.month==="12"))throw new Error("the year does not reach December yet");const o=new Map;for(const s of a){const r=s.codi_eoi??"",i=o.get(r)??Is();o.set(r,i);const h=Number(s.dow);Cs(h===Ms||h===As?i.weekends:i.workdays,s)}return Object.fromEntries(le.map(s=>{const r=`${s.code}.json`,i=o.get(s.code),h={...t[r]?.years,...i?{[e]:i}:{}};return[r,{...s,years:h}]}))}},Os=t=>{const e=JSON.parse(t(`/data/no2/${le[0]?.code}.json`)),n=JSON.parse(t("/data/no2/index.json"));return Ga(e,Ce(e))+lt(n)},Ps={name:"air-quality",apps:{no2:Ts},stills:{no2:Os},sources:[js]},ue=5,ct=8,ve=t=>Math.max(0,Math.min(100,t));function Pn(t){const{focus:e,fatigue:n,featureSize:a,weeks:o,calendar:s,meetingTypes:r}=t,i=[];let h=0,c=0;for(let l=0;l<o;l+=1)for(let d=0;d<ue;d+=1){let m=0,p=0;for(let u=0;u<ct;u+=1){const g=r[s[`${d}-${u}`]??""];if(g){m=ve(m+g.focus),p=ve(p+g.fatigue),i.push({week:l,day:d,hour:u,inMeeting:!0,hourFocus:m,hourFatigue:p,hourProductivity:0,accumulatedProductivity:h,completedFeatures:c,featureCompleted:!1});continue}m=ve(m+e),p=ve(p+n);const k=ve(m-p),w=a-h,b=k>w,y=b?w:k;b?(c+=1,h=0):h+=y,i.push({week:l,day:d,hour:u,inMeeting:!1,hourFocus:m,hourFatigue:p,hourProductivity:y,accumulatedProductivity:h,completedFeatures:c,featureCompleted:b}),b&&(m=0)}}return i}function We(){return Array.from({length:ct},()=>new Array(ue).fill(0))}function He(t,{hour:e,day:n},a){const o=t[e];o&&(o[n]=(o[n]??0)+a)}function Nn(t,{featureSize:e,weeks:n}){const a=t[t.length-1],o=a?.completedFeatures??0,s=a?.accumulatedProductivity??0,r=o+Math.round(10*s/e)/10,i=o*e+s,h=Array.from({length:ue},()=>({productivity:0,features:0,meetings:0})),c={focus:We(),fatigue:We(),productivity:We(),features:We()};for(const d of t){const m=h[d.day];m.productivity+=d.hourProductivity,d.featureCompleted&&(m.features+=1),d.inMeeting&&(m.meetings+=1),He(c.focus,d,d.hourFocus),He(c.fatigue,d,d.hourFatigue),He(c.productivity,d,d.hourProductivity),d.featureCompleted&&He(c.features,d,1)}const l=d=>d.map(m=>m.map(p=>n>0?p/n:0));return{totalFeatures:r,totalProductivity:i,averageFeaturesPerWeek:n>0?r/n:0,averageProductivityPerWeek:n>0?i/n:0,days:h,hours:{focus:l(c.focus),fatigue:l(c.fatigue),productivity:l(c.productivity),features:c.features}}}const it=480,oe=240,B={top:10,right:10,bottom:34,left:36};function Ja(t,e,n,a){const o=it-B.left-B.right,s=oe-B.top-B.bottom,r=c=>B.top+s-(t>0?c/t*s:0),i=a.map(c=>`<line class="grid" x1="${B.left}" x2="${it-B.right}" y1="${r(c)}" y2="${r(c)}"/><text x="${B.left-4}" y="${r(c)+3}" text-anchor="end">${c}</text>`).join(""),h=(n>1?[1,Math.ceil(n/2),n]:[]).filter((c,l,d)=>d.indexOf(c)===l).map(c=>`<text x="${B.left+(c-1)/Math.max(1,n-1)*o}" y="${oe-B.bottom+14}" text-anchor="middle">${c}</text>`).join("");return`${i}${h}<text x="${B.left+o/2}" y="${oe-6}" text-anchor="middle">${e.x}</text><text transform="translate(9 ${B.top+s/2}) rotate(-90)" text-anchor="middle">${e.y}</text>`}function Ns(t,e){const n=Math.max(...t.map(l=>l.values.length),1),a=Math.max(1,...t.flatMap(l=>l.values)),o=it-B.left-B.right,s=oe-B.top-B.bottom,r=l=>B.left+l/Math.max(1,n-1)*o,i=l=>B.top+s-l/a*s,h=t.map(l=>{const d=l.values.map((m,p)=>`${r(p).toFixed(1)},${i(m).toFixed(1)}`).join(" ");return`<polyline class="line ${l.className}" points="${d}"><title>${l.name}</title></polyline>`}).join(""),c=t.map((l,d)=>`<rect class="${l.className}" x="${B.left+d*90}" y="${oe-B.bottom+20}" width="10" height="3"/><text x="${B.left+d*90+14}" y="${oe-B.bottom+24}">${l.name}</text>`).join("");return`<svg viewBox="0 0 ${it} ${oe}" role="img" aria-label="${e.y} by ${e.x}">${Ja(a,e,n,nn(a))}${h}${c}</svg>`}const Ln=480,ke=240,_={top:10,right:10,bottom:34,left:36};function Va(t,e,n){const a=Math.max(...t.map(u=>u.values.length),1),o=Math.max(1,...t.flatMap(u=>u.values)),s=Ln-_.left-_.right,r=ke-_.top-_.bottom,i=s/a,h=i*.7/t.length,c=u=>_.top+r-u/o*r,l=t.map((u,g)=>u.values.map((k,w)=>{const b=_.left+w*i+i*.15+g*h;return`<rect class="${u.className}" x="${b.toFixed(1)}" y="${c(k).toFixed(1)}" width="${h.toFixed(1)}" height="${(_.top+r-c(k)).toFixed(1)}"><title>${u.name}: ${Math.round(k*10)/10}</title></rect>`}).join("")).join(""),d=(n??[]).map((u,g)=>`<text x="${_.left+g*i+i/2}" y="${ke-_.bottom+14}" text-anchor="middle">${u}</text>`).join(""),m=t.map((u,g)=>`<rect class="${u.className}" x="${_.left+g*90}" y="${ke-_.bottom+20}" width="10" height="3"/><text x="${_.left+g*90+14}" y="${ke-_.bottom+24}">${u.name}</text>`).join(""),p=Ja(o,e,n?0:a,nn(o));return`<svg viewBox="0 0 ${Ln} ${ke}" role="img" aria-label="${e.y} by ${e.x}">${p}${l}${d}${m}</svg>`}const Wt=["Mon","Tue","Wed","Thu","Fri"],Ka=Array.from({length:ct},(t,e)=>`${9+e}:00`);function Ls(t){return t<=500?t:t<=750?500+(t-500)*2:t<1e3?1e3+(t-750)*35:1e4}function Ds(t){return t<=500?t:t<=1e3?500+(t-500)/2:t<1e4?750+(t-1e3)/35:1e3}function qe(t,e){const n=e.flat(),a=Math.min(...n),o=Math.max(...n),s=f("div",{class:"week"},f("span"),...Wt.map(r=>f("span",{class:"head"},r)));return e.forEach((r,i)=>{s.append(f("span",{class:"hour"},Ka[i]??""));for(const h of r){const c=o>a?(h-a)/(o-a):0;s.append(f("span",{class:"cell",style:`--heat:${(.1+c*.9).toFixed(2)}`},String(Math.round(h))))}}),f("div",{},f("h4",{},t),s)}function Rs(t){const e={focus:25,fatigue:15,featureSize:300,weeks:8},n={"🍽️ Lunch":{focus:-100,fatigue:-100},"🏃 Sprint plan":{focus:-100,fatigue:50},"😴 Boring":{focus:-50,fatigue:-25}},a={};for(let C=0;C<ue;C+=1)a[`${C}-3`]="🍽️ Lunch";let o="🏃 Sprint plan",s=null;const r=f("div",{class:"figures"}),i=f("div",{class:"chart"}),h=f("div",{class:"maps"}),c=f("div",{class:"week"}),l=f("select"),d=f("input",{type:"number",min:-100,max:100}),m=f("input",{type:"number",min:-100,max:100}),p=f("input",{type:"text",placeholder:"New meeting name",size:16}),u=(C,S,P,x,I=D=>D,L=D=>D)=>{const D=f("output",{},String(e[C])),O=f("input",{type:"range",min:P,max:x,value:L(e[C]),oninput:()=>{e[C]=I(Number(O.value)),D.textContent=String(e[C]),N()}});return f("label",{},`${S}: `,D,O)},g=f("div",{class:"dials"},u("focus","Focus an hour",0,100),u("fatigue","Fatigue an hour",0,100),u("featureSize","Feature size",0,1e3,Ls,Ds),u("weeks","Weeks",1,16));function k(){l.replaceChildren(...Object.keys(n).map(S=>f("option",{value:S,selected:S===o},S)));const C=n[o];d.value=String(C?.focus??0),m.value=String(C?.fatigue??0)}l.addEventListener("change",()=>{o=l.value,k()});const w=()=>{n[o]={focus:Number(d.value)||0,fatigue:Number(m.value)||0},N()};d.addEventListener("change",w),m.addEventListener("change",w);const b=()=>{const C=p.value.trim();!C||n[C]||(n[C]={focus:0,fatigue:0},o=C,p.value="",k())},y=f("div",{class:"row"},f("span",{},"Paint: "),l,f("span",{},"focus "),d,f("span",{},"fatigue "),m,p,f("button",{type:"button",onclick:b},"Add"));let $=null;const A=C=>{if($==="add"&&!a[C])a[C]=o;else if($==="remove"&&a[C])delete a[C];else return;N()};function M(){c.replaceChildren(f("span"),...Wt.map(C=>f("span",{class:"head"},C))),Ka.forEach((C,S)=>{c.append(f("span",{class:"hour"},C));for(let P=0;P<ue;P+=1){const x=`${P}-${S}`,I=a[x];c.append(f("span",{class:I?"slot meeting":"slot",title:I??"free",onpointerdown:L=>{L.preventDefault(),$=a[x]?"remove":"add",A(x)},onpointerenter:()=>{$&&A(x)}},I?I.slice(0,2):""))}})}window.addEventListener("pointerup",()=>{$=null});const v=f("div",{class:"row"}),E=()=>{s={summary:Nn(Pn({...e,calendar:a,meetingTypes:n}),e),weeks:e.weeks},N()},j=()=>{s=null,N()};function N(){M();const C=Pn({...e,calendar:a,meetingTypes:n}),S=Nn(C,e),P=e.weeks*ue*ct;r.replaceChildren(f("div",{class:"clean"},f("strong",{},S.totalFeatures.toFixed(1)),"features finished"),f("div",{},f("strong",{},S.averageFeaturesPerWeek.toFixed(2)),"features a week"),f("div",{},f("strong",{},Math.round(S.totalProductivity/P).toString()),"productivity an hour"),f("div",{},f("strong",{},String(P)),"hours simulated")),v.replaceChildren(s?f("span",{},`Baseline: ${s.summary.averageFeaturesPerWeek.toFixed(2)} features a week over ${s.weeks} weeks; now ${S.averageFeaturesPerWeek.toFixed(2)}. `):f("span",{},"Keep this run to compare against: "),f("button",{type:"button",onclick:E},s?"Save again":"Save as baseline")),s&&v.append(f("button",{type:"button",onclick:j},"Clear")),i.innerHTML=Va([{name:"Productivity",className:"clean",values:S.days.map(x=>x.productivity/e.weeks)},{name:"Features ×100",className:"debt",values:S.days.map(x=>x.features/e.weeks*100)}],{x:"",y:"A day, on average"},Wt),i.prepend(f("h4",{},"The shape of a week")),h.replaceChildren(qe("Focus",S.hours.focus),qe("Fatigue",S.hours.fatigue),qe("Productivity",S.hours.productivity),qe("Features finished",S.hours.features))}k(),t.append(g,y,f("div",{class:"charts"},c,i),r,v,h),N()}const Fs={name:"developer-meetings",apps:{"developer-meetings":Rs}},Z=t=>[...t.replace(/\s/g,"")].map(e=>e==="#"?1:0),fe={A:Z(".###. #...# ##### #...# #...#"),B:Z("####. #...# ####. #...# ####."),C:Z(".#### #.... #.... #.... .####"),D:Z("####. #...# #...# #...# ####."),E:Z("##### #.... ####. #.... #####"),H:Z("#...# #...# ##### #...# #...#"),O:Z(".###. #...# #...# #...# .###."),T:Z("##### ..#.. ..#.. ..#.. ..#.."),X:Z("#...# .#.#. ..#.. .#.#. #...#")};function dt(t){let e=t>>>0;return()=>{e=e+1831565813>>>0;let n=Math.imul(e^e>>>15,1|e);return n=n+Math.imul(n^n>>>7,61|n)^n,((n^n>>>14)>>>0)/4294967296}}const Bs=t=>1/(1+Math.exp(-t));class Ws{weights;constructor(e,n){const a=dt(n);this.weights=e.slice(1).map((o,s)=>Array.from({length:o},()=>Array.from({length:e[s]+1},()=>a()-.5)))}forward(e){const n=[[...e]];for(const a of this.weights){const o=[...n[n.length-1],1];n.push(a.map(s=>Bs(s.reduce((r,i,h)=>r+i*o[h],0))))}return n}answer(e){return this.forward(e).pop()}learn(e,n,a){const o=this.forward(e),s=o[o.length-1];let r=s.map((h,c)=>(h-n[c])*h*(1-h));for(let h=this.weights.length-1;h>=0;h-=1){const c=[...o[h],1],l=this.weights[h],d=o[h].map((m,p)=>{let u=0;for(let g=0;g<l.length;g+=1)u+=l[g][p]*r[g];return u*m*(1-m)});for(let m=0;m<l.length;m+=1)for(let p=0;p<c.length;p+=1)l[m][p]-=a*r[m]*c[p];r=d}let i=0;for(let h=0;h<s.length;h+=1)i+=(s[h]-n[h])**2;return i/2}}const Hs=10,Dn=.5;class Xa{constructor(e,n){this.shapes=e,this.network=new Ws([25,Hs,e.length],n),this.noise=dt(n+1)}shapes;network;noise;rounds=0;error=0;train(e){for(let n=0;n<e;n+=1){let a=0;this.shapes.forEach(({pixels:o},s)=>{const r=this.shapes.map((h,c)=>c===s?1:0),i=Math.floor(this.noise()*o.length);a+=this.network.learn(o,r,Dn),a+=this.network.learn(o.map((h,c)=>c===i?1-h:h),r,Dn)}),this.error=a,this.rounds+=1}}read(e){const n=this.network.answer(e);return this.shapes.map(({name:a},o)=>({letter:a,score:n[o]}))}}const qs=[{name:"A",pixels:fe.A},{name:"B",pixels:fe.B}];function Ht(t=qs){const e=new Xa(t,1);return e.train(200),e}const zs=3;function Za(t,e,n){const a=t.trim();return a===""?"Give it a name first.":[...a].length>zs?"A name of three characters at most.":n.includes(a)?`“${a}” is already a letter it knows.`:e.some(Boolean)?null:"There is no ink on the grid to remember."}const _s=t=>Array.isArray(t)&&t.length===25&&t.every(e=>e===0||e===1);function Gs(t,e=[]){let n;try{n=JSON.parse(t??"[]")}catch{return[]}if(!Array.isArray(n))return[];const a=[];for(const o of n){const{name:s,pixels:r}=o??{};typeof s!="string"||!_s(r)||Za(s,r,[...e,...a.map(i=>i.name)])||a.push({name:s.trim(),pixels:r})}return a}function Qa(t,e){const n=e.map((i,h)=>`<button type="button" class="cell" data-at="${h}" aria-pressed="${i?"true":"false"}" aria-label="cell ${h+1}"></button>`).join(""),a=t.read(e),o=a.reduce((i,h)=>h.score>i.score?h:i),s=a.map(({letter:i,score:h})=>`<tr${i===o.letter?' class="best"':""}><th scope="row">${T(i)}</th><td class="sure"><span class="bar" style="--p:${h.toFixed(3)}"></span>${Math.round(h*100)}%</td></tr>`).join(""),r=t.rounds===0?"It has not been taught anything yet: every answer is a guess.":`It reads <b>${T(o.letter)}</b>, after ${t.rounds} rounds of lessons.`;return`<div class="letters"><div class="grid" role="group" aria-label="the drawing, five cells by five">${n}</div><div class="reading"><p>${r}</p><table class="answers"><tbody>${s}</tbody></table></div></div>`}const Rn="first-network:own",Fn=Object.entries(fe).map(([t,e])=>({name:t,pixels:e}));function Ys(t){let e=g();const n=new Set(["A","B",...e.map(({name:v})=>v)]),a=()=>[...Fn,...e];let o=Ht(p()),s=[...fe.A];const r=f("div",{onclick:v=>{const E=v.target.closest("[data-at]")?.dataset.at;E!==void 0&&(s[Number(E)]=1-s[Number(E)],d())}}),i=f("div",{class:"row"}),h=f("div",{class:"row taught"}),c=f("input",{type:"text",maxlength:3,size:4,"aria-label":"a name for the drawing"}),l=f("p",{class:"error",hidden:!0});function d(){r.innerHTML=Qa(o,s)}function m(v){s=v,d()}function p(){return a().filter(v=>n.has(v.name))}function u(){o=Ht(p()),d()}function g(){try{return Gs(localStorage.getItem(Rn),Object.keys(fe))}catch{return[]}}function k(){try{localStorage.setItem(Rn,JSON.stringify(e))}catch{}}function w(){const v=Za(c.value,s,a().map(j=>j.name));if(l.textContent=v??"",l.hidden=v===null,v)return;const E={name:c.value.trim(),pixels:[...s]};e=[...e,E],n.add(E.name),c.value="",k(),$(),u()}function b(v){e=e.filter(E=>E.name!==v),n.delete(v);for(const E of Fn)n.size<2&&n.add(E.name);k(),$(),u()}const y=(v,E)=>f("button",{type:"button",onclick:E},v);function $(){i.replaceChildren("Draw ",...a().map(v=>y(v.name,()=>m([...v.pixels]))),y("one cell wrong",()=>{const v=Math.floor(Math.random()*s.length);m(s.map((E,j)=>j===v?1-E:E))}),y("clear",()=>m(s.map(()=>0)))),h.replaceChildren("Taught: ",...a().map(v=>{const E=f("input",{type:"checkbox",value:v.name,checked:n.has(v.name),onchange:()=>{E.checked?n.add(v.name):n.size>2?n.delete(v.name):E.checked=!0,u()}}),j=e.includes(v)&&f("button",{type:"button",class:"forget","aria-label":`forget ${v.name}`,onclick:()=>b(v.name)},"×");return f("label",{},E,` ${v.name}`,j)}))}const A=f("div",{class:"row"},y("teach 100 more rounds",()=>{o.train(100),d()}),y("forget everything",()=>{o=new Xa(o.shapes,1),d()})),M=f("div",{class:"row own"},"Your own: draw it, name it ",c,y("remember this drawing",()=>w()),l);$(),t.replaceChildren(i,r,h,A,M),d()}const Us=()=>Qa(Ht(),fe.A),Js={name:"first-network",apps:{letters:Ys},stills:{letters:Us}},Vs=1.5,Ks=.02,Xs=.25;class Zs{constructor(e,n,a,o){this.credit=a,this.random=o,this.remaining=[...e],this.buyers=n.map(s=>({bidder:s,credit:a,won:[],error:null}))}credit;random;buyers;remaining;sold=[];turns=[];get over(){return this.remaining.length===0}get next(){return this.remaining[0]}get market(){return{lots:this.remaining,credits:Object.fromEntries(this.buyers.map(e=>[e.bidder.name,e.credit])),sales:this.sold}}demands(){const e=this.next;return Object.fromEntries(this.buyers.map(n=>[n.bidder.name,e?this.demandOf(n,e):null]))}sell(){const e=this.remaining.shift();if(!e)throw new Error("the floor is empty");const n=this.buyers.map(s=>this.demandOf(s,e)),a=Object.fromEntries(this.buyers.map((s,r)=>[s.bidder.name,n[r]===null?null:e.value/(1+n[r])])),o=this.buyers.filter(s=>(a[s.bidder.name]??0)>s.credit).map(s=>s.bidder.name);for(let s=e.value*Vs;s>=e.value*Xs;s-=e.value*Ks){const r=(e.value-s)/s,i=this.buyers.filter((c,l)=>c.credit>=s&&r>=(n[l]??1/0));if(i.length===0)continue;const h=i[Math.min(i.length-1,Math.floor(this.random()*i.length))];return h.credit-=s,h.won.push(e),this.record({lot:e,buyer:h.bidder.name,price:s},a,o)}return this.record({lot:e,buyer:null,price:null},a,o)}standings(){return this.buyers.map(({bidder:e,credit:n,won:a,error:o})=>{const s=a.reduce((i,h)=>i+h.value,0),r=this.credit-n;return{name:e.name,credit0:this.credit,credit:n,spent:r,lots:a.length,value:s,profit:s-r,error:o}})}record(e,n,a){return this.sold.push(e),this.turns.push({sale:e,bids:n,short:a}),e}demandOf(e,n){try{const a=e.bidder.demands(n,this.market,e.bidder.name);if(typeof a!="number"||Number.isNaN(a))throw new Error(`demanded ${String(a)}, not a margin`);return e.error=null,a}catch(a){return e.error=a instanceof Error?a.message:String(a),null}}}const Bn=[["sardines",30],["anchovies",40],["squid",90],["hake",120],["sole",180],["prawns",250],["monkfish",300],["tuna",400]];function Qs(t,e){return Array.from({length:t},(n,a)=>{const[o,s]=Bn[Math.floor(e()*Bn.length)];return{id:a+1,kind:o,value:Math.round(s*(.7+.6*e()))}})}const er=60;function eo(t,e,n){const a=dt(t),o=Qs(er,a),s=o.reduce((r,i)=>r+i.value,0);return new Zs(o,e,n*s/Math.max(1,e.length),a)}function Wn(t,e="You"){const n=new Function("lot","market","me",t);return{name:e,demands:n}}const Hn=`// Return the margin you demand: (value - price) / price.
// You are told the lots still to sell, everyone's credit, and every sale so far.
// This is Vicente. Change the 0.9 first.
const fish = market.lots.reduce((sum, lot) => sum + lot.value, 0);
const money = 0.9 * Object.values(market.credits).reduce((sum, c) => sum + c, 0);
if (money <= 0) return 0.001;
return Math.max(0.001, (fish - money) / money);
`,tr=12,X=t=>Math.round(t).toString(),qn=t=>t===null?"—":t===1/0?"∞":`${Math.round(t*100)}%`;function to(t){const e=t.next,n=t.demands(),a=[...t.standings()].sort((l,d)=>d.profit-l.profit),o=Math.max(1,...a.map(l=>Math.abs(l.profit))),s=e?`<p class="lot">Next on the floor: <b>a box of ${T(e.kind)}</b>, which resells for ${X(e.value)}. The price starts at ${X(e.value*1.5)} and falls.</p>`:'<p class="lot">The floor is empty.</p>',i=`<table class="board"><thead><tr><th>buyer</th><th>asks</th><th>holds</th><th>spent</th><th>worth</th><th>credit</th><th>profit</th></tr></thead><tbody>${a.map(({name:l,lots:d,spent:m,value:p,profit:u,credit:g,error:k})=>{const w=k?`<td class="asks error" colspan="5">${T(k)}</td>`:`<td class="asks">${qn(n[l]??null)}</td>`;return`<tr${u<0?' class="loss"':""}><th scope="row">${T(l)}</th>${w}`+(k?"":`<td>${d} lot${d===1?"":"s"}</td><td>${X(m)}</td><td>${X(p)}</td><td>${X(g)}</td>`)+`<td class="profit"><span class="bar" style="--p:${(Math.abs(u)/o).toFixed(3)}"></span>${X(u)}</td></tr>`}).join("")}</tbody></table>`,h=t.turns,c=h.length?`<ol class="sales" reversed start="${h.length}">${[...h].reverse().slice(0,tr).map(({sale:{lot:l,buyer:d,price:m},bids:p,short:u})=>{const g=m===null||d===null?"<i>withdrawn</i>":`sold at <b>${X(m)}</b>, a margin of ${qn((l.value-m)/m)}`,k=Object.entries(p).map(([w,b])=>{if(b===null)return`${T(w)} —`;const y=w===d?`<b>${T(w)}</b>`:T(w);return u.includes(w)?`<s title="more than it had">${y} at ${X(b)}</s>`:`${y} at ${X(b)}`}).join(", ");return`<li><span class="went">${T(l.kind)}, ${X(l.value)}: ${g}.</span> <span class="ready">Ready to shout: ${k}.</span></li>`}).join("")}</ol>`:"";return`<div class="fish-market">${s}${i}${c}</div>`}function zn(t,e){return{name:t,demands:()=>e}}const _n=.001;function an(t,e){const n=t.lots.reduce((o,s)=>o+s.value,0),a=e*Object.values(t.credits).reduce((o,s)=>o+s,0);return a<=0?_n:Math.max(_n,(n-a)/a)}const nr=.9,ar=3,ze=10;function or(t="Planner"){return{name:t,demands(e,n,a){const o=an(n,nr),s=o*(ar-1)/ze,r=p=>o+p*s,i=p=>Math.max(0,Math.min(ze-1,Math.floor((p-o)/s))),h=new Array(ze).fill(0);for(const p of n.sales){if(p.price===null)continue;const u=i((p.lot.value-p.price)/p.price);h[u]=h[u]+p.lot.value}const c=h.reduce((p,u)=>p+u,0);if(c===0)return o;const l=n.lots.reduce((p,u)=>p+u.value,0),d=n.credits[a]??0;let m=0;for(let p=ze-1;p>=0;p-=1)if(m+=l*h[p]/c/(1+r(p)),m>=d)return r(p);return o}}}function sr(t=.9,e="Vicente"){return{name:e,demands:(n,a)=>an(a,t)}}const rr=.98,ir=1.05,hr=.95,lr=t=>(t.lot.value-t.price)/t.price;function Gn(t,e){const n=e.filter(o=>o.buyer===t),a=n.reduce((o,s)=>o+s.price,0);return a>0?(n.reduce((o,s)=>o+s.lot.value,0)-a)/a:0}function cr(t="Wanda"){return{name:t,demands(e,n,a){const o=an(n,rr),s=Gn(a,n.sales);let r=1;for(const i of n.sales)i.buyer!==null&&(i.buyer===a?r*=ir:Gn(i.buyer,n.sales)>=s&&lr(i)>=o&&(r*=hr));return o*r}}}function no(t=.9){return[zn("Patient",1),zn("Hasty",.05),sr(t),cr(),or()]}const dr=250,ur=1,Yn="fish-market:own",_e="fish-market:seated";function mr(t){let e=ur,n=null,a,o=null;const s=f("div"),r=f("p",{class:"error",hidden:!0}),i=f("output",{},"90%"),h=f("input",{type:"range",min:.5,max:1,step:.02,value:.9,oninput:()=>u()}),c=f("output",{},"50%"),l=f("input",{type:"range",min:.3,max:1.2,step:.05,value:.5,oninput:()=>u()}),d=f("textarea",{class:"agent",spellcheck:!1,rows:9,oninput:()=>b()}),m=f("button",{type:"button",onclick:()=>o?w():k()},"run");function p(){s.innerHTML=to(a)}function u(){w(),i.textContent=`${Math.round(Number(h.value)*100)}%`,c.textContent=`${Math.round(Number(l.value)*100)}%`,a=eo(e,[...no(Number(h.value)),...n?[n]:[]],Number(l.value)),p()}function g(){return a.over?!1:(a.sell(),p(),!0)}function k(){m.textContent="stop",o=setInterval(()=>{g()||w()},dr)}function w(){o&&clearInterval(o),o=null,m.textContent="run"}function b(){try{localStorage.setItem(Yn,d.value)}catch{}}function y(){try{n=Wn(d.value),r.hidden=!0,localStorage.setItem(_e,"yes")}catch(j){n=null,r.textContent=j instanceof Error?j.message:String(j),r.hidden=!1,localStorage.removeItem(_e)}u()}function $(){n=null,localStorage.removeItem(_e),u()}const A=f("div",{class:"dials"},f("label",{},"Vicente believes the others will spend: ",i,h),f("label",{},"Money in the room, as a share of the fish: ",c,l)),M=f("div",{class:"row"},f("button",{type:"button",onclick:()=>{g()}},"next lot"),m,f("button",{type:"button",onclick:()=>{for(w();g(););}},"whole morning"),f("button",{type:"button",onclick:()=>{e=Math.floor(Math.random()*1e9),u()}},"new morning")),v=f("div",{class:"row"},f("button",{type:"button",onclick:()=>y()},"seat it"),f("button",{type:"button",onclick:()=>$()},"stand it down")),E=f("details",{class:"own"},f("summary",{},"Seat your own agent"),d,v,r);try{d.value=localStorage.getItem(Yn)??Hn,localStorage.getItem(_e)&&(n=Wn(d.value))}catch{d.value=Hn}return t.replaceChildren(A,M,s,E),u(),w}const pr=()=>to(eo(1,no(),.5)),fr={name:"fish-market",apps:{"fish-market":mr},stills:{"fish-market":pr}};function gr(t,e){const n=[];for(let a=t.length-1;a>=0;a-=1)n.push(t.slice(0,a));for(let a=1;a<=e.length;a+=1)n.push(e.slice(0,a));return n}const wr=3800,yr=6500,br=26,vr=46,kr=420;function xr(t){return[...t.childNodes].map(e=>e.nodeName==="BR"?`
`:e.textContent??"").join("")}function $r(t){const e=document.querySelector("main h1");if(!e||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return()=>{};const n={text:xr(e)};e.setAttribute("aria-label",n.text),e.classList.add("typing");const a=document.createElement("span");a.className="caret idle",a.setAttribute("aria-hidden","true");const o=(l,d)=>{const m=l.split(`
`).flatMap((p,u)=>u===0?[p]:[document.createElement("br"),p]);if(d){const p=document.createElement("a");p.href=d,p.append(...m,a),e.replaceChildren(p)}else e.replaceChildren(...m,a)};o(n.text);let s=n,r=[],i=performance.now()+wr,h=0;const c=l=>{if(h=requestAnimationFrame(c),l<i)return;if(r.length===0){const m=t(s,n);r=gr(s.text,m.text),s=m,a.classList.remove("idle")}const d=r.shift()??s.text;o(d,r.length===0?s.href:void 0),r.length===0?(a.classList.add("idle"),i=l+yr):d===""?i=l+kr:i=l+(d.length<(r[0]?.length??0)?vr:br)};return h=requestAnimationFrame(c),()=>{cancelAnimationFrame(h),o(n.text),a.remove(),e.classList.remove("typing"),e.removeAttribute("aria-label")}}function Tr(t,e){const n=[...t];for(let a=n.length-1;a>0;a-=1){const o=Math.min(a,Math.floor(e()*(a+1)));[n[a],n[o]]=[n[o],n[a]]}return n}function Sr(t,e){let n=[];return a=>(n.length===0&&(n=Tr(t,e),n.length>1&&n[0]===a&&n.push(n.shift())),n.shift()??a)}const Mr=[{text:`More than
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
as this page opened.`,href:"/projects/worlds/"}];let vt=null;const Ar={name:"headline",arrive:t=>{if(vt?.(),vt=null,t.route!=="/")return;let e=null;vt=$r((n,a)=>(e??=Sr([a,...Mr],Math.random),e(n)))}};function Un(t,e="You"){const n=new Function("fish","weeks","bots","me","rounds",t);return{name:e,orders:n}}const Jn=`// Return your orders for the round: one number a week, 0 to rest.
// You know the fish at the start, the weeks, who is on the lagoon (bots),
// your name (me), and every round before (rounds), but not what the others
// will do this time.
// This one rests, lets the lagoon grow, and takes one share the last week.
let grown = fish;
for (let week = 1; week < weeks; week++) grown += Math.floor(grown / 2);
const orders = new Array(weeks).fill(0);
orders[weeks - 1] = Math.floor(grown / bots.length);
return orders;
`;function ao(t){const e=t.rounds[t.rounds.length-1],n=t.scores(),a=Math.max(1,...Object.values(n)),o=[...t.names].sort((m,p)=>n[p]-n[m]).map(m=>{const p=t.errors[m];return`<tr><th scope="row">${T(m)}</th>`+(p?`<td class="error" colspan="2">${T(p)}</td>`:`<td>${e?.totals[m]??0}</td><td class="profit"><span class="bar" style="--p:${(n[m]/a).toFixed(3)}"></span>${n[m]}</td>`)+"</tr>"}).join(""),s=t.rounds.length,r=`<table class="board"><caption>${s===0?"The season has not started":`After ${s} round${s===1?"":"s"}`}</caption><thead><tr><th>bot</th><th>last round</th><th>season</th></tr></thead><tbody>${o}</tbody></table>`;if(!e)return`<div class="lagoon"><p class="lot">The lagoon has <b>${t.fish} fish</b>, and ${t.weeks} weeks ahead. Nobody has been out yet.</p>${r}</div>`;const i=e.weeks.map((m,p)=>`<th>${p+1}</th>`).join(""),h=Math.max(1,...e.weeks.map(m=>m.fish)),c=e.weeks.map(m=>`<td><span class="fish" style="--p:${(m.fish/h).toFixed(3)}"></span>${m.fish}</td>`).join(""),l=t.names.map(m=>{const p=e.weeks.map((u,g)=>{const k=e.orders[m]?.[g]??0,w=u.caught[m]??0;return`<td${k>w?' class="short"':""} title="asked for ${k}">${w}</td>`}).join("");return`<tr><th scope="row">${T(m)}</th>${p}<td class="total">${e.totals[m]}</td></tr>`}).join("");return`<div class="lagoon">${`<table class="weeks"><caption>Round ${s}, week by week: what each bot caught, and what was left in the lagoon</caption><thead><tr><th>week</th>${i}<th>total</th></tr></thead><tbody>${l}<tr class="water"><th scope="row">in the lagoon</th>${c}<td></td></tr></tbody></table>`}${r}</div>`}function oo(t,e,n){const a=[];let o=t;for(let s=0;s<e;s+=1){const r=Math.max(0,Math.min(o,Math.floor(n(o,s))));a.push(r),o-=r,o+=Math.floor(o/2)}return a}const Ge={rest:{name:"Rest",orders:(t,e)=>new Array(e).fill(0)},one:{name:"One",orders:(t,e)=>new Array(e).fill(1)},power:{name:"Power",orders:(t,e)=>Array.from({length:e},(n,a)=>a*a)},percent:t=>({name:`${Math.round(t*100)}%`,orders:(e,n)=>oo(e,n,a=>a*t)})},Vn=(t,e)=>Math.ceil(t/e);function Kn(t="Tit for tat"){const e=new Set;return{name:t,orders(n,a,o,s,r){for(const h of r)for(const c of Object.keys(h.orders))c!==s&&(h.orders[c]?.[0]??0)>=Vn(h.start,o.length)&&e.add(c);if(o.some(h=>h!==s&&e.has(h)))return oo(n,a,h=>Vn(h,o.length));let i=n;for(let h=1;h<a;h+=1)i+=Math.floor(i/2);return[...new Array(a-1).fill(0),Math.floor(i/o.length)]}}}function so(){return[{fisher:Ge.one,seated:!0},{fisher:Ge.power,seated:!0},{fisher:Ge.percent(.1),seated:!0},{fisher:Ge.percent(.4),seated:!1},{fisher:Kn("Tit for tat"),seated:!0},{fisher:Kn("Tat for tit"),seated:!0}]}function Ir(t,e,n){const a=Object.keys(n),o=[],s=Object.fromEntries(a.map(i=>[i,0]));let r=t;for(let i=0;i<e;i+=1){const h=Object.fromEntries(a.map(l=>[l,0])),c=a.map(l=>({name:l,order:Math.max(0,Math.floor(n[l]?.[i]??0))})).filter(({order:l})=>l>0);for(const l of[...new Set(c.map(({order:d})=>d))].sort((d,m)=>d-m)){const d=c.filter(p=>p.order===l),m=Math.min(Math.floor(r/d.length),l);for(const{name:p}of d)h[p]=m,s[p]=s[p]+m;r-=m*d.length}r+=Math.floor(r/2),o.push({fish:r,caught:h})}return{start:t,orders:n,weeks:o,totals:s}}class ro{constructor(e,n,a){this.fish=e,this.weeks=n,this.fishers=a}fish;weeks;fishers;rounds=[];errors={};get names(){return this.fishers.map(e=>e.name)}play(){const e=Object.fromEntries(this.fishers.map(a=>[a.name,this.ordersOf(a)])),n=Ir(this.fish,this.weeks,e);return this.rounds.push(n),n}scores(){return Object.fromEntries(this.names.map(e=>[e,this.rounds.reduce((n,a)=>n+(a.totals[e]??0),0)]))}ordersOf(e){try{const n=e.orders(this.fish,this.weeks,this.names,e.name,this.rounds);if(!Array.isArray(n)||n.some(a=>typeof a!="number"||Number.isNaN(a)))throw new Error("orders must be an array of numbers, one a week");return delete this.errors[e.name],Array.from({length:this.weeks},(a,o)=>n[o]??0)}catch(n){return this.errors[e.name]=n instanceof Error?n.message:String(n),new Array(this.weeks).fill(0)}}}const Xn="lagoon:own",Ye="lagoon:seated";function Er(t){let e=null,n;const a=f("div"),o=f("p",{class:"error",hidden:!0}),s=f("output",{},"100"),r=f("input",{type:"range",min:5,max:200,step:1,value:100,oninput:()=>m()}),i=f("output",{},"10"),h=f("input",{type:"range",min:4,max:14,step:1,value:10,oninput:()=>m()}),c=f("textarea",{class:"agent",spellcheck:!1,rows:11,oninput:()=>u()}),l=so().map(({fisher:M,seated:v})=>({fisher:M,box:f("input",{type:"checkbox",checked:v,onchange:()=>m()})}));function d(){a.innerHTML=ao(n)}function m(){s.textContent=r.value,i.textContent=h.value;const M=l.filter(({box:v})=>v.checked).map(({fisher:v})=>v);n=new ro(Number(r.value),Number(h.value),[...M,...e?[e]:[]]),d()}function p(M){for(let v=0;v<M;v+=1)n.play();d()}function u(){try{localStorage.setItem(Xn,c.value)}catch{}}function g(){try{e=Un(c.value),o.hidden=!0,localStorage.setItem(Ye,"yes")}catch(M){e=null,o.textContent=M instanceof Error?M.message:String(M),o.hidden=!1,localStorage.removeItem(Ye)}m()}function k(){e=null,localStorage.removeItem(Ye),m()}const w=f("div",{class:"dials"},f("label",{},"Fish in the lagoon at the start: ",s,r),f("label",{},"Weeks in a round: ",i,h)),b=f("div",{class:"row bench"},"On the lagoon: ",...l.map(({fisher:M,box:v})=>f("label",{},v,` ${M.name}`))),y=f("div",{class:"row"},f("button",{type:"button",onclick:()=>p(1)},"play a round"),f("button",{type:"button",onclick:()=>p(5)},"play five"),f("button",{type:"button",onclick:()=>m()},"new season")),$=f("div",{class:"row"},f("button",{type:"button",onclick:()=>g()},"seat it"),f("button",{type:"button",onclick:()=>k()},"stand it down")),A=f("details",{class:"own"},f("summary",{},"Seat your own bot"),c,$,o);try{c.value=localStorage.getItem(Xn)??Jn,localStorage.getItem(Ye)&&(e=Un(c.value))}catch{c.value=Jn}t.replaceChildren(w,b,y,a,A),m()}const Cr=()=>ao(new ro(100,10,so().filter(({seated:t})=>t).map(({fisher:t})=>t))),jr={name:"lagoon",apps:{lagoon:Er},stills:{lagoon:Cr}},J={N:1,S:2,E:4,W:8};function io(t){const{width:e,height:n,cells:a,links:o}=t,s=e*n-1,r=new Map([[0,-1]]),i=[0];for(let c=0;c<i.length;c+=1){const l=i[c];if(l===s)break;const d=l%e,m=Math.floor(l/e),p=a[l],u=[];p&J.E&&d+1<e&&u.push(l+1),p&J.W&&d>0&&u.push(l-1),p&J.N&&m+1<n&&u.push(l+e),p&J.S&&m>0&&u.push(l-e);const g=o.get(l);g!==void 0&&o.get(g)===l&&u.push(g);for(const k of u)r.has(k)||(r.set(k,l),i.push(k))}if(!r.has(s))return null;const h=[];for(let c=s;c!==-1;c=r.get(c))h.unshift({x:c%e,y:Math.floor(c/e)});return h}function ho(t){const e=io(t);if(!e)return"There is no way out: the only one ran through a sphere that leads nowhere.";const n=e.slice(1).filter((o,s)=>Math.abs(o.x-e[s].x)+Math.abs(o.y-e[s].y)>1).length,a=n===0?"touches no sphere":`jumps through ${n===1?"one sphere":`${n} spheres`}`;return`The way out is ${e.length} rooms long, and ${a}.`}const Zn=0x5deece66dn,Or=0xbn,Qn=(1n<<48n)-1n;class Pr{seed;constructor(e){this.seed=(BigInt(e)^Zn)&Qn}nextInt(e){if((e&-e)===e)return Number(BigInt(e)*BigInt(this.next(31))>>31n);for(;;){const n=this.next(31),a=n%e;if((n-a+(e-1)|0)>=0)return a}}next(e){return this.seed=this.seed*Zn+Or&Qn,Number(BigInt.asIntN(32,this.seed>>BigInt(48-e)))}}const ea=16,Nr=[["N","E","W","S"],["W","S","E","N"],["S","E","W","N"]],Lr={N:[0,1,"S"],S:[0,-1,"N"],E:[1,0,"W"],W:[-1,0,"E"]};function lo(t,e,n,{spheres:a=!0}={}){const o=new Pr(n),s=new Array(t*e).fill(0),r=new Map,i=[],h=(d,m)=>d+m*t;function c(d,m){i.push({x:d,y:m}),a&&o.nextInt(10)<1&&l(d,m);for(const p of Nr[o.nextInt(3)]){const[u,g,k]=Lr[p],w=d+u,b=m+g;w<0||b<0||w>=t||b>=e||s[h(w,b)]!==0||(s[h(d,m)]|=J[p],s[h(w,b)]=J[k],c(w,b),i.push({x:d,y:m}))}}function l(d,m){const p=o.nextInt(t),u=o.nextInt(e);s[h(p,u)]===0&&(s[h(d,m)]|=ea,s[h(p,u)]=ea,r.set(h(d,m),h(p,u)),r.set(h(p,u),h(d,m)),c(p,u),i.push({x:d,y:m}))}return c(0,0),s[h(0,0)]|=J.S,s[h(t-1,e-1)]|=J.N,{width:t,height:e,cells:s,links:r,path:i}}const z=10,Ue=4;function co(t,{trail:e,way:n}={}){const{width:a,height:o,cells:s,links:r}=t,i=w=>Ue+w*z,h=w=>Ue+(o-1-w)*z,c=({x:w,y:b})=>[i(w)+z/2,h(b)+z/2],l=[];for(let w=0;w<o;w+=1)for(let b=0;b<a;b+=1){const y=s[b+w*a];y&J.S||l.push(`M${i(b)} ${h(w)+z}h${z}`),y&J.W||l.push(`M${i(b)} ${h(w)}v${z}`),w===o-1&&!(y&J.N)&&l.push(`M${i(b)} ${h(w)}h${z}`),b===a-1&&!(y&J.E)&&l.push(`M${i(b)+z} ${h(w)}v${z}`)}const d=new Map;let m=0;const p=[...r].map(([w,b])=>{const y=r.get(b)===w;if(!y)m+=1;else if(!d.has(w)){const M=String.fromCharCode(97+d.size/2%26);d.set(w,M).set(b,M)}const[$,A]=c({x:w%a,y:Math.floor(w/a)});return`<circle class="sphere${y?"":" dead"}" cx="${$}" cy="${A}" r="${z*.3}"/><text class="letter" x="${$}" y="${A}">${y?d.get(w):"×"}</text>`}),u=w=>w.map((b,y)=>{const $=w[y-1];return`${$&&Math.abs(b.x-$.x)+Math.abs(b.y-$.y)===1?"L":"M"}${c(b).join(" ")}`}).join(""),g=[];if(n&&g.push(`<path class="way" d="${u(n)}"/>`),e!==void 0&&e>0){const w=t.path.slice(0,e),[b,y]=c(w[w.length-1]);g.push(`<path class="trail" d="${u(w)}"/>`,`<circle class="walker" cx="${b}" cy="${y}" r="${z*.22}"/>`)}return`<svg class="maze" role="img" aria-label="${`A ${a} by ${o} maze with ${r.size} sphere${r.size===1?"":"s"}`+(m?`, ${m} leading nowhere`:"")+"."}" viewBox="0 0 ${a*z+2*Ue} ${o*z+2*Ue}">`+g.join("")+`<path class="walls" d="${l.join("")}"/>`+p.join("")+"</svg>"}const me={size:7,seed:543},Dr=100;function Rr(t){let e,n=0,a=!1,o=null;const s=f("div",{class:"figure"}),r=f("p",{class:"status"}),i=f("output",{},String(me.size)),h=f("input",{type:"range",min:5,max:30,step:1,value:me.size,oninput:()=>u()}),c=f("input",{type:"number",value:me.seed,onchange:()=>u()}),l=f("input",{type:"checkbox",checked:!0,onchange:()=>u()}),d=f("button",{type:"button",onclick:()=>o?k():g()},"walk the camera"),m=f("button",{type:"button",onclick:()=>w()},"show the way out");function p(){s.innerHTML=co(e,{trail:n,way:a?io(e):null})}function u(){k(),n=0,i.textContent=h.value,e=lo(Number(h.value),Number(h.value),Number(c.value),{spheres:l.checked}),r.textContent=ho(e),p()}function g(){n>=e.path.length&&(n=0),d.textContent="stop",o=setInterval(()=>{n+=1,p(),n>=e.path.length&&k()},Dr)}function k(){o&&clearInterval(o),o=null,d.textContent="walk the camera"}function w(){a=!a,m.textContent=a?"hide the way out":"show the way out",p()}const b=f("button",{type:"button",onclick:()=>(c.value=String(Math.floor(Math.random()*1e6)),u())},"another"),y=f("div",{class:"dials"},f("label",{},"Rooms a side: ",i,h),f("label",{},"Seed: ",c,b),f("label",{},l," spheres, as on 20 May (unticked: 13 May)"));return t.replaceChildren(f("div",{class:"maze-app"},s,r,f("div",{class:"row"},d,m),y)),u(),k}const Fr=()=>{const t=lo(me.size,me.size,me.seed);return`<div class="maze-app"><div class="figure">${co(t)}</div><p class="status">${ho(t)}</p></div>`},Br={name:"maze",apps:{maze:Rr},stills:{maze:Fr}};function Wr(t,e){let n=Array.from({length:e.length+1},(a,o)=>o);for(let a=1;a<=t.length;a+=1){const o=[a];for(let s=1;s<=e.length;s+=1){const r=(n[s-1]??0)+(t[a-1]===e[s-1]?0:1);o[s]=Math.min(r,(n[s]??0)+1,(o[s-1]??0)+1)}n=o}return n[e.length]??0}function Hr(t,e){if(e.includes(t))return t;let n=null,a=1/0;for(const o of e){const s=Wr(t,o);s<a&&([n,a]=[o,s])}return n}const qr=/[\p{L}\p{M}\p{N}']+|[.,!?;:]/gu,zr=/\]\([^)]*\)|^---[\s\S]*?\n---|[#*_`>\[\]|]|::[a-z-]+/gm;function ht(t){return t.normalize("NFKC").replace(zr," ").toLowerCase().match(qr)??[]}const Je=" ";class qt{constructor(e,n){this.memory=n;const a=ht(e),o=new Map;for(const s of a)o.set(s,(o.get(s)??0)+1);this.vocabulary=[...o.keys()],this.commonest=[...o].reduce((s,r)=>s&&s[1]>=r[1]?s:r,null)?.[0]??null;for(let s=1;s<a.length;s+=1)for(let r=1;r<=n&&r<=s;r+=1){const i=a.slice(s-r,s).join(Je),h=this.followers.get(i)??new Map;h.set(a[s]??"",(h.get(a[s]??"")??0)+1),this.followers.set(i,h)}}memory;vocabulary;commonest;followers=new Map;after(e){for(let n=Math.min(this.memory,e.length);n>=1;n-=1){const a=e.slice(-n),o=this.followers.get(a.join(Je));if(o)return{context:a,candidates:ta(o)}}return{context:[],candidates:[]}}transitions(){return[...this.followers].filter(([e])=>e.split(Je).length===this.memory).flatMap(([e,n])=>ta(n).map(a=>({context:e.split(Je),...a}))).sort((e,n)=>n.probability-e.probability||n.count-e.count)}}function ta(t){const e=[...t.values()].reduce((n,a)=>n+a,0);return[...t].map(([n,a])=>({word:n,count:a,probability:a/e})).sort((n,a)=>a.count-n.count)}function _r(t,e){let n=e();for(const a of t)if(n-=a.probability,n<=0)return a.word;return t[t.length-1]?.word??null}function na(t){return t.reduce((e,n)=>e===""||/^[.,!?;:]$/.test(n)?e+n:`${e} ${n}`,"")}function uo(t,e){if(e<=0)return t.map((o,s)=>({...o,probability:s===0?1:0}));const n=t.map(o=>o.probability**(1/e)),a=n.reduce((o,s)=>o+s,0);return t.map((o,s)=>({...o,probability:(n[s]??0)/a}))}const kt=40,aa=8,xt=t=>`${Math.round(t*100)}%`;function mo(t,e,n){const{context:a,candidates:o}=t.after(e),s=o.slice(0,aa),r=uo(o,n).slice(0,aa),i=o.reduce((g,{count:k})=>g+k,0),h=e.slice(0,e.length-a.length),c=`<p class="written">${T(na(h))}${h.length&&a.length?" ":""}${a.length?`<mark>${T(na(a))}</mark>`:""}<span class="caret"></span></p>`,l=s.length?`<ol class="offered">${s.map(({word:g,count:k,probability:w},b)=>{const y=r[b]?.probability??0;return`<li><button type="button" data-word="${T(g)}" title="seen ${k} of ${i} times: ${xt(w)} as learnt"><span class="word">${T(g)}</span><span class="chance" style="--p:${y.toFixed(3)}"></span><span class="figure">${xt(y)}</span></button></li>`}).join("")}</ol>`:`<p class="offered">It never saw anything follow “${T(e[e.length-1]??"")}”. This is where it stops.</p>`,d=g=>a.length===t.memory&&g.context.join(" ")===a.join(" "),m=t.transitions(),p=[...m.filter(d),...m.filter(g=>!d(g))].slice(0,kt).map(g=>`<tr${d(g)?' class="now"':""}><td>${T(g.context.join(" "))}</td><td>${T(g.word)}</td><td>${g.count}</td><td>${xt(g.probability)}</td></tr>`).join(""),u=`<table class="learnt"><caption>What it learnt: ${m.length} transitions between ${t.vocabulary.length} words${m.length>kt?`, the first ${kt} shown`:""}</caption><thead><tr><th>after</th><th>comes</th><th>seen</th><th>chance</th></tr></thead><tbody>${p}</tbody></table>`;return`<div class="next-word">${c}<h4>What may come next</h4>${l}${u}</div>`}const ot="The cat is happy. The dog is glad. The cat sleeps. The dog plays. The cat eats. The dog runs. The car is fast. The car goes far.",Gr=350;function Yr(t,{site:e}){const n={small:()=>ot,site:()=>e.pages.map(v=>v.body).join(`

`),own:()=>l.value};let a=new qt(ot,1),o=ht("the"),s=null;const r=f("div"),i=(v,E)=>f("option",{value:v},E),h=f("select",{onchange:()=>w()},i("small","eight short sentences"),i("site","this website"),i("own","your own text")),c=f("select",{onchange:()=>w()},i(1,"one word back"),i(2,"two words back"),i(3,"three words back")),l=f("textarea",{rows:5,hidden:!0,placeholder:"Paste any text here. The longer, the better it pretends.",oninput:()=>w()}),d=f("output",{},"1"),m=f("input",{type:"range",min:0,max:2,step:.1,value:1,oninput:()=>g()}),p=f("input",{type:"text",value:"the",onchange:()=>k()}),u=f("button",{type:"button",onclick:()=>s?$():y()},"write");function g(){d.textContent=m.value,r.innerHTML=mo(a,o,Number(m.value))}function k(){$();const v=ht(p.value).flatMap(E=>Hr(E,a.vocabulary)??[]);o=v.length?v:a.commonest?[a.commonest]:[],g()}function w(){l.hidden=h.value!=="own",a=new qt(n[h.value]?.()??ot,Number(c.value)),k()}function b(){const v=_r(uo(a.after(o).candidates,Number(m.value)),Math.random);return v===null?!1:(o=[...o,v],g(),!0)}function y(){u.textContent="stop",s=setInterval(()=>{b()||$()},Gr)}function $(){s&&clearInterval(s),s=null,u.textContent="write"}r.addEventListener("click",v=>{const E=v.target?.closest("[data-word]")?.getAttribute("data-word");E&&(o=[...o,E],g())});const A=f("div",{class:"dials"},f("label",{},"It has read",h),f("label",{},"It looks",c),f("label",{},"Temperature: ",d,m),f("label",{},"Start from",p)),M=f("div",{class:"row"},f("button",{type:"button",onclick:()=>{b()}},"next word"),u,f("button",{type:"button",onclick:()=>k()},"start over"));return t.replaceChildren(A,l,M,r),g(),$}const Ur=()=>mo(new qt(ot,1),ht("the"),1),Jr={name:"next-word",apps:{"next-word":Yr},stills:{"next-word":Ur}},$t={"string-cache-map":"a WeakMap replacement for string keys, with a bounded cache behind it","async-barrier":"a helper that makes async/await tests say what they wait for","spy-middleware":"a Redux middleware for spying on actions in tests","grunt-frontmatter":"a Grunt task: many files with YAML front matter into one JSON","object-canonical-keys":"always the same array of keys for the same keys, so comparisons stay cheap","async-deferrer":"one function that returns a promise, or resolves it"},oa=160,Tt=28,st=t=>t.toLocaleString("en-US");function St(t,e){const n=Math.max(1,...t.map(e)),a=oa/t.length,o=t.map((s,r)=>{const i=e(s)/n*(Tt-2);return`<rect x="${(r*a+1).toFixed(1)}" y="${(Tt-i).toFixed(1)}" width="${(a-2).toFixed(1)}" height="${i.toFixed(1)}"><title>${s}: ${st(e(s))}</title></rect>`}).join("");return`<svg class="spark" viewBox="0 0 ${oa} ${Tt}" role="img" aria-label="Downloads a year, ${t[0]} to ${t[t.length-1]}">${o}</svg>`}function po(t){const e=Object.keys(t.years).sort(),n=l=>d=>t.years[d]?.[l]??0,a=l=>e.reduce((d,m)=>d+l(m),0),o=Object.keys($t).sort((l,d)=>a(n(d))-a(n(l))),s=[...new Set(e.flatMap(l=>Object.keys(t.years[l]??{})))].filter(l=>!(l in $t)),r=l=>s.reduce((d,m)=>d+n(m)(l),0),i=l=>Object.values(t.years[l]??{}).reduce((d,m)=>d+m,0),h=o.filter(l=>a(n(l))>0).map(l=>`<tr><th scope="row"><a href="https://www.npmjs.com/package/${l}"><code>${l}</code></a><span>${$t[l]}</span></th><td>${St(e,n(l))}</td><td>${st(a(n(l)))}</td></tr>`).join(""),c=s.length?`<tr><th scope="row">the other ${s.length}<span>mostly AngularJS and Redux helpers written for one project each</span></th><td>${St(e,r)}</td><td>${st(a(r))}</td></tr>`:"";return`<figure class="packages"><table class="packages"><thead><tr><th>package</th><th>${e[0]} to ${e[e.length-1]}, a bar a year</th><th>downloads</th></tr></thead><tbody>${h}${c}</tbody><tfoot><tr><th scope="row">all of them</th><td>${St(e,i)}</td><td>${st(a(i))}</td></tr></tfoot></table></figure>`}function Vr(t){if(t.querySelector("figure"))return;const e=en(t,"/data/npm/index.json");fetch("/data/npm/downloads.json").then(n=>n.json()).then(n=>{t.innerHTML=po(n),t.append(e)}).catch(()=>{t.textContent="The download counts did not arrive. The rest of the page does not depend on them."})}const Mt=["string-cache-map","async-barrier","spy-middleware","grunt-frontmatter","object-canonical-keys","gherkin-genie","async-deferrer","egg-hatchery","angular-tags","class-strict","micro-egg-hatchery","node-dio","ducks-middleware","drpx-updateable","generator-drpx","grunt-ngtags","teal-redux-egg","ducks-reducer","drpx-storage-mocks","strict-classes","ngtags","redux-egg","esmoquin","drpx-storage","dio-provider","drpx-components","grunt-angular-tags","drpx-bind-angular","drpx-toggle","drpx-id","drpx-seo","drpx-otherwisehome","drpx-class-route","drpx-transcludeto"],At="downloads.json",Kr={name:"npm",directory:"public/data/npm",firstYear:2015,files:[At],about:{measures:"downloads a year of the npm packages published as drpicox",attribution:"npm, Inc. Download counts of the public registry.",dataset:"https://github.com/npm/registry/blob/main/docs/download-counts.md",packages:Mt},requestsFor(t){return[`https://api.npmjs.org/downloads/point/${t}-01-01:${t}-12-31/${Mt.join(",")}`]},withYear(t,e,n){const a=n[0],o=Object.entries(typeof a=="object"&&a!==null?a:{}).flatMap(([s,r])=>{const i=r?.downloads;return Mt.includes(s)&&typeof i=="number"&&i>0?[[s,i]]:[]});if(o.length===0)throw new Error("the registry did not answer with downloads");return{[At]:{years:{...t[At]?.years,[e]:Object.fromEntries(o)}}}}},Xr=t=>po(JSON.parse(t("/data/npm/downloads.json")))+lt(JSON.parse(t("/data/npm/index.json"))),Zr={name:"packages",apps:{packages:Vr},stills:{packages:Xr},sources:[Kr]},Qr=/^\s*\* (.*)$/,ei=/^#{1,6} /;function ti(t){let e="";const n=[],a={s:0,n:0},o=i=>e+=e===""?i.toLowerCase():i[0].toUpperCase()+i.slice(1).toLowerCase(),s=(i,h)=>{a[h]+=1;const c=/shouldBe/i.test(e)&&!n.some(l=>l.name==="expected");n.push({value:i,name:c?"expected":`${h}${a[h]}`})},r=t.matchAll(/([A-Za-z]+)|("[^"]+")|(\d+)/g);for(const[,i,h,c]of r)i?o(i):h?(s(h,"s"),o("S")):c&&(s(c,"n"),o("N"));return{name:e,args:n}}const ni=["there","is","are","has","have","need","needs"],xe=(t,e)=>new RegExp(`\\b${e}\\b`,"i").test(t);function ai(t,e){if(t.length===0)return[{line:e,message:'does not have any executable instruction by tests. Post lines that run must begin with " * ".'}];if(!t.some(o=>/should/i.test(o.name)))return[{line:t[t.length-1].line,message:'does not have any executable instruction that contains "should": at least one line must test that the outcome is the expected.'}];for(const o of t){const s=ni.find(r=>xe(o.text,r));if(s&&!xe(o.text,"given")&&!xe(o.text,"should"))return[{line:o.line,message:`has an instruction with the word "${s}" but no "should" or "given". Add "given" if it sets up, or "should" if it checks a result.`}]}const n=t.find(o=>xe(o.text,"given")&&xe(o.text,"should"));if(n)return[{line:n.line,message:'has an instruction with the word "given" and "should" at the same time. Keep "given" for a setup, "should" for an assertion.'}];if(t.some(o=>o.name===""))return[{line:t.find(o=>o.name==="").line,message:"has an instruction with no words in it."}];const a=t[t.length-1];return/should/i.test(a.name)?[]:[{line:a.line,message:'the last instruction must contain "should": a post ends by checking what it set out to show.'}]}function oi(t){const[e="",...n]=t.replace(/\.md$/,"").split("_");return`Post_${e.replace(/-/g,"")}_${n.map(a=>a[0].toUpperCase()+a.slice(1)).join("")}_Context`}function fo(t,e){const n=t.replace(/^---[\s\S]*?\n---\n/,p=>p.replace(/[^\n]/g,"")).split(`
`),a=n.find(p=>/^# /.test(p))?.slice(2).trim()??e,o=oi(e),s=[],r=[];n.forEach((p,u)=>{const g=Qr.exec(p);if(g){const{name:k,args:w}=ti(g[1]??""),b=`${k}(${w.map(y=>y.value).join(", ")})`;s.push({line:u+1,text:p.trim(),name:k,args:w,call:b}),r.push(`  await context.${b};	// ${p.trim()}`)}else ei.test(p)&&r.push("",`  // ${p.trim()}`)});const i=Math.max(0,...r.map(p=>p.indexOf("	"))),h=r.map(p=>p.includes("	")?p.replace("	"," ".repeat(i-p.indexOf("	")+1)):p),c=["// !!! IMPORTANT !!!","// This test file is AUTOGENERATED by yarn create-tests","// DO NOT MODIFY manually.","",`test("${e}", async () => {`,`  const context = new ${o}();`,"  await context.beforeTest();",...h,"","  await context.afterTest();","});",""].join(`
`),l=new Set,d=s.filter(p=>!l.has(p.name)&&l.add(p.name)),m=[`export class ${o} {`,"  async beforeTest() {}","",...d.flatMap(p=>[`  async ${p.name}(${p.args.map(u=>u.name).join(", ")}) {`,"    // TODO","  }",""]),"  async afterTest() {}","}",""].join(`
`);return{title:a,className:o,steps:s,test:c,context:m,problems:ai(s,n.length)}}const je=[{file:"2022-07-15_hello_blog.md",label:"Hello Blog — the first post of the course",markdown:`---
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
`}],ut=t=>new Set(t.split(/\s+/).filter(Boolean)),si=ut(`
  var let const function return if else for while do break continue new this
  true false null undefined class extends import export from default async await
  throw try catch finally typeof instanceof in of switch case delete void yield`),ri=ut(`
  auto break case char const continue default do double else enum extern float for goto if
  inline int long register restrict return short signed sizeof static struct switch typedef
  union unsigned void volatile while NULL true false`),ii=ut(`
  abstract assert boolean break byte case catch char class const continue default do double
  else enum extends final finally float for goto if implements import instanceof int interface
  long native new package private protected public return short static strictfp super switch
  synchronized this throw throws transient try var void volatile while true false null`),hi=ut(`
  AND AS CASE CLS CONST DECLARE DEFDBL DIM DO DOUBLE ELSE END EXIT FOR FUNCTION IF IS
  LOCATE LOOP NEXT NOT OR PRINT RANDOMIZE SCREEN SELECT SHARED STATIC STEP SUB THEN TO
  UNTIL WHILE OPTION BASE`);function H(t,e){return`<span class="hl-${t}">${T(e)}</span>`}function on(t,e,n){for(let a=e+1;a<t.length;a+=1)if(t[a]==="\\")a+=1;else if(t[a]===n)return a+1;return t.length}function It(t,e,n){let a="",o=0;for(;o<t.length;){const s=t.slice(o);let r;const i=t.lastIndexOf(`
`,o-1)+1,h=/^\s*$/.test(t.slice(i,o));if(s.startsWith("//")||n&&s[0]==="#"&&h){const c=t.indexOf(`
`,o),l=c<0?t.length:c;a+=H(s[0]==="#"?"a":"c",t.slice(o,l)),o=l}else if(s.startsWith("/*")){const c=t.indexOf("*/",o+2),l=c<0?t.length:c+2;a+=H("c",t.slice(o,l)),o=l}else if(s[0]==='"'||s[0]==="'"||s[0]==="`"){const c=on(t,o,s[0]??"");a+=H("s",t.slice(o,c)),o=c}else if(r=/^[A-Za-z_$][\w$]*/.exec(s)){const c=r[0];a+=e.has(c)?H("k",c):T(c),o+=c.length}else(r=/^\d+(?:\.\d+)?/.exec(s))?(a+=H("n",r[0]),o+=r[0].length):(a+=T(s[0]??""),o+=1)}return a}function li(t){let e="",n=0;for(;n<t.length;){const a=t.slice(n);let o;if(a.startsWith("%")){const s=t.indexOf(`
`,n),r=s<0?t.length:s;e+=H("c",t.slice(n,r)),n=r}else if(a.startsWith("/*")){const s=t.indexOf("*/",n+2),r=s<0?t.length:s+2;e+=H("c",t.slice(n,r)),n=r}else if(a[0]==="'"){const s=on(t,n,"'");e+=H("s",t.slice(n,s)),n=s}else if(a.startsWith("-->")||a.startsWith(":-")){const s=a.startsWith("-->")?"-->":":-";e+=H("k",s),n+=s.length}else(o=/^[A-Z_][\w]*/.exec(a))?(e+=H("a",o[0]),n+=o[0].length):(o=/^[a-z][\w]*/.exec(a))?(e+=T(o[0]),n+=o[0].length):(e+=T(a[0]??""),n+=1)}return e}function ci(t){let e="",n=0;for(;n<t.length;){const a=t.slice(n);let o;if(a[0]==="'"||/^REM\b/i.test(a)){const s=t.indexOf(`
`,n),r=s<0?t.length:s;e+=H("c",t.slice(n,r)),n=r}else if(a[0]==='"'){const s=t.indexOf('"',n+1),r=s<0?t.length:s+1;e+=H("s",t.slice(n,r)),n=r}else(o=/^[A-Za-z_][\w]*[$!#%&]?/.exec(a))?(e+=hi.has(o[0].toUpperCase())?H("k",o[0]):T(o[0]),n+=o[0].length):(o=/^\d+(?:\.\d+)?/.exec(a))?(e+=H("n",o[0]),n+=o[0].length):(e+=T(a[0]??""),n+=1)}return e}function di(t){let e="",n=0;for(;n<t.length;){const a=t.slice(n);if(a.startsWith("<!--")){const s=t.indexOf("-->",n+4),r=s<0?t.length:s+3;e+=H("c",t.slice(n,r)),n=r;continue}const o=/^<(\/?)([A-Za-z][\w-]*)/.exec(a);if(!o){const s=t.indexOf("<",n+1),r=s<0?t.length:s;e+=T(t.slice(n,r)),n=r;continue}for(e+=`&lt;${o[1]}${H("t",o[2]??"")}`,n+=o[0].length;n<t.length&&t[n]!==">";){const s=t.slice(n);let r;if(r=/^\s+/.exec(s))e+=r[0],n+=r[0].length;else if(r=/^[A-Za-z_:][\w:.-]*/.exec(s))e+=H("a",r[0]),n+=r[0].length;else if(s[0]==="="&&(s[1]==='"'||s[1]==="'")){const i=on(t,n+1,s[1]??"");e+=`=${H("s",t.slice(n+1,i))}`,n=i}else e+=T(s[0]??""),n+=1}t[n]===">"&&(e+="&gt;",n+=1)}return e}function zt(t,e){return e==="js"||e==="javascript"?It(t,si,!1):e==="c"?It(t,ri,!0):e==="java"?It(t,ii,!1):e==="prolog"?li(t):e==="html"?di(t):e==="basic"?ci(t):T(t)}function go(t,e){return`<div class="compiled">${t.problems.length?`<div class="refused"><strong>${T(e)}</strong> line ${t.problems[0].line}: ${T(t.problems[0].message)}<br>The tests are not written until the post is fixed.</div>`:""}<h4>${T(e.replace(/\.md$/,""))} → the test, never edited by hand</h4><pre><code>${zt(t.test,"js")}</code></pre><h4>→ the context, written once and filled in by the coder</h4><pre><code>${zt(t.context,"js")}</code></pre></div>`}function ui(t){const e=f("div"),n=f("textarea",{class:"post",spellcheck:!1,rows:28,oninput:()=>r()}),a=f("input",{type:"text",value:je[0].file,oninput:()=>r()}),o=f("select",{onchange:()=>s(Number(o.value))},...je.map((i,h)=>f("option",{value:h},i.label)));function s(i){const h=je[i]??je[0];n.value=h.markdown,a.value=h.file,r()}function r(){e.innerHTML=go(fo(n.value,a.value),a.value)}t.replaceChildren(f("div",{class:"row"},f("label",{},"Post ",o),f("label",{},"File ",a)),f("div",{class:"post-tests"},n,e)),s(0)}const mi=()=>{const t=je[0];return`<div class="post-tests"><pre class="post">${t.markdown.replace(/&/g,"&amp;").replace(/</g,"&lt;")}</pre>${go(fo(t.markdown,t.file),t.file)}</div>`},pi={name:"post-tests",apps:{"post-tests":ui},stills:{"post-tests":mi}},Pe={dryMass:25e3,fuel:5e3,exhaust:.72,acceleration:.3},Ve=149597870700,$e=94607e11,_t=[{name:"the Moon",metres:3844e5,said:"384,400 km"},{name:"Mars",metres:.52*Ve,said:"0.52 au"},{name:"Jupiter",metres:4.2*Ve,said:"4.2 au"},{name:"Saturn",metres:8.5*Ve,said:"8.5 au"},{name:"Pluto",metres:38.5*Ve,said:"38.5 au"},{name:"Proxima Centauri",metres:4.24*$e,said:"4.24 light-years"},{name:"Sirius",metres:8.58*$e,said:"8.58 light-years"},{name:"Epsilon Eridani",metres:10.52*$e,said:"10.52 light-years"},{name:"the centre of the galaxy",metres:26e3*$e,said:"26,000 light-years",towards:{ra:17.76,dec:-29}},{name:"Andromeda",metres:25e5*$e,said:"2.5 million light-years",towards:{ra:.712,dec:41.27}}],fi=[[365.25*86400*1e6,"million years"],[365.25*86400,"years"],[86400,"days"],[3600,"hours"],[60,"minutes"],[1,"seconds"]];function ge(t){const[e,n]=fi.find(([s])=>t>=s)??[1,"seconds"],a=t/e;return`${a>=10?Math.round(a).toLocaleString("en-US"):String(Math.round(a*10)/10)} ${n}`}const V=299792458,gi=9.81;function wo(t,e){const n=e.acceleration*gi,a=e.dryMass+e.fuel,o=e.exhaust*V,s=V/n*Math.acosh(1+n*t/(2*V*V)),r=a*(1-Math.exp(-2*n*s/o)),i=r>e.fuel,h=i?o/n*Math.log(a/(a-e.fuel/2)):s,c=Math.tanh(n*h/V),l=V/n*Math.sinh(n*h/V),d=V*V/n*(Math.cosh(n*h/V)-1),m=Math.max(0,t-2*d),p=i?m/(c*V):0,u=p*Math.sqrt(1-c*c);return{shipTime:2*h+u,homeTime:2*l+p,burnTime:h,coastTime:u,topSpeed:c,fuelBurnt:i?e.fuel:r,coasts:i}}const yo=299792458,wi=9.81,Te=720,Ke=170,G={top:12,right:10,bottom:24,left:40};function bo(t){if(t<.01)return`${Math.round(t*yo/1e3).toLocaleString("en-US")} km/s`;if(t<.99)return`${(t*100).toPrecision(2)}% of c`;const e=Math.min(12,Math.ceil(-Math.log10(1-t)));return`${(Math.floor(t*10**e)/10**(e-2)).toFixed(e-2)}% of c`}const yi=new Intl.NumberFormat("en-US",{notation:"compact",maximumSignificantDigits:3});function sa(t){return t>=1e6?`${yi.format(t)} t`:`${t>=100?Math.round(t).toLocaleString("en-US"):t.toPrecision(2)} t`}function bi(t,e){const n=Te-G.left-G.right,a=Ke-G.top-G.bottom,o=m=>G.left+m/t.shipTime*n,s=m=>G.top+a-m/Math.max(t.topSpeed,1e-12)*a,r=e.acceleration*wi,i=24,h=Array.from({length:i+1},(m,p)=>t.burnTime*p/i).map(m=>[m,Math.tanh(r*m/yo)]),l=[...h.map(([m,p])=>[m,p]),...h.reverse().map(([m,p])=>[t.shipTime-m,p])].map(([m,p])=>`${o(m).toFixed(1)},${s(p).toFixed(1)}`).join(" "),d=t.coasts?`<text x="${((o(t.burnTime)+o(t.shipTime-t.burnTime))/2).toFixed(1)}" y="${(s(t.topSpeed)+14).toFixed(1)}" text-anchor="middle">engine off, ${ge(t.coastTime)}</text>`:"";return`<svg class="trip" viewBox="0 0 ${Te} ${Ke}" role="img" aria-label="Speed against the ship's clock"><line class="grid" x1="${G.left}" x2="${Te-G.right}" y1="${s(0)}" y2="${s(0)}"/><line class="grid" x1="${G.left}" x2="${Te-G.right}" y1="${s(t.topSpeed)}" y2="${s(t.topSpeed)}"/><text x="${G.left}" y="${s(t.topSpeed)-3}">${bo(t.topSpeed)}</text><polyline class="line" points="${l}"/>${d}<text x="${G.left}" y="${Ke-6}">departure</text><text x="${Te-G.right}" y="${Ke-6}" text-anchor="end">arrival, ${ge(t.shipTime)} on board</text></svg>`}function vo(t,e){const n=_t.map(s=>({destination:s,trip:wo(s.metres,t)})),a=n.map(({destination:s,trip:r})=>{const i=[s.name===e?"chosen":"",r.coasts?"coasts":""].filter(Boolean).join(" "),h=r.coasts?`all ${sa(t.fuel)}, then coasts`:sa(r.fuelBurnt);return`<tr${i?` class="${i}"`:""} data-destination="${s.name}"><th scope="row">${s.name}</th><td>${s.said}</td><td>${ge(r.shipTime)}</td><td>${ge(r.homeTime)}</td><td>${bo(r.topSpeed)}</td><td>${h}</td></tr>`}).join(""),o=n.find(({destination:s})=>s.name===e)??n[0];return`<figure class="rocket"><table class="voyages"><thead><tr><th>to</th><th>distance</th><th>on board</th><th>at home</th><th>top speed</th><th>fuel burnt</th></tr></thead><tbody>${a}</tbody></table>`+(o?`<h4>To ${o.destination.name}: speed against the ship's clock</h4>${bi(o.trip,t)}`:"")+"</figure>"}const Xe=[{name:"Proxima Centauri",ra:14.495,dec:-62.68,lightYears:4.24},{name:"Alpha Centauri",ra:14.66,dec:-60.83,lightYears:4.37},{name:"Barnard's Star",ra:17.963,dec:4.69,lightYears:5.96},{name:"Wolf 359",ra:10.941,dec:7.01,lightYears:7.86},{name:"Lalande 21185",ra:11.056,dec:35.97,lightYears:8.31},{name:"Sirius",ra:6.752,dec:-16.72,lightYears:8.58},{name:"Luyten 726-8",ra:1.65,dec:-17.95,lightYears:8.73},{name:"Ross 154",ra:18.83,dec:-23.84,lightYears:9.69},{name:"Ross 248",ra:23.699,dec:44.18,lightYears:10.3},{name:"Epsilon Eridani",ra:3.549,dec:-9.46,lightYears:10.52},{name:"Lacaille 9352",ra:23.098,dec:-35.85,lightYears:10.72},{name:"Ross 128",ra:11.796,dec:.8,lightYears:11.01},{name:"EZ Aquarii",ra:22.643,dec:-15.3,lightYears:11.1},{name:"61 Cygni",ra:21.115,dec:38.75,lightYears:11.4},{name:"Procyon",ra:7.655,dec:5.22,lightYears:11.46},{name:"Struve 2398",ra:18.713,dec:59.63,lightYears:11.5},{name:"Groombridge 34",ra:.306,dec:44.02,lightYears:11.6},{name:"Epsilon Indi",ra:22.056,dec:-56.78,lightYears:11.87},{name:"Tau Ceti",ra:1.734,dec:-15.94,lightYears:11.91}];function Ze(t,e){const n=e.radius/e.reach;return t.map(({name:a,ra:o,dec:s,lightYears:r})=>{const i=o/24*2*Math.PI,h=s/180*Math.PI,c=r*Math.cos(h)*Math.cos(i),l=r*Math.cos(h)*Math.sin(i),d=r*Math.sin(h),m=l*Math.cos(e.yaw)-c*Math.sin(e.yaw),p=c*Math.cos(e.yaw)+l*Math.sin(e.yaw),u=d*Math.cos(e.pitch)-p*Math.sin(e.pitch),g=p*Math.cos(e.pitch)+d*Math.sin(e.pitch);return{name:a,x:m*n,y:-u*n,depth:g}})}const ne=299792458,vi=9.81;function ki(t,e,n){const a=e.acceleration*vi,o=d=>({distance:ne*ne/a*(Math.cosh(a*d/ne)-1),homeTime:ne/a*Math.sinh(a*d/ne),speed:Math.tanh(a*d/ne)}),s=o(t.burnTime),r=t.homeTime-2*s.homeTime,i=r*t.topSpeed*ne,h=2*s.distance+i,c=Math.max(0,Math.min(n,t.shipTime));if(c<=t.burnTime){const d=o(c);return{along:d.distance/h,homeTime:d.homeTime,speed:d.speed}}if(c<=t.burnTime+t.coastTime){const d=(c-t.burnTime)/t.coastTime;return{along:(s.distance+d*i)/h,homeTime:s.homeTime+d*r,speed:t.topSpeed}}const l=o(t.shipTime-c);return{along:1-l.distance/h,homeTime:t.homeTime-l.homeTime,speed:l.speed}}const Qe=12.5,ra=9,ia=1.5,xi=new Set(["Alpha Centauri"]),q={ground:"#06080f",ring:"rgba(127,166,234,0.22)",stem:"rgba(127,166,234,0.18)",star:"#dfe7f5",dim:"#7d8aa3",sun:"#ffd98a",way:"#ff9d6e",ship:"#ffffff"};function $i(t,e,n){const a=t.getContext("2d");if(!a)return()=>{};const o=a,s=window.matchMedia("(prefers-reduced-motion: reduce)").matches,r=new Set(_t.map(({name:b})=>b));let i={yaw:.6,pitch:.45,radius:1,reach:Qe},h=0,c=performance.now(),l=null,d=[];const m=()=>({x:t.clientWidth/2,y:t.clientHeight/2});function p(b){const y=t.clientWidth,$=t.clientHeight,A=window.devicePixelRatio||1;t.width!==Math.round(y*A)&&(t.width=Math.round(y*A),t.height=Math.round($*A)),o.setTransform(A,0,0,A,0,0),o.fillStyle=q.ground,o.fillRect(0,0,y,$),!s&&!l&&(i={...i,yaw:i.yaw+.0015}),i={...i,radius:Math.min(y,$)*.47};const M=m(),v=I=>({x:M.x+I.x,y:M.y+I.y});o.font="11px ui-monospace, Menlo, monospace";for(const I of[5,10]){const L=Ze(Array.from({length:73},(O,R)=>({name:"",ra:R/72*24,dec:0,lightYears:I})),i);o.beginPath(),L.forEach((O,R)=>R?o.lineTo(v(O).x,v(O).y):o.moveTo(v(O).x,v(O).y)),o.strokeStyle=q.ring,o.stroke();const D=v(L[0]??{x:0,y:0});o.fillStyle=q.dim,o.fillText(`${I} ly`,D.x+4,D.y-3)}const{ship:E,chosen:j}=e(),N=_t.find(({name:I})=>I===j),C=Xe.find(({name:I})=>I===j),S=N?wo(N.metres,E):null;d=Ze(Xe,i);const P=Ze(Xe.map(I=>({...I,lightYears:I.lightYears*Math.cos(I.dec/180*Math.PI),dec:0})),i),x=d.map((I,L)=>L).sort((I,L)=>(d[I]?.depth??0)-(d[L]?.depth??0));for(const I of x){const L=v(d[I]??{x:0,y:0}),D=v(P[I]??{x:0,y:0}),O=d[I]?.name??"",R=((d[I]?.depth??0)+Qe)/(2*Qe);o.strokeStyle=q.stem,o.beginPath(),o.moveTo(L.x,L.y),o.lineTo(D.x,D.y),o.stroke(),o.fillStyle=O===j?q.way:q.star,o.globalAlpha=.45+.55*R,o.beginPath(),o.arc(L.x,L.y,1.6+1.8*R,0,2*Math.PI),o.fill(),r.has(O)&&(o.strokeStyle=O===j?q.way:q.dim,o.beginPath(),o.arc(L.x,L.y,7,0,2*Math.PI),o.stroke()),o.fillStyle=O===j?q.way:q.dim,xi.has(O)||o.fillText(O,L.x+10,L.y+4),o.globalAlpha=1}if(o.fillStyle=q.sun,o.beginPath(),o.arc(M.x,M.y,4,0,2*Math.PI),o.fill(),o.fillText("the Sun",M.x+8,M.y-6),S&&N){const I=N.towards?Ze([{name:"",...N.towards,lightYears:Qe*1.15}],i)[0]:null,L=C?d[Xe.indexOf(C)]:I,D=(b-c)/1e3%(ra+2*ia),O=s?.5:Math.min(1,Math.max(0,(D-ia)/ra)),R=ki(S,E,O*S.shipTime);if(L){const ee=v(L);o.strokeStyle=q.way,o.setLineDash(C?[]:[4,4]),o.beginPath(),o.moveTo(M.x,M.y),o.lineTo(ee.x,ee.y),o.stroke(),o.setLineDash([]);const ye={x:M.x+(ee.x-M.x)*R.along,y:M.y+(ee.y-M.y)*R.along};o.fillStyle=q.ship,o.beginPath(),o.arc(ye.x,ye.y,3,0,2*Math.PI),o.fill(),C||o.fillText(`to ${N.name}, ${N.said}: not to scale`,12,$-34)}else o.fillStyle=q.dim,o.fillText(`${N.name} is inside the dot: the planets are a thousandth of a light-year away`,12,$-34);o.fillStyle=q.star,o.font="13px ui-monospace, Menlo, monospace",o.fillText(`on board ${ge(O*S.shipTime)}`,12,22),o.fillText(`at home  ${ge(R.homeTime)}`,12,40),o.fillStyle=q.dim,o.fillText(`${(R.speed*100).toFixed(R.speed>.99?4:1)}% of c`,12,58),o.fillText("drag to turn",y-96,$-14)}h=s&&!l?0:requestAnimationFrame(p)}const u=b=>{const y=t.getBoundingClientRect();return{x:b.clientX-y.left,y:b.clientY-y.top}},g=b=>{l=u(b),t.setPointerCapture(b.pointerId),h||(h=requestAnimationFrame(p))},k=b=>{if(!l)return;const y=u(b);i={...i,yaw:i.yaw+(y.x-l.x)*.01,pitch:Math.max(-1.4,Math.min(1.4,i.pitch+(y.y-l.y)*.01))},l=y},w=b=>{const y=u(b),$=m(),A=d.find(M=>r.has(M.name)&&Math.hypot($.x+M.x-y.x,$.y+M.y-y.y)<12);l=null,A&&(c=performance.now(),n(A.name))};return t.addEventListener("pointerdown",g),t.addEventListener("pointermove",k),t.addEventListener("pointerup",w),h=requestAnimationFrame(p),()=>{cancelAnimationFrame(h),t.removeEventListener("pointerdown",g),t.removeEventListener("pointermove",k),t.removeEventListener("pointerup",w)}}const et=t=>t,Ti=new Intl.NumberFormat("en-US",{notation:"compact",maximumSignificantDigits:2}),Si=[{key:"acceleration",label:"Acceleration",min:.05,max:3,step:.05,toSlider:et,fromSlider:et,show:t=>`${t.toFixed(2)} g`},{key:"fuel",label:"Fuel",min:-1,max:13,step:.05,toSlider:t=>Math.log10(t/Pe.dryMass),fromSlider:t=>Pe.dryMass*10**t,show:t=>`${Ti.format(t/Pe.dryMass)} × the ship`},{key:"exhaust",label:"Exhaust speed",min:.01,max:1,step:.01,toSlider:et,fromSlider:et,show:t=>`${Math.round(t*100)}% of c`}];function Mi(t){let e=Pe,n="Proxima Centauri";const a=f("div"),o=()=>{a.innerHTML=vo(e,n)},s=f("div",{class:"dials"},...Si.map(i=>{const h=f("output",{},i.show(e[i.key])),c=f("input",{type:"range",min:i.min,max:i.max,step:i.step,value:i.toSlider(e[i.key]),oninput:()=>{e={...e,[i.key]:i.fromSlider(Number(c.value))},h.textContent=i.show(e[i.key]),o()}});return f("label",{},`${i.label}: `,h,c)}));a.addEventListener("click",i=>{const h=i.target?.closest("[data-destination]")?.getAttribute("data-destination");h&&(n=h,o())});const r=f("canvas",{class:"starmap","aria-label":"The stars within twelve light-years of the Sun, turning, with the ship flying the chosen trip"});return t.replaceChildren(r,s,a),o(),$i(r,()=>({ship:e,chosen:n}),i=>{n=i,o()})}const Ai=()=>vo(Pe,"Proxima Centauri"),Ii={name:"rocket",apps:{rocket:Mi},stills:{rocket:Ai}};class Ei{listeners=new Set;send(e){for(const n of[...this.listeners])n(e)}on(e){return this.listeners.add(e),()=>{this.listeners.delete(e)}}}const Gt=new Ei,Ci=900,ji=480,tt={x:1600,y:1e3};function nt(t,e){return(t%e+e)%e}class Oi{x=0;y=0;written="";driving=!1;follow({byRadians:e,tiltedBy:n,seconds:a}){const o=document.documentElement;if(o.dataset.sky!=="stars")return;this.driving||this.takeOver(o);const s=Ci/(Math.PI*2),r=(a/ji*Math.PI*2+e)*s;this.x=nt(this.x+r,tt.x),this.y=nt(this.y-n*s,tt.y);const i=`${(Math.round(this.x*2)/2).toFixed(1)}px ${(Math.round(this.y*2)/2).toFixed(1)}px`;if(i===this.written)return;this.written=i;const[h,c]=i.split(" ");o.style.setProperty("--sky-x",h??"0px"),o.style.setProperty("--sky-y",c??"0px")}release(){const e=document.documentElement;e.classList.remove("sky-driven"),e.style.removeProperty("--sky-x"),e.style.removeProperty("--sky-y"),this.x=0,this.y=0,this.written="",this.driving=!1}takeOver(e){const n=getComputedStyle(document.body,"::before").transform;if(n&&n!=="none")try{const a=new DOMMatrixReadOnly(n);this.x=nt(a.m41,tt.x),this.y=nt(a.m42,tt.y)}catch{}e.classList.add("sky-driven"),this.driving=!0}}function Pi(t){return Gt.on(e=>t.follow(e))}const ha=new Oi,Ni={name:"sky",install:()=>Pi(ha),arrive:()=>ha.release()},Et=20;function Li(t){const{baseTime:e,shortcutFactor:n,interestRate:a,timeHorizon:o}=t,s=[];let r=null;const i=e;let h=e*(1-n),c=0,l=0,d=0,m=0,p=0,u=0;for(let g=0;g<o*Et;){for(;p<=g;)c+=1,d+=1,p+=i;for(;u<=g;)l+=1,m+=1,u+=h,h*=1+a;if(g+=1,g%Et===0){const k=g/Et;s.push({month:k,cleanCumulative:c,debtCumulative:l,cleanMonthly:d,debtMonthly:m,debtFeatureCost:h}),d=0,m=0,r===null&&c>l&&(r=k)}}return{months:s,breakEvenMonth:r}}const Di=[{key:"baseTime",label:"Base time",min:1,max:30,step:1,show:t=>`${t} days`},{key:"shortcutFactor",label:"Shortcuts",min:0,max:.9,step:.05,show:t=>`${Math.round(t*100)}%`},{key:"interestRate",label:"Interest",min:0,max:1,step:.01,show:t=>`${Math.round(t*100)}%`},{key:"timeHorizon",label:"Timeline",min:6,max:60,step:1,show:t=>`${t} months`}];function Ri(t){const e={baseTime:20,shortcutFactor:.25,interestRate:.1,timeHorizon:24},n=f("div",{class:"figures"}),a=f("div",{class:"chart"}),o=f("div",{class:"chart"}),s=f("p"),r=f("div",{class:"dials"},...Di.map(h=>{const c=f("output",{},h.show(e[h.key])),l=f("input",{type:"range",min:h.min,max:h.max,step:h.step,value:e[h.key],oninput:()=>{e[h.key]=Number(l.value),c.textContent=h.show(e[h.key]),i()}});return f("label",{},`${h.label}: `,c,l)}));function i(){const{months:h,breakEvenMonth:c}=Li(e),l=h[h.length-1],d=l?.cleanCumulative??0,m=l?.debtCumulative??0,p=d>0?(d-m)/d*100:0,u=Math.abs(p)<.1?"Even":p>0?"Loss":"Gain",g=Math.abs(p)<.1?"≈0%":`${Math.abs(p).toFixed(1)}%`;n.replaceChildren(f("div",{class:"clean"},f("strong",{},String(d)),"clean features"),f("div",{class:"debt"},f("strong",{},String(m)),"debt features"),f("div",{},f("strong",{},c?`month ${c}`:"never"),"break-even"),f("div",{},f("strong",{},g),`${u.toLowerCase()} on the shortcut road`)),a.innerHTML=Ns([{name:"Clean",className:"clean",values:h.map(k=>k.cleanCumulative)},{name:"Debt-driven",className:"debt",values:h.map(k=>k.debtCumulative)}],{x:"Months",y:"Features"}),a.prepend(f("h4",{},"Cumulative features")),o.innerHTML=Va([{name:"Clean",className:"clean",values:h.slice(1).map(k=>k.cleanMonthly)},{name:"Debt-driven",className:"debt",values:h.slice(1).map(k=>k.debtMonthly)}],{x:"Months",y:"Features a month"}),o.prepend(f("h4",{},"Monthly delivery rate")),s.textContent=e.interestRate===0?"With no interest there is no compound slowdown, and the shortcut simply wins. That is the one case that does not happen to real code.":c?`${Math.round(e.shortcutFactor*100)}% saved at first, ${Math.round(e.interestRate*100)}% interest on every feature: clean development overtakes at month ${c}, and by month ${e.timeHorizon} the shortcut road has delivered ${g} less.`:`${Math.round(e.shortcutFactor*100)}% saved at first, ${Math.round(e.interestRate*100)}% interest on every feature: in ${e.timeHorizon} months the clean road has not yet caught up. Give it longer, or raise the interest.`}t.append(r,n,f("div",{class:"charts"},a,o),s),i()}const Fi={name:"technical-debt",apps:{"technical-debt":Ri}},Bi="theme";function ko(){const t=document.documentElement,e=t.dataset.pageTheme;let n=null;try{n=localStorage.getItem(Bi)}catch{n=null}const a=e??(n==="light"||n==="dark"?n:null);a?t.dataset.theme=a:delete t.dataset.theme}const Yt="theme";function Wi(){return window.matchMedia("(prefers-color-scheme: dark)").matches}function Hi(){let t=null;try{t=localStorage.getItem(Yt)}catch{t=document.documentElement.dataset.theme??null}return t==="light"||t==="dark"?t:Wi()?"dark":"light"}class qi{apply(e){const n=e==="toggle"?Hi()==="dark"?"light":"dark":e;try{n==="system"?localStorage.removeItem(Yt):localStorage.setItem(Yt,n)}catch{}return ko(),n}}function zi(t){const e=document.querySelector(".theme-toggle");return e?(e.classList.add("ready"),e.removeAttribute("aria-hidden"),e.removeAttribute("tabindex"),e.addEventListener("click",t),()=>e.removeEventListener("click",t)):()=>{}}const Ut=["light","dark","system"];function _i(t){return Ut.includes(t)}const Gi={light:"☀︎",dark:"☾︎",system:"◐︎"};function la(t){const e=n=>`${Gi[n]} ${n}`;return{text:`theme   ${Ut.map(n=>n===t?`[${e(n)}]`:e(n)).join("   ")}`,html:`<pre class="choices">theme   ${Ut.map(n=>n===t?`<strong aria-current="true">${e(n)}</strong>`:`<a href="#" data-run="theme ${n}" title="theme ${n}">${e(n)}</a>`).join("   ")}</pre>`}}function Yi(t){return{name:"theme",usage:"theme [light|dark|system|auto]",description:"switch the colours, or toggle them",run({site:e,cwd:n},[a]){const o=e.at(n)?.fields.theme;if(o)return{text:`theme: this page keeps its own, ${o}. It works everywhere else.`,error:!0};if(a===void 0)return la(t.apply("toggle"));const s=a==="auto"?"system":a;return _i(s)?la(t.apply(s)):{text:`theme: ${a}: choose light, dark or system`,error:!0}}}}const Ui={name:"theme",commands:[Yi(new qi)],install:t=>zi(()=>t.run("theme")),arrive:()=>ko()},Ji={small:"Intel Atom 330, 2 cores, 8 W · NVIDIA 9400M, 16 cores, 10 W",large:"Intel i7 950, 4 cores, 130 W · NVIDIA GT 430, 96 cores, 49 W"},ca=[{machine:"small",algorithm:"pairs",vertices:8,graphs:150,serial:42.43,openmp:14.34,cuda:2.572},{machine:"small",algorithm:"pairs",vertices:16,graphs:150,serial:738.92,openmp:247.95,cuda:33.06},{machine:"small",algorithm:"pairs",vertices:24,graphs:150,serial:4387.13,openmp:1208.97,cuda:109.093},{machine:"large",algorithm:"pairs",vertices:8,graphs:150,serial:7.483,openmp:1.511,cuda:.653},{machine:"large",algorithm:"pairs",vertices:16,graphs:150,serial:135.505,openmp:25.061,cuda:5.24},{machine:"large",algorithm:"pairs",vertices:24,graphs:150,serial:515.757,openmp:126.228,cuda:18.99},{machine:"small",algorithm:"common-labelling",vertices:8,graphs:50,serial:843.21,openmp:214.51,cuda:33.404},{machine:"small",algorithm:"common-labelling",vertices:16,graphs:50,serial:17061.4,openmp:4284.01,cuda:550.153},{machine:"small",algorithm:"common-labelling",vertices:24,graphs:50,serial:71670.13,openmp:20274.32,cuda:2332.076}],Vi={pairs:t=>`Matching every pair of ${t} graphs`,"common-labelling":t=>`Finding one labelling common to ${t} graphs`};function Ct(t){if(t<10)return`${t.toFixed(1)} s`;if(t<60)return`${Math.round(t)} s`;const e=Math.floor(t/60);return e<60?e<10?`${e} min ${Math.round(t-e*60)} s`:`${Math.round(t/60)} min`:`${Math.floor(e/60)} h ${e%60} min`}const Ki=t=>`×${t>=10?Math.round(t):t.toFixed(1)}`;function da(t){const e=Math.max(...t.map(o=>o.serial/o.cuda)),n=(o,s)=>`<span class="bar ${s}" style="--p:${(o/e).toFixed(3)}"></span><span class="factor">${Ki(o)}</span>`;return`<figure class="runs"><table class="runs"><thead><tr><th>each graph has</th><th>one thread</th><th>OpenMP, every core</th><th>CUDA, the graphics card</th></tr></thead>${[...new Set(t.map(o=>`${o.algorithm}/${o.machine}`))].map(o=>{const s=t.filter(c=>`${c.algorithm}/${c.machine}`===o),{algorithm:r,machine:i}=s[0],h=s.map(c=>`<tr><th scope="row">${c.vertices} vertices</th><td>${Ct(c.serial)}</td><td>${Ct(c.openmp)}<div class="speedup">${n(c.serial/c.openmp,"openmp")}</div></td><td>${Ct(c.cuda)}<div class="speedup">${n(c.serial/c.cuda,"cuda")}</div></td></tr>`).join("");return`<tbody><tr class="group"><th colspan="4">${Vi[r](s[0]?.graphs??0)}<span>${Ji[i]}</span></th></tr>${h}</tbody>`}).join("")}</table><figcaption>Measured in 2011, on graphs of the GREC dataset. Each bar is how many times faster than one thread of the same machine, and all the bars are on one scale.</figcaption></figure>`}const Xi={name:"thesis-results",stills:{"graph-matching-runs":()=>da(ca)},apps:{"graph-matching-runs":t=>{t.firstChild||(t.innerHTML=da(ca))}}},Jt={variable:"tn",atLeast:!0,threshold:20,months:[0,1,2,3,4,5,6,7,8,9,10,11]};function Zi(t,e){const n=t.map(({value:u})=>u),a=Math.floor(Math.min(...n,...(e.spans??[]).map(({value:u})=>u))),o=Math.ceil(Math.max(...n,a+1)),s=_a(t.map(({year:u})=>u),a,o),{x:r,y:i,slot:h}=s,c=u=>r(u)+h/2,l=[];for(const u of t){const g=l[l.length-1];g&&g[g.length-1]?.year===u.year-1?g.push(u):l.push([u])}const d=l.map(u=>`<polyline class="line" points="${u.map(({year:g,value:k})=>`${F(c(g))},${F(i(k))}`).join(" ")}"/>`).join(""),m=t.map(({year:u,value:g,title:k,partial:w})=>`<circle class="dot${w?" partial":""}" cx="${F(c(u))}" cy="${F(i(g))}" r="3.5"><title>${k}</title></circle>`).join(""),p=s.levels(e.spans??[]);return s.wrap(e.label,`${d}${m}${p}`)}function Qi(t,{threshold:e,atLeast:n},a){if(!t)return 0;const[o=0,...s]=t;return s.reduce((r,i,h)=>o+h*a>=e-1e-9===n?r+i:r,0)}const we={tn:{code:1002,unit:"°C",name:"daily minimum",summary:"mean",bin:.5,range:[-30,35]},tx:{code:1001,unit:"°C",name:"daily maximum",summary:"mean",bin:.5,range:[-25,50]},pp:{code:1300,unit:"mm",name:"daily rain",summary:"sum",bin:.5,range:[0,250]},pi:{code:1303,unit:"mm/h",name:"most rain in one hour",summary:"max",bin:.5,range:[0,100]}},eh=.95,th=(t,e)=>new Date(Date.UTC(t,e+1,0)).getUTCDate(),te=t=>t.reduce((e,n)=>e+n,0);function nh(t,e){return t.length===0?null:e==="sum"?te(t.map(({figure:n})=>n)):e==="max"?Math.max(...t.map(({figure:n})=>n)):te(t.map(({figure:n,weight:a})=>n*a))/te(t.map(({weight:n})=>n))}function ah(t,e){const n=we[e.variable];return Object.entries(t.years).flatMap(([a,o])=>{const s=o[e.variable];if(!s)return[];const r=Number(a),i=s.months.map(u=>({days:Qi(u,e,n.bin),measured:te(u?.slice(1)??[])})),h=u=>e.months.includes(u),c=te(i.filter((u,g)=>h(g)).map(u=>u.measured)),l=te(e.months.map(u=>th(r,u))),d=te(i.filter((u,g)=>h(g)).map(u=>u.days)),m=s.summaries.flatMap((u,g)=>h(g)&&u!==null?[{figure:u,weight:i[g]?.measured??0}]:[]),p=nh(m,n.summary);return[{year:r,days:d,elsewhere:te(i.map(u=>u.days))-d,measured:c,expected:l,whole:c/l>=eh,summary:p,months:i}]}).sort((a,o)=>a.year-o.year)}const ua=["January","February","March","April","May","June","July","August","September","October","November","December"];function ma(t){const{name:e,unit:n}=we[t.variable],a=t.variable==="pi"?"":"a ",o=t.atLeast?`of ${t.threshold} ${n} or more`:`below ${t.threshold} ${n}`,s=ua[t.months[0]??0],r=ua[t.months[t.months.length-1]??11],i=t.months.length===12?"whole year":`${s} to ${r}`;return`days with ${a}${e} ${o}, ${i}`}const xo=["January","February","March","April","May","June","July","August","September","October","November","December"],oh=.55;function sh(t,e,{days:n,measured:a}){const o=`${xo[e]} ${t}`;if(a===0)return`<td class="none" title="${o}: not measured"></td>`;const s=Math.round(n/a*1e3)/1e3;return`<td${s>=oh?' class="deep"':""} style="--v:${s}" title="${o}: ${n} of ${a} days">${n||""}</td>`}function rh(t,e){const n=`<tr><th></th>${xo.map(o=>`<th scope="col">${o.slice(0,3)}</th>`).join("")}</tr>`,a=[...t].reverse().map(({year:o,months:s})=>`<tr><th scope="row">${o}</th>${s.map((r,i)=>sh(o,i,r)).join("")}</tr>`);return`<table class="heat calendar${e?" warm":""}"><thead>${n}</thead><tbody>${a.join("")}</tbody></table>`}const pa=t=>t.reduce((e,n)=>e+n,0)/t.length;function fa(t){const e=t.flatMap(({summary:n})=>n===null?[]:[n]);return{from:t[0]?.year??0,to:t[t.length-1]?.year??0,years:t.length,days:pa(t.map(({days:n})=>n)),summary:e.length?pa(e):null}}function ih(t){const e=t.filter(a=>a.whole);if(e.length<4)return null;const n=Math.floor(e.length/2);return[fa(e.slice(0,n)),fa(e.slice(n))]}const hh=["January","February","March","April","May","June","July","August","September","October","November","December"],lh={mean:"The mean",sum:"The total",max:"The highest"},Oe=t=>String(Math.round(t*10)/10),ch=t=>`${t>0?"+":t<0?"−":""}${Oe(Math.abs(t))}`,dh=t=>`${Number(t.slice(8,10))} ${hh[Number(t.slice(5,7))-1]} ${t.slice(0,4)}`;function uh(t,e){const{unit:n,name:a}=we[e.variable],o=Object.values(t.years).flatMap(i=>i[e.variable]?[i[e.variable].record]:[]),[s,r]=e.atLeast?o.map(([i,h])=>[i,h]).reduce((i,h)=>h[0]>i[0]?h:i):o.map(([,,i,h])=>[i,h]).reduce((i,h)=>h[0]<i[0]?h:i);return`<p class="record">The ${e.atLeast?"highest":"lowest"} ${a} on record here: ${s} ${n} on ${dh(r)}, whatever months are chosen.</p>`}function $o(t,e){const n=we[e.variable],a=`<figcaption><strong>${t.name}</strong> · ${t.altitude} m, ${t.setting} · ${ma(e)}</figcaption>`,o=ah(t,e);if(o.length===0)return`<figure class="weather">${a}<p>This station has no ${n.name} on record.</p></figure>`;const s=ih(o),r=({from:u,to:g})=>`${u}–${g}`,i=s?'<div class="figures">'+s.map(u=>`<div><strong>${Oe(u.days)}</strong>days a year, ${r(u)}</div>`).join("")+`<div><strong>${ch(s[1].days-s[0].days)}</strong>days a year, from one half to the other</div></div>`:"",h=o.map(({year:u,days:g,elsewhere:k,measured:w,expected:b,whole:y})=>{const $=k>0?`, and ${k} more outside the months chosen`:"",A=y?"":`, with only ${w} of ${b} days measured`;return{year:u,value:g,partial:!y,title:`${u}: ${g} days${A}${$}`}}),c=(s??[]).map(u=>({from:u.from,to:u.to,value:u.days,label:`${Oe(u.days)} a year`})),l=o.flatMap(({year:u,summary:g,whole:k})=>g===null||!k?[]:[{year:u,value:g,title:`${u}: ${Oe(g)} ${n.unit}`}]),d=(s??[]).flatMap(u=>u.summary===null?[]:[{from:u.from,to:u.to,value:u.summary,label:`${Oe(u.summary)} ${n.unit}`}]),m=`${lh[n.summary]} ${n.name} of each year, ${n.unit}`,p=(n.summary==="mean"?Zi:Bt)(l,{label:m,spans:d});return`<figure class="weather">${a}${i}<h4>Days a year</h4>${Bt(h,{label:`Days a year: ${ma(e)}`,spans:c})}<h4>When in the year they fell</h4>${rh(o,e.atLeast&&n.unit==="°C")}<h4>${m}, in the months chosen</h4>${p}`+uh(t,e)+"</figure>"}const ga=[{id:"tropical-nights",name:"tropical nights",variable:"tn",atLeast:!0,threshold:20},{id:"torrid-nights",name:"torrid nights",variable:"tn",atLeast:!0,threshold:25},{id:"hot-days",name:"hot days",variable:"tx",atLeast:!0,threshold:30},{id:"torrid-days",name:"torrid days",variable:"tx",atLeast:!0,threshold:35},{id:"frost-days",name:"frost days",variable:"tn",atLeast:!1,threshold:0},{id:"rainy-days",name:"rainy days",variable:"pp",atLeast:!0,threshold:1},{id:"heavy-rain",name:"days of heavy rain",variable:"pp",atLeast:!0,threshold:20},{id:"downpours",name:"days with a downpour",variable:"pi",atLeast:!0,threshold:10}],ce=[{code:"WU",name:"Badalona - Museu",municipality:"Badalona",altitude:42,setting:"urban, by the sea"},{code:"X4",name:"Barcelona - el Raval",municipality:"Barcelona",altitude:33,setting:"dense city, on a roof"},{code:"X8",name:"Barcelona - Zona Universitària",municipality:"Barcelona",altitude:82,setting:"city edge"},{code:"D5",name:"Barcelona - Observatori Fabra",municipality:"Barcelona",altitude:410,setting:"wooded hill above the city"},{code:"UP",name:"Cabrils",municipality:"Cabrils",altitude:81,setting:"coastal slope, half rural"},{code:"XF",name:"Sabadell - Parc Agrari",municipality:"Sabadell",altitude:259,setting:"farmland beside a city"},{code:"XJ",name:"Girona",municipality:"Girona",altitude:72,setting:"market gardens by the city"},{code:"XE",name:"Tarragona - Complex Educatiu",municipality:"Tarragona",altitude:6,setting:"coast"},{code:"VK",name:"Raimat",municipality:"Lleida",altitude:286,setting:"inland plain, vineyards"}],wa=[["whole year",[0,1,2,3,4,5,6,7,8,9,10,11]],["June to August",[5,6,7]],["May to October",[4,5,6,7,8,9]],["December to February",[0,1,11]]],mh={tn:[-10,30],tx:[0,45],pp:[.5,100],pi:[.5,60]};function ph(t){const e=new Map,n=en(t,"/data/weather/index.json"),a=f("div");a.append(...t.querySelectorAll("figure"));let o=null,s=Jt,r=!1;const i=(w,b)=>f("option",{value:w},b),h=f("select",{onchange:()=>{g(h.value)}},...ce.map(({code:w,name:b})=>i(w,b))),c=f("select",{onchange:()=>{const w=ga.find(({id:b})=>b===c.value);w&&u({variable:w.variable,atLeast:w.atLeast,threshold:w.threshold})}},...ga.map(({id:w,name:b})=>i(w,b))),l=f("select",{onchange:()=>u({months:wa[Number(l.value)]?.[1]??Jt.months})},...wa.map(([w],b)=>i(b,w))),d=f("output"),m=f("input",{type:"range",step:.5,oninput:()=>u({threshold:Number(m.value)})});function p(){const[w,b]=mh[s.variable];m.min=String(w),m.max=String(b),m.value=String(s.threshold),d.textContent=`${s.atLeast?"":"below "}${s.threshold} ${we[s.variable].unit}${s.atLeast?" or more":""}`,o&&(a.innerHTML=$o(o,s))}function u(w){s={...s,...w},p()}async function g(w){const b=e.get(w)??fetch(`/data/weather/${w}.json`).then(y=>y.json());e.set(w,b);try{const y=await b;if(r||h.value!==w)return;o=y,p()}catch{e.delete(w),a.replaceChildren(f("p",{},"The measurements for this station did not arrive. The rest of the page does not depend on them."))}}const k=f("div",{class:"dials"},f("label",{},"Station",h),f("label",{},"Counting",c),f("label",{},"Threshold: ",d,m),f("label",{},"Months",l));return t.replaceChildren(k,a,n),g(h.value),()=>{r=!0}}function fh(t,e,[n,a]){if(t.length===0)return null;const o=Math.round((a-n)/e),s=new Map;for(const c of t){const l=Math.min(o-1,Math.max(0,Math.floor((c-n)/e+1e-9)));s.set(l,(s.get(l)??0)+1)}const r=Math.min(...s.keys()),i=Math.max(...s.keys());return[Math.round((n+r*e)*1e3)/1e3,...Array.from({length:i-r+1},(c,l)=>s.get(r+l)??0)]}const ya="7bvh-jvq2",To=5e4,ba=Object.entries(we),gh="No representatiu",wh=["Representatiu",""],yh=(t,e)=>Math.round(t*10**e)/10**e;function bh(t,e){if(t.length===0)return null;if(e==="max")return Math.max(...t);const n=t.reduce((a,o)=>a+o,0);return yh(e==="sum"?n:n/t.length,2)}function vh(t,e){const n=Array.from({length:12},(s,r)=>t.filter(({date:i})=>Number(i.slice(5,7))===r+1).map(({value:i})=>i)),a=t.reduce((s,r)=>r.value>s.value?r:s),o=t.reduce((s,r)=>r.value<s.value?r:s);return{months:n.map(s=>fh(s,e.bin,e.range)),summaries:n.map(s=>bh(s,e.summary)),record:[a.value,a.date,o.value,o.date]}}function kh(t){if(!Array.isArray(t))throw new Error("the portal did not answer with rows");if(t.length>=To)throw new Error("the answer was cut short at the limit");const e=t;if(!e.some(o=>o.data_lectura?.slice(5,7)==="12"))throw new Error("the year does not reach December yet");const n=new Map,a=new Set;for(const o of e){const s=o.estat??"";if(s===gh)continue;if(!wh.includes(s))throw new Error(`the network marks days as "${s}", which nobody has decided how to read`);const r=o.data_lectura?.slice(0,10)??"",i=`${o.codi_estacio}/${o.codi_variable}`;if(a.has(`${i}/${r}`))throw new Error(`${i} has ${r} twice`);a.add(`${i}/${r}`);const h=Number(o.valor);Number.isFinite(h)&&n.set(i,[...n.get(i)??[],{date:r,value:h}])}return n}const xh={name:"weather",directory:"public/data/weather",firstYear:1988,files:ce.map(t=>`${t.code}.json`),about:{measures:"daily minimum and maximum temperature, daily rain, most rain in one hour",network:"Xarxa d'Estacions Meteorològiques Automàtiques (XEMA)",attribution:"Servei Meteorològic de Catalunya (XEMA). Dades obertes de la Generalitat de Catalunya.",dataset:`https://analisi.transparenciacatalunya.cat/d/${ya}`,stations:ce},requestsFor(t){const e=ce.map(a=>`'${a.code}'`).join(","),n=ba.map(([,a])=>a.code).join(",");return[Ya(ya,{select:"codi_estacio,codi_variable,data_lectura,valor,estat",where:`codi_estacio in (${e}) and codi_variable in (${n}) and data_lectura between '${t}-01-01T00:00:00' and '${t}-12-31T23:59:59'`,limit:To})]},withYear(t,e,n){const a=kh(n[0]);return Object.fromEntries(ce.map(o=>{const s=`${o.code}.json`,r=ba.flatMap(([c,l])=>{const d=a.get(`${o.code}/${l.code}`);return d?[[c,vh(d,l)]]:[]}),i=Object.fromEntries(r),h={...t[s]?.years,...r.length?{[e]:i}:{}};return[s,{...o,years:h}]}))}},$h=t=>{const e=JSON.parse(t(`/data/weather/${ce[0]?.code}.json`)),n=JSON.parse(t("/data/weather/index.json"));return $o(e,Jt)+lt(n)},Th={name:"weather",apps:{weather:ph},stills:{weather:$h},sources:[xh]},sn="header-world";function So(){try{const t=localStorage.getItem(sn);if(!t)return null;const e=JSON.parse(t);return[e.seed,e.levels,e.roughness,e.share].every(a=>typeof a=="number"&&Number.isFinite(a))?e:null}catch{return null}}function Sh(t){try{localStorage.setItem(sn,JSON.stringify(t))}catch{}}function Mh(){try{localStorage.removeItem(sn)}catch{}}const U=(1+Math.sqrt(5))/2,Ah=[[-1,U,0],[1,U,0],[-1,-U,0],[1,-U,0],[0,-1,U],[0,1,U],[0,-1,-U],[0,1,-U],[U,0,-1],[U,0,1],[-U,0,-1],[-U,0,1]],Ih=[[0,11,5],[0,5,1],[0,1,7],[0,7,10],[0,10,11],[1,5,9],[5,11,4],[11,10,2],[10,7,6],[7,1,8],[3,9,4],[3,4,2],[3,2,6],[3,6,8],[3,8,9],[4,9,5],[2,4,11],[6,2,10],[8,6,7],[9,8,1]];function Eh(){const t=Ah.map(([e,n,a])=>{const o=Math.hypot(e,n,a);return{direction:[e/o,n/o,a/o],radius:1,surface:0}});return Mo(t,Ih.map(e=>[...e]))}const Ch=(t,e)=>(t+e)/2;function jh(t,e,n=Ch){const a=Array.from({length:t.vertexCount},(i,h)=>({direction:[t.directions[h*3]??0,t.directions[h*3+1]??0,t.directions[h*3+2]??0],radius:t.radii[h]??1,surface:t.surface[h]??0})),o=new Map,s=(i,h)=>{const c=i<h?`${i}:${h}`:`${h}:${i}`,l=o.get(c);if(l!==void 0)return l;const d=a[i],m=a[h],[p,u,g]=d.direction,[k,w,b]=m.direction,y=Math.hypot(p*d.radius-k*m.radius,u*d.radius-w*m.radius,g*d.radius-b*m.radius),[$,A,M]=[(p+k)/2,(u+w)/2,(g+b)/2],v=Math.hypot($,A,M)||1,E=n(d.surface,m.surface);a.push({direction:[$/v,A/v,M/v],radius:(d.radius+m.radius)/2+e(y),surface:E});const j=a.length-1;return o.set(c,j),j},r=[];for(let i=0;i<t.faceCount;i+=1){const h=t.faces[i*3],c=t.faces[i*3+1],l=t.faces[i*3+2],d=s(h,c),m=s(c,l),p=s(l,h);r.push([h,d,p],[c,m,d],[l,p,m],[d,m,p])}return Mo(a,r)}function Mo(t,e){const n=new Float32Array(t.length*3),a=new Float32Array(t.length),o=new Float32Array(t.length);t.forEach((r,i)=>{n[i*3]=r.direction[0],n[i*3+1]=r.direction[1],n[i*3+2]=r.direction[2],a[i]=r.radius,o[i]=r.surface});const s=new Uint32Array(e.length*3);return e.forEach(([r,i,h],c)=>{s[c*3]=r,s[c*3+1]=i,s[c*3+2]=h}),{directions:n,radii:a,surface:o,faces:s,faceCount:e.length,vertexCount:t.length}}function Oh(t){const e=Eh();return{seed:t,mesh:e,temperature:new Float32Array(e.vertexCount),faceColour:new Uint8ClampedArray(e.faceCount*3),seaRadius:0}}function Ph(t,e){return{...t,mesh:e,temperature:new Float32Array(e.vertexCount),faceColour:new Uint8ClampedArray(e.faceCount*3)}}function Nh(t,e){return Math.abs(t.mesh.directions[e*3+1]??0)}function Ao(t,e,n){const a=t.mesh.faces[n*3]??0,o=t.mesh.faces[n*3+1]??0,s=t.mesh.faces[n*3+2]??0;return((e[a]??0)+(e[o]??0)+(e[s]??0))/3}function Lh(t,e){return Ao(t,t.mesh.radii,e)}const Io=(t=4,e=.28,n=.2)=>a=>{const o=dt(a.seed);let s=a.mesh;const r=Float32Array.from(s.surface,()=>o());s={...s,surface:r};for(let i=0;i<t;i+=1)s=jh(s,h=>h*e*(o()-.5),(h,c)=>{const l=.5+(o()-.5)*(h-c)*n;return Math.min(1,Math.max(0,h*(1-l)+c*l))});return Ph(a,s)},Eo=({equator:t=1,pole:e=.05,peak:n=0}={})=>a=>{const o=new Float32Array(a.mesh.vertexCount),s=a.mesh.radii,r=s.reduce((c,l)=>Math.min(c,l),1/0),h=s.reduce((c,l)=>Math.max(c,l),-1/0)-r||1;for(let c=0;c<a.mesh.vertexCount;c+=1){const l=((s[c]??1)-r)/h,d=Nh(a,c)**2.2;o[c]=t+(e-t)*d+(n-t)*l}return{...a,temperature:o}},Co=(t=.55)=>e=>{const n=Float32Array.from(e.mesh.radii).sort(),a=Math.min(n.length-1,Math.floor(n.length*t)),o=n[a]??1,s=Float32Array.from(e.mesh.radii,r=>Math.max(r,o));return{...e,mesh:{...e.mesh,radii:s},seaRadius:o}},Dh=[24,92,168],Rh=[62,176,206],Fh=[214,196,138],va=[190,158,84],jt=[70,138,66],Bh=[74,104,76],Wh=[136,128,116],ka=[238,243,247];function ae(t,e,n){const a=Math.min(1,Math.max(0,n));return[t[0]+(e[0]-t[0])*a,t[1]+(e[1]-t[1])*a,t[2]+(e[2]-t[2])*a]}function Hh(t){return t>.78?va:t>.62?ae(jt,va,(t-.62)/.16):t>.3?jt:ae(Bh,jt,(t-.12)*5.5)}const jo=t=>{const e=new Uint8ClampedArray(t.mesh.faceCount*3),n=t.mesh.radii.reduce((o,s)=>Math.max(o,s),-1/0),a=Math.max(1e-6,n-t.seaRadius);for(let o=0;o<t.mesh.faceCount;o+=1){const s=(Lh(t,o)-t.seaRadius)/a,r=Ao(t,t.temperature,o);let i;s<=.002?(i=ae(Rh,Dh,.55),r<.16&&(i=ae(i,ka,(.16-r)*6))):(i=ae(Fh,Hh(r),Math.min(1,s*9)),i=ae(i,Wh,Math.max(0,s-.55)*2.2),r<.26&&(i=ae(i,ka,(.26-r)*4))),e[o*3]=i[0],e[o*3+1]=i[1],e[o*3+2]=i[2]}return{...t,faceColour:e}},qh=[Io(),Co(),Eo(),jo];function zh(t,e=qh){return e.reduce((n,a)=>a(n),Oh(t))}function Oo(t){return zh(t.seed,[Io(t.levels,t.roughness),Co(t.share),Eo(),jo])}const xa=.3,_h=[-.5,.45,.74],Gh=1.02;class rn{size;pixels;depth;view=new Float32Array(0);screen=new Float32Array(0);constructor(e,n=new Uint8ClampedArray(e*e*4)){if(n.length!==e*e*4)throw new Error(`SphereRaster: ${e}×${e} needs ${e*e*4} bytes, not ${n.length}`);this.size=e,this.pixels=n,this.depth=new Float32Array(e*e)}paint(e,n){const{size:a,pixels:o,depth:s}=this;o.fill(0),s.fill(-1/0);const[r,i,h]=Yh(n.light??_h),c=n.tilt??-.38,l=Math.cos(c),d=Math.sin(c),m=Math.cos(n.rotation),p=Math.sin(n.rotation),{directions:u,radii:g,faces:k,faceCount:w,vertexCount:b}=e.mesh;let y=1;for(let v=0;v<b;v+=1){const E=g[v]??1;E>y&&(y=E)}const $=a/(2*y*Gh);this.view.length<b*3&&(this.view=new Float32Array(b*3),this.screen=new Float32Array(b*3));const A=this.view,M=this.screen;for(let v=0;v<b;v+=1){const E=g[v]??1,j=(u[v*3]??0)*E,N=(u[v*3+1]??0)*E,C=(u[v*3+2]??0)*E,S=j*m-C*p,P=j*p+C*m,x=N*l+P*d,I=-N*d+P*l;A[v*3]=S,A[v*3+1]=x,A[v*3+2]=I,M[v*3]=a/2+S*$,M[v*3+1]=a/2-x*$,M[v*3+2]=I}for(let v=0;v<w;v+=1){const E=k[v*3]??0,j=k[v*3+1]??0,N=k[v*3+2]??0,C=M[E*3],S=M[E*3+1],P=M[E*3+2],x=M[j*3],I=M[j*3+1],L=M[j*3+2],D=M[N*3],O=M[N*3+1],R=M[N*3+2],ee=(x-C)*(O-S)-(I-S)*(D-C);if(ee>=0)continue;const ye=A[E*3],ln=A[E*3+1],cn=A[E*3+2],dn=A[j*3]-ye,un=A[j*3+1]-ln,mn=A[j*3+2]-cn,pn=A[N*3]-ye,fn=A[N*3+1]-ln,gn=A[N*3+2]-cn,wn=un*gn-mn*fn,yn=mn*pn-dn*gn,bn=dn*fn-un*pn,mt=Math.hypot(wn,yn,bn)||1,Ho=wn/mt*r+yn/mt*i+bn/mt*h,pt=xa+(1-xa)*Math.max(0,Ho),qo=(e.faceColour[v*3]??0)*pt,zo=(e.faceColour[v*3+1]??0)*pt,_o=(e.faceColour[v*3+2]??0)*pt,Go=Math.max(0,Math.floor(Math.min(C,x,D))),Yo=Math.min(a-1,Math.ceil(Math.max(C,x,D))),Uo=Math.max(0,Math.floor(Math.min(S,I,O))),Jo=Math.min(a-1,Math.ceil(Math.max(S,I,O)));for(let Le=Uo;Le<=Jo;Le+=1)for(let De=Go;De<=Yo;De+=1){const ft=De+.5,gt=Le+.5,Vo=(x-C)*(gt-S)-(I-S)*(ft-C),vn=(D-x)*(gt-I)-(O-I)*(ft-x),kn=(C-D)*(gt-O)-(S-O)*(ft-D);if(Vo>0||vn>0||kn>0)continue;const xn=vn/ee,$n=kn/ee,Tn=P*xn+L*$n+R*(1-xn-$n),re=Le*a+De;Tn<=s[re]||(s[re]=Tn,o[re*4]=qo,o[re*4+1]=zo,o[re*4+2]=_o,o[re*4+3]=255)}}return o}}function Yh([t,e,n]){const a=Math.hypot(t,e,n)||1;return[t/a,e/a,n/a]}const Uh=.2,Jh=.36,Vh=[{upTo:20,dark:4,bright:12},{upTo:70,dark:6,bright:14},{upTo:160,dark:2,bright:10},{upTo:198,dark:3,bright:11},{upTo:275,dark:1,bright:9},{upTo:330,dark:5,bright:13},{upTo:360,dark:4,bright:12}];function Kh(t,e,n){const a=Math.max(t,e,n),o=Math.min(t,e,n),s=(a+o)/2/255;if((a===0?0:(a-o)/a)<Uh)return s<.08?0:s<.5?8:s<.8?7:15;const i=a-o;let h;a===t?h=(e-n)/i*60:a===e?h=(2+(n-t)/i)*60:h=(4+(t-e)/i)*60,h<0&&(h+=360);const c=Vh.find(({upTo:l})=>h<l)??{dark:4,bright:12};return s<.08?0:s>=Jh?c.bright:c.dark}function Xh(t,e){const n=(o,s)=>{const r=(s*e+o)*4;return(t[r+3]??0)===0?-1:Kh(t[r]??0,t[r+1]??0,t[r+2]??0)},a=[];for(let o=0;o<e/2;o+=1){const s=[];for(let r=0;r<e;r+=1)s.push({top:n(r,o*2),bottom:n(r,o*2+1)});a.push(s)}return a}const Se=["#000000","#0000aa","#00aa00","#00aaaa","#aa0000","#aa00aa","#aa5500","#aaaaaa","#555555","#5555ff","#55ff55","#55ffff","#ff5555","#ff55ff","#ffff55","#ffffff"];function Zh(t){const e=({top:n,bottom:a})=>n<0&&a<0?"<span> </span>":n<0?`<span style="color:${Se[a]}">▄</span>`:a<0?`<span style="color:${Se[n]}">▀</span>`:n===a?`<span style="color:${Se[n]}">█</span>`:`<span style="color:${Se[n]};background:${Se[a]}">▀</span>`;return t.map(n=>n.map(e).join("")).join(`
`)}const Vt={levels:4,roughness:.28,share:.55},Me=32;let Ot=null,$a=null,Pt=null;function Ta(t,e){const n=document.querySelector('link[rel="icon"]');if(!n)return;Ot??=Object.assign(document.createElement("canvas"),{width:Me,height:Me});const a=Ot.getContext("2d");a&&(Pt??=a.createImageData(Me,Me),$a??=new rn(Me,Pt.data),$a.paint(t,{rotation:e}),a.putImageData(Pt,0,0),n.type="image/png",n.href=Ot.toDataURL("image/png"))}function Po(t){let e=!0;if(typeof IntersectionObserver!="function")return{onScreen:()=>e,stop:()=>{}};const n=new IntersectionObserver(a=>{for(const o of a)e=o.isIntersecting},{rootMargin:"100px"});return n.observe(t),{onScreen:()=>e,stop:()=>n.disconnect()}}const Qh=90,el=1e3/12,tl=400,Nt=new WeakMap;function nl(t){const e=(t.textContent??"").split(`
`);return{columns:Math.max(...e.map(n=>n.length)),rows:e.length}}function Kt(t,e){Nt.get(t)?.();const n=e??{...Vt,seed:Math.floor(Math.random()*16777215)},{columns:a,rows:o}=nl(t),s=Math.min(a,o*2),r=Oo(n),i=new rn(s);t.dataset.seed=String(n.seed),t.title=`World ${n.seed}, ${r.mesh.faceCount.toLocaleString("en")} triangles`;const h=k=>{t.innerHTML=Zh(Xh(i.paint(r,{rotation:k}),s)),t.classList.add("grown")};if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return h(.6),Ta(r,.6),Nt.set(t,()=>{}),()=>{};let c=0,l=-1/0,d=-1/0;const m=performance.now(),p=Po(t),u=k=>{const w=(k-m)/1e3/Qh*Math.PI*2;p.onScreen()&&k-l>=el&&(h(w),l=k),k-d>tl&&(Ta(r,w),d=k),c=requestAnimationFrame(u)};c=requestAnimationFrame(u);const g=()=>{cancelAnimationFrame(c),p.stop()};return Nt.set(t,g),g}function al(){const t=document.querySelector(".planet");return t?Kt(t,So()??void 0):()=>{}}const he=360,ol=60,sl=1.4,Sa=Math.PI*2/ol,Ma=Math.PI*4;function rl(t){const e=f("canvas",{class:"world",width:he,height:he}),n=e.getContext("2d");if(!n)return()=>{};const a={...Vt,seed:Math.floor(Math.random()*16777215)},o=n.createImageData(he,he),s=new rn(he,o.data),r=window.matchMedia("(prefers-reduced-motion: reduce)").matches;let i,h=.6,c=-.38,l=!r,d=null,m=0,p=performance.now();const u=f("p",{class:"hint"}),g=document.querySelector(".planet"),k=(20*4**Vt.levels).toLocaleString("en"),w=()=>{i=Oo(a);const S=So();u.textContent=`World ${a.seed}: ${i.mesh.faceCount.toLocaleString("en")} triangles. `+(S?`The header is keeping world ${S.seed}, ${(20*4**S.levels).toLocaleString("en")} triangles.`:`The header grows a new one every visit, ${k} triangles each.`),y.hidden=!S,$()},b=f("button",{type:"button",onclick:()=>{Sh({...a}),g&&Kt(g,{...a}),w()}},"Put it in the header"),y=f("button",{type:"button",hidden:!0,onclick:()=>{Mh(),g&&Kt(g),w()}},"Let the header grow its own"),$=()=>{s.paint(i,{rotation:h,tilt:c}),n.putImageData(o,0,0)};let A=0;const M=Po(e),v=S=>{const P=Math.min(.1,(S-p)/1e3);if(!d&&M.onScreen()){if(m!==0){m*=Math.exp(-P/sl);const x=l?Sa:0;(Math.abs(m)<=x||Math.abs(m)<.01)&&(m=0)}m!==0?(h-=m*P,$()):l&&(h+=Sa*P,$()),Gt.send({byRadians:m*P,tiltedBy:0,seconds:P})}p=S,A=requestAnimationFrame(v)};e.addEventListener("pointerdown",S=>{d={x:S.clientX,y:S.clientY,at:S.timeStamp},m=0,e.setPointerCapture(S.pointerId)}),e.addEventListener("pointermove",S=>{if(!d)return;const P=e.clientWidth||he,x=(S.clientX-d.x)/P*Math.PI;h-=x;const I=c;c=Math.max(-1.2,Math.min(1.2,c-(S.clientY-d.y)/P*Math.PI)),Gt.send({byRadians:x,tiltedBy:c-I,seconds:0});const L=Math.max(.004,(S.timeStamp-d.at)/1e3);m=Math.max(-Ma,Math.min(Ma,m*.4+x/L*.6)),d={x:S.clientX,y:S.clientY,at:S.timeStamp},$()}),e.addEventListener("pointerup",S=>{d&&S.timeStamp-d.at>120&&(m=0),d=null,p=performance.now()}),e.addEventListener("pointercancel",()=>{d=null,m=0});const E=f("input",{type:"number",min:0,value:a.seed,onchange:()=>{a.seed=Math.max(0,Math.floor(Number(E.value)||0)),w()}}),j=f("button",{type:"button",onclick:()=>{a.seed=Math.floor(Math.random()*16777215),E.value=String(a.seed),w()}},"Another world"),N=f("button",{type:"button",onclick:()=>{l=!l,N.textContent=l?"Hold still":"Turn"}},l?"Hold still":"Turn"),C=(S,P,x,I,L,D)=>{const O=f("output",{},D(a[S])),R=f("input",{type:"range",min:x,max:I,step:L,value:a[S],onchange:()=>{a[S]=Number(R.value),O.textContent=D(a[S]),w()},oninput:()=>{O.textContent=D(Number(R.value))}});return f("label",{},`${P}: `,O,R)};return t.append(e,f("div",{class:"row"},f("span",{},"Seed "),E,j,N,b,y),f("div",{class:"dials"},C("levels","Detail",2,6,1,S=>`${S} splits`),C("roughness","Roughness",.02,1,.01,S=>S.toFixed(2)),C("share","Sea",0,.98,.01,S=>`${Math.round(S*100)}%`)),u),w(),A=requestAnimationFrame(v),()=>{cancelAnimationFrame(A),M.stop()}}const il={name:"world",apps:{worlds:rl},install:()=>al()},Ae=[il,Ui,Ni,Fi,Fs,Ar,Ps,Th,Jr,Ii,Zr,Xi,ds,pi,fr,jr,Br,Js];function Aa(t,e){const n=[];for(const a of document.querySelectorAll(".app[data-app]")){const o=t[a.dataset.app??""]?.(a,e);o&&n.push(o)}return()=>{for(const a of n)a()}}function hl(t){const e={},n=t.fields.theme;(n==="dark"||n==="light")&&(e["data-page-theme"]=n);const a=t.fields.sky;return a&&(e["data-sky"]=a),e}const ll=["data-page-theme","data-sky"];function cl(t,e){return e==="/"?t==="/":t.startsWith(e)}const No=7.8,Ia=17,Lo=12,dl=8,Lt=28,Ea=44,Ne=8,ul=40,ml=16;function pl(t){const e=new Map;for(const y of t.nodes){const $=y.label.split(`
`),A=Math.max(...$.map(M=>M.length),1);e.set(y.id,{id:y.id,label:y.label,real:!0,rank:-1,along:Math.max(40,A*No+Lo*2),across:$.length*Ia+dl*2,pos:0,preds:[],succs:[]})}for(const y of t.edges)if(!e.has(y.from)||!e.has(y.to))throw new Error(`flow: edge ${y.from} --> ${y.to} names a node that is not there`);const n=fl(t),a={...t,edges:t.edges.map((y,$)=>n.has($)?{...y,from:y.to,to:y.from}:y)};for(const y of a.edges){const $=e.get(y.from),A=e.get(y.to);$.succs.push(A),A.preds.push($)}gl(e);const o=wl(e,a),s=yl(e);bl(s);const r=s.length,i=s.map(y=>Math.max(Ia,...y.map($=>$.real?$.across:0))),h=[];let c=Ne;for(let y=0;y<r;y+=1)h.push(c),c+=(i[y]??0)+Ea;const l=y=>(h[y.rank]??0)+((i[y.rank]??0)-(y.real?y.across:0))/2,d=Math.max(...[...e.values()].map(y=>y.pos+y.along))+Ne,m=c-Ea+Ne,p=t.direction==="LR",u=(y,$)=>p?[$,y]:[y,$],g=[...e.values()].filter(y=>y.real).map(y=>{const[$,A]=u(y.pos,l(y));return{id:y.id,label:y.label,x:$,y:A,width:p?y.across:y.along,height:p?y.along:y.across}}),k=t.edges.map((y,$)=>{const A=o[$]??[],M=A[0],v=A[A.length-1];if(!M||!v)throw new Error("flow: an edge lost its ends");const E=t.edges.some(P=>P.from===y.to&&P.to===y.from),j=Math.min(ul,M.along/3,v.along/3),N=E?n.has($)?j:-j:0,C=[u(M.pos+M.along/2+N,l(M)+M.across),...A.slice(1,-1).map(P=>u(P.pos+P.along/2,l(P)+(i[P.rank]??0)/2)),u(v.pos+v.along/2+N,l(v))],S=n.has($)?C.reverse():C;return y.label===void 0?{from:y.from,to:y.to,points:S}:{from:y.from,to:y.to,label:y.label,points:S}}),[w,b]=u(d,m);return{direction:t.direction,width:w,height:b,nodes:g,edges:k}}function fl(t){const e=new Set,n=new Map,a=o=>{n.set(o,"walking"),t.edges.forEach((s,r)=>{s.from!==o||e.has(r)||(n.get(s.to)==="walking"?e.add(r):n.has(s.to)||a(s.to))}),n.set(o,"done")};for(const o of t.nodes)n.has(o.id)||a(o.id);return e}function gl(t){const e=new Set,n=a=>{if(a.rank>=0)return a.rank;if(e.has(a))throw new Error(`flow: there is a cycle through ${a.id}, and a flow has a direction`);return e.add(a),a.rank=a.preds.length===0?0:Math.max(...a.preds.map(n))+1,e.delete(a),a.rank};for(const a of t.values())n(a)}function wl(t,e){let n=0;return e.edges.map(a=>{const o=t.get(a.from),s=t.get(a.to);if(!o||!s)return[];const r=[o];let i=o;for(let h=o.rank+1;h<s.rank;h+=1){n+=1;const c={id:`\0${n}`,label:"",real:!1,rank:h,along:Math.max(ml,(a.label?.length??0)*No+Lo),across:0,pos:0,preds:[i],succs:[]};t.set(c.id,c),i.succs.push(c),r.push(c),i=c}return i!==o&&(i.succs.push(s),s.preds.push(i),o.succs.splice(o.succs.indexOf(s),1),s.preds.splice(s.preds.indexOf(o),1)),r.push(s),r})}function yl(t){const e=Math.max(...[...t.values()].map(r=>r.rank))+1,n=Array.from({length:e},()=>[]);for(const r of t.values())n[r.rank]?.push(r);const a=new Map,o=r=>r.forEach((i,h)=>a.set(i,h));n.forEach(o);const s=(r,i)=>i.length===0?a.get(r)??0:i.reduce((h,c)=>h+(a.get(c)??0),0)/i.length;for(let r=0;r<4;r+=1){for(let i=1;i<e;i+=1){const h=n[i]??[];h.sort((c,l)=>s(c,c.preds)-s(l,l.preds)),o(h)}for(let i=e-2;i>=0;i-=1){const h=n[i]??[];h.sort((c,l)=>s(c,c.succs)-s(l,l.succs)),o(h)}}return n}function bl(t){const e=r=>r.reduce((i,h)=>i+h.along,0)+Lt*Math.max(0,r.length-1),n=Math.max(...t.map(e));for(const r of t){let i=Ne+(n-e(r))/2;for(const h of r)h.pos=i,i+=h.along+Lt}const a=r=>r.pos+r.along/2,o=(r,i)=>{const h=r.map(d=>{const m=i(d);return m.length===0?a(d):m.reduce((p,u)=>p+a(u),0)/m.length});let c=-1/0;r.forEach((d,m)=>{d.pos=Math.max((h[m]??0)-d.along/2,c),c=d.pos+d.along+Lt});const l=r.reduce((d,m,p)=>d+a(m)-(h[p]??0),0)/Math.max(1,r.length);for(const d of r)d.pos-=l};for(let r=0;r<3;r+=1){for(let i=1;i<t.length;i+=1)o(t[i]??[],h=>h.preds);for(let i=t.length-2;i>=0;i-=1)o(t[i]??[],h=>h.succs)}const s=Math.min(...t.flat().map(r=>r.pos));for(const r of t.flat())r.pos+=Ne-s}const Xt=/(\w[\w.-]*)(?:\[([^\]]*)\])?/,vl=new RegExp(`^${Xt.source}\\s*-->(?:\\|([^|]*)\\|)?\\s*${Xt.source}$`),kl=new RegExp(`^${Xt.source}$`),xl=/^(?:flow\s+)?(TD|LR)$/i;function $l(t){const e=new Map,n=[];let a="TD";const o=(i,h)=>{i&&(e.has(i)||e.set(i,i),h!==void 0&&e.set(i,h.replace(/\\n/g,`
`)))},s=t.split(`
`);let r=!0;return s.forEach((i,h)=>{const c=i.trim();if(c===""||c.startsWith("%"))return;if(r){r=!1;const m=xl.exec(c);if(m){a=m[1]?.toUpperCase()==="LR"?"LR":"TD";return}}const l=vl.exec(c);if(l){const[,m,p,u,g,k]=l;o(m,p),o(g,k),n.push(u===void 0?{from:m??"",to:g??""}:{from:m??"",to:g??"",label:u});return}const d=kl.exec(c);if(d){o(d[1],d[2]);return}throw new Error(`flow: cannot read line ${h+1}: "${c}"`)}),{direction:a,nodes:[...e].map(([i,h])=>({id:i,label:h})),edges:n}}const Tl=20,Ca=17;function Sl(t){let e=5381;for(let n=0;n<t.length;n+=1)e=(e*33^t.charCodeAt(n))>>>0;return e.toString(36)}const W=t=>String(Math.round(t*10)/10);function Ml(t,e){const[n,...a]=t.points;if(!n)return"";let o=`M${W(n[0])},${W(n[1])}`,s=n;for(const r of a){const[i,h]=s,[c,l]=r,d=e?[(i+c)/2,h]:[i,(h+l)/2],m=e?[(i+c)/2,l]:[c,(h+l)/2];o+=` C${W(d[0])},${W(d[1])} ${W(m[0])},${W(m[1])} ${W(c)},${W(l)}`,s=r}return o}function Al(t){const{points:e}=t,n=e[Math.floor((e.length-1)/2)]??[0,0],a=e[Math.ceil((e.length-1)/2)]??n;return[(n[0]+a[0])/2,(n[1]+a[1])/2]}function Il(t){const e=pl($l(t)),n=e.direction==="LR",a=`arrow-${Sl(t)}`,o=e.edges.map(h=>{const c=`<path class="edge" d="${Ml(h,n)}" marker-end="url(#${a})"/>`;if(h.label===void 0)return c;const[l,d]=Al(h);return`${c}<text class="edge-label" x="${W(l)}" y="${W(d)}" text-anchor="middle" dominant-baseline="middle">${T(h.label)}</text>`}).join(""),s=e.nodes.map(h=>{const c=h.x+h.width/2,l=h.label.split(`
`),d=h.y+(h.height-l.length*Ca)/2,m=l.map((p,u)=>`<tspan x="${W(c)}" y="${W(d+Tl-8+u*Ca)}">${T(p)}</tspan>`).join("");return`<g class="node"><rect x="${W(h.x)}" y="${W(h.y)}" width="${W(h.width)}" height="${W(h.height)}" rx="4"/><text text-anchor="middle" dominant-baseline="middle">${m}</text></g>`}).join(""),r=W(e.width),i=W(e.height);return`<figure class="flow"><svg class="flow" viewBox="0 0 ${r} ${i}" width="${r}" height="${i}" style="max-width: 100%; height: auto" role="img"><defs><marker id="${a}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z"/></marker></defs>${o}${s}</svg></figure>`}const Ie={">=":"≥","<=":"≤","!=":"≠","->":"→","...":"…","*":"·",star:"∗","-":"−","'":"′",cdot:"·",inf:"∞",alpha:"α",beta:"β",gamma:"γ",delta:"δ",epsilon:"ε",lambda:"λ",mu:"μ",pi:"π",sigma:"σ",tau:"τ",phi:"φ",omega:"ω",Delta:"Δ",Sigma:"Σ"},ja={sum:"∑",prod:"∏",int:"∫"},El=new Set(["max","min","lim","log","ln","sin","cos","exp","arg"]);function Cl(t){const e=[],n=/\s+|\.\.\.|>=|<=|!=|->|\d+(?:\.\d+)?|[A-Za-z]+|[{}]|[_^]|./g;for(const[a]of t.matchAll(n))/^\s+$/.test(a)||(a==="{"||a==="}"?e.push({kind:"brace",text:a}):a==="_"||a==="^"?e.push({kind:"script",text:a}):/^\d/.test(a)?e.push({kind:"number",text:a}):/^[A-Za-z]/.test(a)?e.push({kind:"name",text:a}):e.push({kind:"sign",text:a}));return e}function jl(t){return t.split(`
`).map(e=>e.trim()).filter(Boolean).map(e=>`<math display="block"><mrow>${new Ol(Cl(e)).expression()}</mrow></math>`).join("")}class Ol{constructor(e){this.tokens=e}tokens;at=0;limits=!1;expression(){let e="";for(;this.at<this.tokens.length&&this.peek()?.text!=="}"&&this.peek()?.text!==")";)e+=this.item();return e}item(){let e=this.atom();const n=this.limits;this.limits=!1;let a=null,o=null;for(;this.peek()?.kind==="script";){const r=this.next().text,i=`<mrow>${this.group()}</mrow>`;r==="_"?a=i:o=i}const s=a&&o?n?"munderover":"msubsup":a?n?"munder":"msub":n?"mover":"msup";return!a&&!o?e:`<${s}>${e}${a??""}${o??""}</${s}>`}atom(){const e=this.next();if(e.kind==="brace"&&e.text==="{"){const n=this.expression();return this.expect("}"),`<mrow>${n}</mrow>`}if(e.text==="("){const n=this.expression();return this.peek()?.text===")"&&(this.at+=1),`<mrow><mo>(</mo>${n}<mo>)</mo></mrow>`}return e.kind==="number"?`<mn>${e.text}</mn>`:e.kind==="name"?e.text==="frac"?`<mfrac><mrow>${this.group()}</mrow><mrow>${this.group()}</mrow></mfrac>`:e.text==="sqrt"?`<msqrt>${this.group()}</msqrt>`:e.text==="text"?`<mtext>${T(this.phrase())}</mtext>`:e.text in ja?(this.limits=!0,`<mo>${ja[e.text]}</mo>`):El.has(e.text)?`<mo>${e.text}</mo>`:e.text in Ie?/^[α-ωΑ-Ω]$/.test(Ie[e.text])?`<mi>${Ie[e.text]}</mi>`:`<mo>${Ie[e.text]}</mo>`:`<mi>${T(e.text)}</mi>`:`<mo>${T(Ie[e.text]??e.text)}</mo>`}group(){if(this.peek()?.text==="{"){this.next();const e=this.expression();return this.expect("}"),e}return this.atom()}phrase(){this.expect("{");const e=[];for(;this.at<this.tokens.length&&this.peek()?.text!=="}";)e.push(this.next().text);return this.expect("}"),e.join(" ")}peek(){return this.tokens[this.at]}next(){const e=this.tokens[this.at];if(!e)throw new Error("the formula ends early");return this.at+=1,e}expect(e){if(this.peek()?.text!==e)throw new Error(`expected ${e} in the formula`);this.at+=1}}function Pl(t,e){const a=/^https?:/.test(e)?' target="_blank" rel="noopener noreferrer"':"";return`<a href="${T(e)}"${a}>${t}</a>`}const Nl=["large","wide"];function Ll(t,e,n){const a=n&&Nl.includes(n)?` class="${n}"`:"";return`<img src="${T(e)}" alt="${T(t)}"${a}>`}const Dl=/(`[^`]+`|!\[[^\]]*\]\([^)\s]+(?:\s+"[^"]*")?\)|\[[^\]]+\]\([^)\s]+\))/g,Rl=/^!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)$/,Fl=/^\[([^\]]+)\]\(([^)\s]+)\)$/;function Do(t){return t.split(Dl).map(e=>{if(e.startsWith("`")&&e.endsWith("`")&&e.length>1)return`<code>${T(e.slice(1,-1))}</code>`;const n=Rl.exec(e);if(n)return Ll(n[1]??"",n[2]??"",n[3]);const a=Fl.exec(e);return a?Pl(Do(a[1]??""),a[2]??""):T(e)}).join("")}function Bl(t){const e=[];return t.replace(/<code>[\s\S]*?<\/code>/g,a=>`\0${e.push(a)-1}\0`).replace(/\*\*([^*]+)\*\*/g,"<strong>$1</strong>").replace(/(^|[^*])\*([^*]+)\*/g,"$1<em>$2</em>").replace(/ {2,}\n/g,"<br>").replace(/\n/g," ").replace(/ -- /g," — ").replace(/\u0000(\d+)\u0000/g,(a,o)=>e[Number(o)]??"")}function Q(t){return Bl(Do(t))}function Wl(t){const e=t.split(`
`).map(p=>p.trim()).filter(Boolean),n=e.find(p=>!p.includes(" :: ")),a=e.filter(p=>p.includes(" :: ")).map(p=>{const u=p.indexOf(" :: ");return{left:p.slice(0,u).trim(),right:p.slice(u+4).trim()}}),o=a.filter(({left:p})=>p.startsWith("=")).map(({left:p,right:u})=>({value:Number(p.slice(1)),name:u})),s=a.filter(({left:p})=>!p.startsWith("=")).map(({left:p,right:u})=>{const[g="",k]=u.split("|").map(b=>b.trim()),w=Number(g.replace(/!$/,"").trim());return{label:p,value:w,shown:k??String(w),marked:g.endsWith("!")}}),r=Math.max(0,...s.map(({value:p})=>p),...o.map(({value:p})=>p))||1,i=p=>(Math.max(0,p)/r).toFixed(3),h=o[0],c=s.map(({label:p,value:u,shown:g,marked:k})=>`<tr${k?' class="marked"':""}><th scope="row">${Q(p)}</th><td><span class="bar" style="--p:${i(u)}"></span><span class="value">${T(g)}</span></td></tr>`).join(""),l=h?` style="--rule:${i(h.value)}"`:"",d=h?` The line is ${T(h.name)}, at ${h.value}.`:"",m=n||h?`<figcaption>${n?Q(n)+".":""}${d}</figcaption>`:"";return`<figure class="bars"><table${l}${h?' class="ruled"':""}><tbody>${c}</tbody></table>${m}</figure>`}const Oa=/^(?:[-*]|\d+\.)\s/;function Hl(t,e,n){if(!Oa.test(t[0]??""))return!1;const a=e.slice(n).find(o=>o.trim()!=="");return a!==void 0&&Oa.test(a)}function ql(t){const e=[],n=t.replace(/\r\n?/g,`
`).split(`
`);let a=[],o=!1;return n.forEach((s,r)=>{if(s.startsWith("```")){o=!o,a.push(s),o||(e.push(a),a=[]);return}if(!o&&s.trim()===""){if(Hl(a,n,r+1))return;a.length&&e.push(a),a=[];return}a.push(s)}),a.length&&e.push(a),e}function zl(t){return t.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}function _l(t){const e=/^(#{1,4})\s+(.*)$/.exec(t[0]??"");if(!e||!t.slice(0,-1).every(s=>/ {2,}$/.test(s)))return null;const a=e[1]?.length??1,o=[e[2]??"",...t.slice(1)].join(`
`);return`<h${a} id="${zl(o)}">${Q(o)}</h${a}>`}function Gl(t){if(!t[0]?.startsWith("```"))return null;const e=t[0].slice(3).trim(),n=t.slice(1,-1).join(`
`);return e==="flow"?Il(n):e==="bars"?Wl(n):e==="math"?jl(n):`<pre><code>${zt(n,e)}</code></pre>`}function Yl(t,e){const n=[];for(const a of t)e.test(a)?n.push(a.replace(e,"")):n.length&&(n[n.length-1]+=`
${a.trim()}`);return n}function Ul(t){const e=t[0]??"",n=/^\d+\.\s/.test(e),a=/^[-*]\s/.test(e);if(!n&&!a)return null;const o=n?/^\d+\.\s+/:/^[-*]\s+/;if(!t.every(i=>o.test(i)||/^\s/.test(i)))return null;const s=n?"ol":"ul",r=Yl(t,o).map(i=>`<li>${Q(i)}</li>`).join("");return`<${s}>${r}</${s}>`}function Jl(t){return t.every(n=>n.includes(" :: "))?`<dl>${t.map(n=>{const a=n.indexOf(" :: ");return[n.slice(0,a),n.slice(a+4)]}).map(([n,a])=>`<dt>${Q(n)}</dt><dd>${Q(a)}</dd>`).join("")}</dl>`:null}function Vl(t){if(!t.every(n=>n.startsWith(">")))return null;const e=t.map(n=>n.replace(/^>\s?/,"")).join(" ");return`<blockquote>${Q(e)}</blockquote>`}function Kl(t){const e=/^::([a-z0-9-]+)$/.exec(t[0]??"");return!e||t.length!==1?null:`<div class="app" data-app="${e[1]}"></div>`}function Xl(t){return t.length===1&&/^-{3,}$/.test(t[0]??"")?"<hr>":null}function Zl(t){const e=t.length===1&&/^(\\+)$/.exec(t[0]??"");return e?`<div class="space" style="--n:${e[1]?.length??1}"></div>`:null}function Ql(t){return t.length===1&&/^!\[[^\]]*\]\([^)\s]+(?:\s+"[^"]*")?\)$/.test(t[0]??"")?`<figure>${Q(t[0]??"")}</figure>`:null}function ec(t){return`<p>${Q(t.join(`
`))}</p>`}const tc=[Xl,Zl,_l,Gl,Vl,Kl,Ql,Jl,Ul];function Ro(t){return ql(t).map(e=>{for(const n of tc){const a=n(e);if(a!==null)return a}return ec(e)}).join(`
`)}function hn(t){return t==="/"?"~":`~${t.replace(/\/$/,"")}`}function Fo(t,e){return`<p class="ran"><span class="ps1">${T(t)} $</span> ${T(e)}</p>`}function nc(t,e){const n=t.childrenOf(e.route);if(n.length===0)return"";const a=n.map(o=>`<li><a class="entry" href="${o.route}"><code>${T(o.name)}${o.link?"@":"/"}</code><span class="title">${T(o.title)}</span>`+(o.summary?`<span class="summary">${T(o.summary)}</span>`:"")+"</a></li>").join("");return`${Fo(hn(e.route),"ls")}
<ul class="listing">${a}</ul>`}function ac(t,e){const n=t.trailTo(e.route).slice(1).map(a=>a.name).join("/");return Fo("~",n?`cd ${n} && cat README.md`:"cat README.md")}function oc(t,e){return`${ac(t,e)}
${Ro(e.body)}
${nc(t,e)}`}function sc(t,e){const n=document.querySelector("main");if(!n)return()=>!1;const a=(o,{push:s=!0,keep:r=!1}={})=>{const i=t.at(o);if(!i)return!1;r||(n.innerHTML=oc(t,i));const h=hl(i);for(const c of ll){const l=h[c];l?document.documentElement.setAttribute(c,l):document.documentElement.removeAttribute(c)}document.title=i.route==="/"?"David Rodenas":`${i.title} — David Rodenas`;for(const c of document.querySelectorAll("nav .navlink"))cl(o,c.getAttribute("href")??"\0")?c.setAttribute("aria-current","page"):c.removeAttribute("aria-current");return s&&(o===window.location.pathname?window.history.replaceState({route:o},"",o):window.history.pushState({route:o},"",o),r||window.scrollTo({top:0})),window.goatcounter?.count?.({path:o,title:document.title}),e(i,r),!0};return document.addEventListener("click",o=>{if(o.defaultPrevented||o.button!==0||o.metaKey||o.ctrlKey||o.shiftKey||o.altKey)return;const s=o.target?.closest("a[href]");if(!s||s.target||s.dataset.run)return;const r=new URL(s.href,window.location.href);if(r.origin!==window.location.origin)return;const i=r.pathname.endsWith("/")?r.pathname:`${r.pathname}/`;t.at(i)&&(o.preventDefault(),i!==window.location.pathname&&a(i))}),window.addEventListener("popstate",()=>{const o=window.location.pathname.endsWith("/")?window.location.pathname:`${window.location.pathname}/`;a(o,{push:!1})}),a}class rc{typed=[];drafts=[];index=0;get lines(){return this.typed}add(e){this.typed.push(e),this.drafts=[...this.typed,""],this.index=this.typed.length}previous(e){return this.moveTo(this.index-1,e)}next(e){return this.moveTo(this.index+1,e)}moveTo(e,n){return this.drafts.length===0&&(this.drafts=[""]),e<0||e>=this.drafts.length?n:(this.drafts[this.index]=n,this.index=e,this.drafts[e]??n)}}function ic(t,e,n,a){if(t==="k"){const o=e.slice(n);return{line:e.slice(0,n),caret:n,killed:o||a}}if(t==="u"){const o=e.slice(0,n);return{line:e.slice(n),caret:0,killed:o||a}}return t==="y"?{line:e.slice(0,n)+a+e.slice(n),caret:n+a.length,killed:a}:null}function Bo(t){return t.split(/\s*(?:;|&&)\s*/).map(e=>e.trim().split(/\s+/).filter(Boolean)).filter(e=>e.length>0)}function se(t,e){const a=e.startsWith("~")||e.startsWith("/")?[]:t.split("/").filter(Boolean),o=e.replace(/^~/,"").split("/").filter(Boolean),s=[...a];for(const r of o)r!=="."&&(r===".."?s.pop():s.push(r));return s.length===0?"/":`/${s.join("/")}/`}function hc(t){return t.replace(/(?:^|\/)(?:README\.md|\*)$/,"")||"."}const lc={name:"cat",usage:"cat <file>",description:"print a page, README.md or * for the one here",run({site:t,cwd:e},[n]){if(!n)return{text:"cat: usage: cat <file>",error:!0};const a=se(e,hc(n)),o=t.at(a);return!o||/\.md$/.test(n)!==/README\.md$/.test(n)?{text:`cat: ${n}: no such file`,error:!0}:{html:Ro(o.body),at:o.route}}},cc={name:"cd",usage:"cd [dir]",description:"go to a directory (the address follows)",run(t,[e="~"]){const n=se(t.cwd,e),a=t.site.at(n);return a?(t.cwd=a.route,{at:a.route}):{text:`cd: ${e}: no such directory`,error:!0}}},dc={name:"clear",usage:"clear",description:"clear what the shell has printed",run(){return{clear:!0}}},uc={name:"find",usage:"find [path] [word]",description:"every page under a directory; with a word, only those it is in the name or title of",run({site:t,cwd:e},n){const[a,o]=n,s=a!==void 0&&(a==="."||a.includes("/")||t.at(se(e,a))!==void 0),r=s?a??".":".",i=(s?o:a)?.toLowerCase(),h=se(e,r);if(!t.at(h))return{text:`find: ${r}: no such directory`,error:!0};const c=u=>t.childrenOf(u).filter(g=>!g.link).flatMap(g=>[g,...c(g.route)]),d=[t.at(h),...c(h)].filter(u=>!i||u.route.toLowerCase().includes(i)||u.title.toLowerCase().includes(i));if(d.length===0)return{text:`find: nothing under ${r}${i?` with "${i}" in it`:""}`};const m=Math.max(...d.map(u=>u.route.length)),p=u=>" ".repeat(m-u.route.length);return{text:d.map(u=>`${u.route}${p(u)}  # ${u.title}`).join(`
`),html:`<pre class="listing">${d.map(u=>`<span class="line"><a href="${T(u.route)}">${T(u.route)}</a>${p(u)}<span class="hint">  # ${T(u.title)}</span></span>`).join("")}</pre>`}}},Dt=40,mc=t=>t.replace(/\]\([^)]*\)/g,"]").replace(/[#*_`>\[\]]/g,"").trim(),pc={name:"grep",usage:"grep <word> [path]",description:"the lines of every page under a directory that say a word",run({site:t,cwd:e},[n,a="."]){if(!n)return{text:"grep: usage: grep <word> [path]",error:!0};const o=se(e,a);if(!t.at(o))return{text:`grep: ${a}: no such directory`,error:!0};const s=n.toLowerCase(),r=t.pages.filter(l=>l.route.startsWith(o)).flatMap(l=>l.body.split(`
`).map((d,m)=>({page:l,number:m+1,line:mc(d)})).filter(({line:d})=>d.toLowerCase().includes(s)));if(r.length===0)return{text:`grep: no page under ${a} says "${n}"`};const i=r.slice(0,Dt),h=r.length>Dt?[`… and ${r.length-Dt} more. Give grep a directory to look in.`]:[],c=l=>T(l).replace(new RegExp(T(n).replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),"ig"),d=>`<mark>${d}</mark>`);return{text:[...i.map(({page:l,number:d,line:m})=>`${l.route}:${d}: ${m}`),...h].join(`
`),html:`<pre class="listing wrap">${[...i.map(({page:l,number:d,line:m})=>`<span class="line"><a href="${T(l.route)}">${T(l.route)}</a>:${d}: <span class="hint">${c(m)}</span></span>`),...h.map(l=>`<span class="line">${T(l)}</span>`)].join("")}</pre>`}}},fc={name:"help",usage:"help [command]",description:"this",run({commands:t},[e]){if(e){const r=t.find(i=>i.name===e);return r?{text:`${r.usage}
  ${r.description}`}:{text:`help: ${e}: no such command`,error:!0}}const n=Math.max(...t.map(r=>r.usage.length)),a=t.map(r=>`${r.usage.padEnd(n)}  ${r.description}`),o="Tab completes; → takes the grey suggestion. ↑↓ recall. ^K kills to the end of the line, ^U back to the start, ^Y puts it back.",s=t.map(r=>`<dt><a href="#" data-run="help ${r.name}">${T(r.usage)}</a></dt><dd>${T(r.description)}</dd>`).join("");return{text:["Commands:",...a,"",o].join(`
`),html:`<p>Commands:</p><dl class="help">${s}</dl><p>${T(o)}</p>`}}};function gc(t){const e=t.filter(a=>a.startsWith("-")).flatMap(a=>a.slice(1).split("")),n=t.find(a=>!a.startsWith("-"))??".";return{flags:e,path:n}}function wc(t,e,n,a){const o=a==="."?"":`${a.replace(/\/$/,"")}/`;return[...e?[{mode:"dr-x",name:"..",title:e.title,summary:e.summary,href:e.route,run:`cd ${o}..`}]:[],{mode:"--r-",name:"README.md",title:t.title,summary:t.summary,href:t.route,run:`cat ${o}README.md`},...n.map(s=>s.link?{mode:"lr-x",name:`${s.name}@`,title:`-> ${s.route}  ${s.title}`,summary:s.summary,href:s.route}:{mode:"dr-x",name:`${s.name}/`,title:s.title,summary:s.summary,href:s.route})]}function Pa(t){const e=t.run?` data-run="${T(t.run)}"`:"";return`<a href="${T(t.href)}"${e}>${T(t.name)}</a>`}function yc(t,e){const n=Math.max(...t.map(i=>i.name.length)),a=i=>" ".repeat(n-i.length),o=i=>e?`${i.mode}  ${i.name}${a(i.name)}  ${i.title}${i.summary?` — ${i.summary}`:""}`:`${i.name}${a(i.name)}  # ${i.title}`,s=i=>e?`<span class="line">${i.mode}  ${Pa(i)}${a(i.name)}  ${T(i.title)}${i.summary?`<span class="hint"> — ${T(i.summary)}</span>`:""}</span>`:`<span class="line">${Pa(i)}${a(i.name)}<span class="hint">  # ${T(i.title)}</span></span>`,r=e?[`total ${t.length}`]:[];return{text:[...r,...t.map(o)].join(`
`),html:`<pre class="listing">${[...r.map(i=>`<span class="line">${i}</span>`),...t.map(s)].join("")}</pre>`}}const bc={name:"ls",usage:"ls [-lnr] [path]",description:"what a directory holds, in the site's own order; -l says more, -n sorts by name, -r reverses",run({site:t,cwd:e},n){const{flags:a,path:o}=gc(n),s=a.find(l=>!["l","n","r"].includes(l));if(s)return{text:`ls: -${s}: no such option. Try ls -l, -n by name, -r reversed`,error:!0};const r=se(e,o),i=t.at(r);if(!i)return{text:`ls: ${o}: no such directory`,error:!0};const h=i.parent===null?void 0:t.at(i.parent),c=[...t.childrenOf(r)];return a.includes("n")&&c.sort((l,d)=>l.name.localeCompare(d.name)),a.includes("r")&&c.reverse(),yc(wc(i,h,c,o),a.includes("l"))}},vc={name:"pwd",usage:"pwd",description:"print where you are",run({cwd:t}){return{text:hn(t)}}},Wo=[bc,cc,lc,uc,pc,vc,fc,dc];class kc{context;constructor(e,n,a=Wo){this.context={site:e,cwd:n,commands:a}}get prompt(){return`${hn(this.context.cwd)} $`}moveTo(e){return this.context.site.at(e)?(this.context.cwd=e,!0):!1}run(e){const n=[];for(const[a="",...o]of Bo(e)){const s=this.context.commands.find(i=>i.name===a),r=s?s.run(this.context,o):{text:`${a}: command not found. Try help`,error:!0};if(n.push(r),r.error)break}return n}complete(e){const n=e.split(/\s+/),a=n.pop()??"",o=n.length===0?"":`${n.join(" ")} `;return(n.length===0?this.commandNames():this.pathNames(a)).filter(r=>r.startsWith(a)).map(r=>o+r)}commandNames(){return this.context.commands.map(e=>e.name).sort()}pathNames(e){const n=e.lastIndexOf("/"),a=n<0?".":e.slice(0,n+1),o=se(this.context.cwd,a);if(!this.context.site.at(o))return[];const s=n<0?"":a;return["README.md",...this.context.site.childrenOf(o).map(i=>`${i.name}/`)].map(i=>s+i)}}function xc(t,e,n){if(t==="")return"help";const o=[...[...e].reverse(),...n].find(s=>s.startsWith(t)&&s!==t);return o?o.slice(t.length):""}const Zt="shell-pending";function $c(t){try{t&&sessionStorage.setItem(Zt,t)}catch{}}function Tc(){try{const t=sessionStorage.getItem(Zt)??"";return sessionStorage.removeItem(Zt),t}catch{return""}}function Sc(){window.__stopTyped?.();const t=window.__typed??[];if(window.__typed=[],t.length===0)return null;const e=[];let n="";for(const a of t)a==="Enter"?(e.push(n),n=""):a==="Backspace"?n=n.slice(0,-1):n+=a;return{finished:e,unfinished:n}}function Mc(t,e,n={}){const a=document.querySelector(".terminal"),o=document.querySelector(".screen"),s=a?.querySelector("form.prompt"),r=s?.querySelector("input"),i=s?.querySelector(".line"),h=s?.querySelector(".suggest"),c=s?.querySelector(".ps1"),l=document.querySelector(".ran.end"),d=l?.querySelector(".ps1"),m=l?.querySelector(".line"),p=l?.querySelector(".typed");if(!a||!o||!s||!r||!i||!h||!c||!l||!d||!m||!p)return null;const u=()=>{c.textContent=g.prompt,d.textContent=g.prompt},g=new kc(t,e,n.commands),k=new rc;let w=null;const b=x=>{o.append(x)},y=()=>{w?.remove(),w=null},$=()=>{const x=r.selectionStart??r.value.length;i.style.setProperty("--caret",String(x)),i.style.setProperty("--typed",String(r.value.length)),p.textContent=r.value,m.style.setProperty("--caret",String(x)),h.textContent=x===r.value.length?xc(r.value,k.lines,g.complete(r.value)):""},A=(x,I=x.length)=>{r.value=x,r.setSelectionRange(I,I),$()},M=x=>{if(x.clear&&(o.replaceChildren(),n.clearPage?.()),x.html){const I=f("div",{class:x.text?"listing-out":"cat"});I.innerHTML=x.html,b(I)}else x.text&&b(f("pre",{class:x.error?"error":""},x.text))},v=x=>{y();const I=f("p",{class:"echo"},f("span",{class:"ps1"},g.prompt),` ${x}`);b(I);let L=!1;const D=Bo(x).map(O=>O.join(" "));for(let O=0;O<D.length;O+=1){const[R]=g.run(D[O]??"");if(R){if(M(R),R.html&&!R.text&&(L=!0),R.at&&!n.moveTo?.(R.at)){$c(D.slice(O+1).join(" && ")),window.location.assign(R.at);return}if(R.error)break}}u(),$(),L?I.scrollIntoView({block:"start"}):window.scrollTo({top:document.documentElement.scrollHeight})},E=()=>{if(y(),r.value.trim()===""){A("help");return}const x=g.complete(r.value);x.length===1?A(x[0]??r.value):x.length>1&&(w=f("p",{class:"hint"},x.map(I=>I.split(" ").pop()).join("  ")),s.insertAdjacentElement("afterend",w),window.scrollTo({top:document.documentElement.scrollHeight}))};s.addEventListener("submit",x=>{x.preventDefault();const I=r.value.trim();A(""),I&&(k.add(I),v(I))});let j="";r.addEventListener("keydown",x=>{if(x.key==="Tab")x.preventDefault(),E();else if(x.key==="ArrowUp")x.preventDefault(),A(k.previous(r.value));else if(x.key==="ArrowDown")x.preventDefault(),A(k.next(r.value));else if(x.key==="ArrowRight"&&r.selectionStart===r.value.length&&h.textContent)x.preventDefault(),A(r.value+h.textContent);else if(x.ctrlKey&&!x.metaKey&&!x.altKey){const I=ic(x.key,r.value,r.selectionStart??r.value.length,j);if(!I)return;x.preventDefault(),y(),A(I.line,I.caret),j=I.killed}else y()});for(const x of["input","keyup","click","focus","select"])r.addEventListener(x,$);let N=!0;r.addEventListener("input",()=>{N&&r.value!==""&&window.scrollTo({top:document.documentElement.scrollHeight}),N=r.value===""}),document.addEventListener("selectionchange",()=>{document.activeElement===r&&$()}),o.addEventListener("click",x=>{const I=x.target?.closest("a[data-run]");I?.dataset.run&&(x.preventDefault(),v(I.dataset.run))}),window.addEventListener("keydown",x=>{const L=x.target?.matches("input, textarea, select, [contenteditable]")??!1,D=x.key.length===1&&!x.ctrlKey&&!x.metaKey&&!x.altKey;L||!D||r.focus({preventScroll:!1})}),s.addEventListener("click",()=>r.focus()),l.addEventListener("click",()=>r.focus()),$();const C=Tc();C&&v(C);const S=Sc();if(S){for(const x of S.finished)x.trim()&&(k.add(x.trim()),v(x.trim()));A(S.unfinished),r.focus()}return{run:v,moveTo:x=>{g.moveTo(x)&&(o.replaceChildren(),u(),$())}}}const Ac=[{file:"book/index.md",markdown:`---
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
title: Essays
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
professional college of computer engineers of Catalonia. I write every
Saturday and I have not missed one since 2022.

This site is laid out like a disk. The names at the top are its directories;
click one, or type at the prompt at the foot of the page -- \`ls\`,
\`cd projects\`, \`cat README.md\` -- and it does the same. \`help\` says the rest.
What each directory holds is listed at the bottom of this page.

## Where to start

![The cover of the book](/book/BookGuide.jpeg) *The Emotional and Technical
Guide to Rescue Stalled Software* (2024) is about conquering technical debt
without sacrificing your sanity or your shipping schedule. Its rule fits on one
line: never rewrite, never stop delivery. [About the book.](/book/)

**Essays.** More than 250 of them on [Medium](https://drpicox.medium.com), one
every Saturday since 2022, read more than half a million times. The most read
one, and the ones read longest, argue with the canon:

- [The JavaScript framework war is over](https://medium.com/p/bd110ddab732)
- [Software Development Is A Beautiful Mess](https://drpicox.medium.com/software-development-is-a-beautiful-mess-45edab1fab73)
- [Scrum vs Extreme Programming: Was XP Right All Along?](https://drpicox.medium.com/scrum-vs-extreme-programming-was-xp-right-all-along-1bb1061e9e6b)

[All of them, by subject, with a line on each.](/essays/)

**[The agent that won the fish auction.](/projects/fish-market/)** A class of
competing buyers in December 2000, a Dutch auction, and the one number ours
stood on: the margin at which the market clears. Run the morning again, and
seat your own agent at the table.

**[Two public APIs of AngularJS are mine.](/open-source/angularjs/)** I made
its compiler faster. The two performance changes shipped in 2016 and were
never taken out: they are still in 1.8.3, the last release the framework had,
and so is \`$componentController\`, the helper its testing module gives you to
unit-test a component.

## The world at the top

The mark in the header is not a picture: it is a planet, grown the moment
this page opened, by the pipeline of a program I wrote for a university
graphics course in 2000. Reload, and it is a different world;
[turn the dials yourself](/projects/worlds/).
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
  Pluto in a month, on a thousand tonnes of fuel at most. Proxima Centauri
  takes sixty-eight years: it burns half its fuel in the first ten weeks,
  reaches 6% of the speed of light, and coasts with the engine off for
  sixty-seven years. At that speed the two clocks still agree.
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

## Barcelona, 2013–2017

The years of the meetups. I spoke at BarcelonaJS and helped organise it, and
co-organised the WeNode conference in 2014.

2013-05 :: **[GruntJS](https://github.com/drpicox/tutorial-gruntjs-v1)**, BarcelonaJS.
2013-09 :: **[Promises](https://github.com/drpicox/tutorial-promises-v1)**, BarcelonaJS -- promises against callbacks, when that was the argument.
2014-05-25 :: **[JS & Patterns](https://github.com/drpicox/tutorial-jspatterns-v1)**, BarcelonaJS. Given again a year later.
2016-01-29/31 :: Three talks across one weekend at the **first AngularCamp Barcelona** -- an un-conference backed by Google Developers, born out of the AngularBeers meetup: *Angular Community and API Decisions*, *MVC: the Model, the great forgotten*, and *Modules in Angular 2*.
2016-03 and 2016-07 :: **MVS: MVC in Angular**, twice, the second time with exercises.
2016-06 :: **The Bowling Game Kata**, twice in a fortnight. It is [still here](/teaching/kata/).
2016-11 → 2017-12 :: **Testing**, four times, and each time a different room: a workshop, then *from the company to the university and back*, then *company, university and professionalism*.
2017-03-17 :: **Jornades de l'Institut Bernat el Ferrer**, Molins de Rei -- a secondary school. The history of software engineering from Dijkstra in 1968 to Agile in 2001, TDD with a calculator, and how to get into university.

## Before that, the conferences

2005 :: **IPDPS**, Denver. First author and speaker on *Optimizing NANOS OpenMP for the IBM Cyclops multithreaded architecture*, with co-authors from IBM T.J. Watson.
2006 :: Co-organiser of the **7th IEEE/ACM Grid Computing Conference**, Barcelona.
2007 :: **HiPEAC industrial workshop** at IBM Haifa, on the Cell simulator.
2011 :: **GbR**, Münster. First author and speaker on parallel graph matching on GPGPUs -- Springer LNCS 6658.
2012 :: Co-organiser of the graph-database track at **FOSDEM**.

## Inside companies, 2017–2023

Training weeks on JavaScript, React and Redux, run twice, in Barcelona and in
Denver. Brown bags and TAST sessions. Sessions on TDD and BDD for teams in two
countries, one of which someone recorded and passed around. And in October 2022,
*TDD is not a stupid idea, it's brilliant* -- BarcelonaJS, in the office.

## Since 2022: algorithms, for people who do not write them

Data, algorithms and generative AI, for neighbours, families and teachers --
the audience that has to make decisions about all three and was never given
the vocabulary. Since 2024 mostly with [Aixeca el cap](https://aixecaelcap.cat/),
a platform for a responsible use of screens, of which I am a member.

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
`}],Na="---";function Ic(t){return(/^"(.*)"$/.exec(t)??/^'(.*)'$/.exec(t))?.[1]??t}function Ec(t){const e=t.replace(/\r\n?/g,`
`).split(`
`);if(e[0]?.trim()!==Na)return{fields:{},body:t.trim()};const n=e.indexOf(Na,1);if(n<0)return{fields:{},body:t.trim()};const a={};for(const o of e.slice(1,n)){const s=o.indexOf(":");s<=0||(a[o.slice(0,s).trim()]=Ic(o.slice(s+1).trim()))}return{fields:a,body:e.slice(n+1).join(`
`).trim()}}function Cc(t){const n=t.replace(/\.md$/,"").replace(/(^|\/)index$/,"");return n===""?"/":`/${n}/`}function jc(t){if(t==="/")return null;const e=t.slice(0,-1);return e.slice(0,e.lastIndexOf("/")+1)}function La(t){if(t==="/")return"/";const e=t.slice(0,-1);return e.slice(e.lastIndexOf("/")+1)}function Oc(t){const{fields:e,body:n}=Ec(t.markdown),a=Cc(t.file);return{file:t.file,route:a,parent:jc(a),name:La(a),title:e.title??La(a),summary:e.summary??"",order:Number(e.order??"100"),body:n,fields:e}}function Pc(t){return t.endsWith("/")?t:`${t}/`}function Da(t,e){return t.order-e.order||t.name.localeCompare(e.name)}class Nc{byRoute;linked;constructor(e){const n=e.map(Oc),a=n.filter(o=>!o.fields.link).sort(Da);this.byRoute=new Map(a.map(o=>[o.route,o])),this.linked=new Map(n.flatMap(o=>{const s=this.byRoute.get(Pc(o.fields.link??""));return!o.fields.link||!s?[]:[[o.route,{...s,parent:o.parent,name:o.name,order:o.order,link:o.route}]]}))}get links(){return[...this.linked.values()].map(e=>({from:e.link,to:e.route}))}get pages(){return[...this.byRoute.values()]}at(e){const n=this.linked.get(e);return this.byRoute.get(n?n.route:e)}childrenOf(e){return[...this.pages,...this.linked.values()].filter(n=>n.parent===e).sort(Da)}trailTo(e){const n=this.at(e);return n?n.parent===null?[n]:[...this.trailTo(n.parent),n]:[]}}const Ee=new Nc(Ac);function Ra(){const t=[...Wo,...Ae.flatMap(l=>l.commands??[])],e=Object.assign({},...Ae.map(l=>l.apps??{})),a=(l=>l.endsWith("/")?l:`${l}/`)(window.location.pathname),o=Ee.at(a);let s=Aa(e,{site:Ee}),r=null;const i=sc(Ee,(l,d)=>{s(),s=Aa(e,{site:Ee});for(const m of Ae)m.arrive?.(l);d||r?.moveTo(l.route)});if(r=Mc(Ee,o?a:"/",{moveTo:l=>i(l,{keep:!0}),clearPage:()=>{s(),s=()=>{},document.querySelector("main")?.replaceChildren()},commands:t}),o)for(const l of Ae)l.arrive?.(o);const c={run:l=>r?.run(l)};for(const l of Ae)l.install?.(c)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Ra):Ra();
