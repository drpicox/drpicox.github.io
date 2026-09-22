const wt=[{name:"llave de laton",kind:"key",value:111},{name:"cristal magico",kind:"key",value:1112},{name:"llave de casa",kind:"key",value:1314},{name:"llave de la verja",kind:"key",value:2636},{name:"llave del puente",kind:"key",value:3444},{name:"llave del gnomo",kind:"key",value:4636},{name:"barca",kind:"key",value:3233},{name:"llave de la despensa",kind:"key",value:2010},{name:"diario",kind:"weapon",value:1},{name:"matamoscas",kind:"weapon",value:2},{name:"espada de madera",kind:"weapon",value:4},{name:"espada",kind:"weapon",value:8},{name:"espada venenosa",kind:"weapon",value:12},{name:"Thurmei",kind:"weapon",value:16},{name:"camisa",kind:"shield",value:2},{name:"escudo de madera",kind:"shield",value:4},{name:"escudo de escamas",kind:"shield",value:8},{name:"escudo",kind:"shield",value:12},{name:"Rharmei",kind:"shield",value:16},{name:"caramelo",kind:"food",value:2},{name:"judia",kind:"food",value:4},{name:"manzana",kind:"food",value:8},{name:"naranja",kind:"food",value:12},{name:"pocima",kind:"food",value:16}],Ha=[{name:"mosca acida",attack:4,defence:0,drops:"cristal magico"},{name:"mosca",attack:0,defence:0,drops:"caramelo"},{name:"mosquito",attack:2,defence:0,drops:"matamoscas"},{name:"polilla",attack:1,defence:1,drops:"camisa"},{name:"cucaracha",attack:1,defence:1,drops:"llave de casa"},{name:"raton",attack:2,defence:2,drops:"judia"},{name:"rana venenosa",attack:2,defence:1,drops:"espada de madera"},{name:"planta carnivora",attack:1,defence:3,drops:"escudo de madera"},{name:"raton salvaje",attack:3,defence:3,drops:"llave de la verja"},{name:"escorpion dorado",attack:12,defence:2,drops:"espada venenosa"},{name:"trucha",attack:3,defence:3,drops:"manzana"},{name:"trucha asesina",attack:4,defence:7,drops:"escudo de escamas"},{name:"minimonstruo aquatico",attack:8,defence:4,drops:"llave del puente"},{name:"lobo",attack:8,defence:6,drops:"manzana"},{name:"lobo asesino",attack:12,defence:7,drops:"escudo"},{name:"ogro",attack:6,defence:10,drops:"naranja"},{name:"gnomo de puente",attack:11,defence:11,drops:"llave del gnomo"},{name:"murcielago",attack:8,defence:8,drops:"judia"},{name:"aranya",attack:14,defence:4,drops:"Thurmei"},{name:"vampiro",attack:12,defence:13,drops:"Rharmei"},{name:"aranya gigante",attack:14,defence:14,drops:"barca"},{name:"monstruo aquatico enorme",attack:32,defence:15,drops:"llave de la despensa"}],Un={"0,0":{name:"Bienvenida",exits:[-1,-1,0,-1],holds:"diario",text:`Bienvenido a este juego de aventura. 
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
sus otros habitantes.`}},en=["norte","sur","este","oeste"],za={norte:[1,0],sur:[-1,0],este:[0,1],oeste:[0,-1]},tn=16,nn=[0,0],an=[1,0],ze=(e,t)=>e.find(n=>n.name===t);function on(e){const t=ze(wt,e);if(t)return{item:t};const n=ze(Ha,e);return n?{monster:n}:null}class ie{places=new Map;at=[nn[0],nn[1]];life=tn;weapon=null;shield=null;key=null;visited=new Set;constructor(){for(const[t,n]of Object.entries(Un))this.places.set(t,{room:n,exits:[...n.exits],holds:on(n.holds)});this.visited.add(this.here())}here(){return`${this.at[0]},${this.at[1]}`}place(){const t=this.places.get(this.here());if(!t)throw new Error(`no room at ${this.here()}`);return t}get won(){return this.at[0]===an[0]&&this.at[1]===an[1]}get spent(){return this.life<=0}save(){return JSON.stringify({at:this.at,life:this.life,held:[this.weapon?.name??null,this.shield?.name??null,this.key?.name??null],visited:[...this.visited],places:[...this.places].map(([t,n])=>[t,n.exits,n.holds?"item"in n.holds?n.holds.item.name:n.holds.monster.name:null])})}static load(t){const n=JSON.parse(t),a=new ie;a.at=n.at,a.life=n.life,[a.weapon,a.shield,a.key]=n.held.map(o=>o?ze(wt,o)??null:null),a.visited.clear();for(const o of n.visited)a.visited.add(o);for(const[o,s,r]of n.places){const i=a.places.get(o);i&&Object.assign(i,{exits:s,holds:r?on(r):null})}return a}look(){const{room:t,exits:n,holds:a}=this.place();return{name:t.name,text:t.text,...a&&"monster"in a?{monster:a.monster.name}:{},...a&&"item"in a?{item:a.item.name}:{},exits:en.flatMap((o,s)=>(n[s]??-1)>=0?[{direction:o,locked:(n[s]??0)>0}]:[]),at:[this.at[0],this.at[1]],life:this.life,...this.weapon?{weapon:this.weapon.name}:{},...this.shield?{shield:this.shield.name}:{},...this.key?{key:this.key.name}:{}}}go(t){const n=this.place(),a=en.indexOf(t),o=n.exits[a]??-1;if(o<0)return"La salida no existe.";if(o>0){if(!this.key||this.key.value!==o)return"La salida esta cerrada y no llevas la llave.";n.exits[a]=0,this.key=null}const[s,r]=za[t];return this.at=[this.at[0]+s,this.at[1]+r],this.visited.add(this.here()),""}take(){const t=this.place();if(!t.holds||!("item"in t.holds))return"No hay ningun objeto para coger!";const{item:n}=t.holds;if(n.kind==="food")return this.life=Math.min(tn,this.life+n.value),t.holds=null,"Ñam Ñam!";const a=n.kind,o=this[a];return this[a]=n,t.holds=o?{item:o}:null,{weapon:"Has cogido una arma.",shield:"Has cogido un escudo.",key:"Has cogido una llave."}[a]}attack(){const t=this.place();if(!t.holds||!("monster"in t.holds))return"No hay monstruo para atacar!";if(!this.weapon)return"No tienes ningua arma para atacar!";const{monster:n}=t.holds,a=[];if(this.weapon.value-n.defence>0){const s=ze(wt,n.drops);t.holds=s?{item:s}:null,a.push("El monstruo ha sido derrotado!")}const o=n.attack-(this.shield?.value??0);return o>0&&(this.life-=o,a.push("OUCH!")),a.join(" ")||"Ninguno de los dos consigue nada."}run(t){const n=t.trim().toLowerCase(),a={norte:"norte",north:"norte",n:"norte",sur:"sur",south:"sur",s:"sur",este:"este",east:"este",e:"este",oeste:"oeste",west:"oeste",w:"oeste"}[n];return a?this.go(a):n==="coger"||n==="take"||n==="get"?this.take():n==="atacar"||n==="attack"||n==="hit"?this.attack():n==="mirar"||n==="look"||n==="l"||n===""?"":"No te entiendo."}}const Ga={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"};function E(e){return e.replace(/[&<>"]/g,t=>Ga[t]??t)}const Se=8;function _a(e,t){const n=[];for(let a=Se-1;a>=0;a-=1)for(let o=0;o<Se;o+=1){const s=`${a},${o}`,r=Un[s],i=e.has(s),l=t[0]===a&&t[1]===o,c=["cell",i?"seen":"",l?"here":""].filter(Boolean).join(" ");n.push(`<span class="${c}" title="${i&&r?E(r.name):""}">${i&&r?E(r.name):""}</span>`)}return`<div class="map" role="img" aria-label="The map: ${e.size} of ${Se*Se} rooms seen">${n.join("")}</div>`}function Ja(e){const t=e.exits.map(({direction:a,locked:o})=>`${a}${o?"(c/l)":""}`),n=[e.weapon&&`arma:${e.weapon}`,e.shield&&`escudo:${e.shield}`,e.key&&`llave:${e.key}`].filter(Boolean).join(" ");return`<div class="seen"><h4>===== ${E(e.name)} =====</h4><p>${E(e.text).replace(/\n/g,"<br>")}</p>`+(e.monster?`<p class="monster">Esta el monstruo: ${E(e.monster)}</p>`:"")+(e.item?`<p class="item">Hay: ${E(e.item)}</p>`:"")+`<p class="exits">Salidas: ${t.length?t.join(" "):"ninguna"}.</p><p class="status">(${e.at[1]},${e.at[0]})| ${E(n)} ${e.life}&gt;</p></div>`}function Yn(e){return`<div class="adventure">${_a(e.visited,e.look().at)}${Ja(e.look())}</div>`}const Ua=()=>Yn(new ie);function p(e,t={},...n){const a=document.createElement(e);for(const[o,s]of Object.entries(t))s===void 0||s===!1||(typeof s=="function"?a.addEventListener(o.slice(2).toLowerCase(),s):s===!0?a.setAttribute(o,""):a.setAttribute(o,String(s)));for(const o of n)o==null||o===!1||a.append(o);return a}const Kn="adventure",Ya=["norte","sur","este","oeste","coger","atacar"];function Ka(e){let t=Va()??new ie;const n=p("div"),a=p("p",{class:"said"}),o=p("input",{type:"text",autocomplete:"off",spellcheck:!1,placeholder:"norte, sur, este, oeste, coger, atacar"});function s(h=""){n.innerHTML=Yn(t),a.textContent=t.spent&&!h?"Fin de partida, más suerte la próxima vez.":h,t.won&&(a.textContent="FELICIDADES! Has llegado a la despensa."),i()}function r(h){const d=t.run(h);s(d),o.value="",o.focus()}function i(){try{localStorage.setItem(Kn,t.save())}catch{}}const l=p("form",{onsubmit:h=>(h.preventDefault(),r(o.value))},p("span",{class:"ps1"},"> "),o),c=p("div",{class:"row"},...Ya.map(h=>p("button",{type:"button",onclick:()=>r(h)},h)),p("button",{type:"button",class:"quiet",onclick:()=>(t=new ie,s(""))},"empezar de nuevo"));return e.replaceChildren(n,a,l,c),s(""),()=>i()}function Va(){try{const e=localStorage.getItem(Kn);return e?ie.load(e):null}catch{return null}}const Xa={name:"adventure",apps:{adventure:Ka},stills:{adventure:Ua}},Qa=["January","February","March","April","May","June","July","August","September","October","November","December"];function Je(e){const[t,n,a]=e.refreshed.split("-").map(Number),o=`${a} ${Qa[(n??1)-1]} ${t}`,s=`${Math.min(...e.years)} to ${Math.max(...e.years)}`;return`<p class="source">Source: ${E(e.attribution)} <a href="${E(e.dataset)}">The dataset, at its source.</a> This site keeps sums of the finished years ${s}, last added to on ${o}.</p>`}function jt(e,t){const n=e.querySelector("p.source");if(n)return n;const a=document.createElement("div");return fetch(t).then(o=>o.json()).then(o=>{a.innerHTML=Je(o)}).catch(()=>{}),a}const oe=[{code:"08019004",name:"Barcelona (Poblenou)",kind:"background",area:"urban"},{code:"08019043",name:"Barcelona (Eixample)",kind:"traffic",area:"urban"},{code:"08019044",name:"Barcelona (Gràcia - Sant Gervasi)",kind:"traffic",area:"urban"},{code:"08019057",name:"Barcelona (Palau Reial)",kind:"background",area:"urban"},{code:"08019058",name:"Barcelona (Observatori Fabra)",kind:"background",area:"suburban"},{code:"08015021",name:"Badalona",kind:"background",area:"urban"},{code:"08187012",name:"Sabadell",kind:"traffic",area:"urban"},{code:"17079003",name:"Girona (Escola de Música)",kind:"traffic",area:"urban"},{code:"25120001",name:"Lleida",kind:"traffic",area:"urban"},{code:"43148028",name:"Tarragona (Parc de la Ciutat)",kind:"background",area:"urban"},{code:"08137001",name:"Montseny (La Castanya)",kind:"background",area:"rural"}];function yt(e,t){return t==="workdays"?[e.workdays]:t==="weekends"?[e.weekends]:[e.workdays,e.weekends]}const Za=e=>(e%4===0&&e%100!==0||e%400===0?366:365)*24,Qe=e=>e.reduce((t,n)=>t+n.reduce((a,o)=>a+o,0),0);function eo(e,t){return Object.entries(e.years).map(([n,a])=>{const o=yt(a,t),s=o.reduce((l,c)=>l+Qe(c.counts),0),r=o.reduce((l,c)=>l+Qe(c.sums),0),i=yt(a,"all").reduce((l,c)=>l+Qe(c.counts),0);return{year:Number(n),mean:s>0?r/s:Number.NaN,measured:i/Za(Number(n))}}).filter(({mean:n})=>!Number.isNaN(n)).sort((n,a)=>n.year-a.year)}function to(e,t){const n=Object.entries(e.years).filter(([a])=>Number(a)>=t.from&&Number(a)<=t.to).flatMap(([,a])=>yt(a,t.days));return Array.from({length:24},(a,o)=>Array.from({length:12},(s,r)=>{const i=n.reduce((c,h)=>c+(h.sums[r]?.[o]??0),0),l=n.reduce((c,h)=>c+(h.counts[r]?.[o]??0),0);return{mean:l>0?i/l:null,count:l}}))}const ne=[[0,[0,255,0]],[20,[225,225,0]],[40,[255,0,0]],[60,[225,0,225]],[80,[64,0,64]],[230,[16,0,8]]],no=([e,t,n])=>(.299*e+.587*t+.114*n)/255;function Pt(e){const t=Math.max(0,Math.min(e,230)),n=Math.max(1,ne.findIndex(([c])=>c>=t)),[a,o]=ne[n-1]??ne[0],[s,r]=ne[n]??ne[ne.length-1],i=(t-a)/(s-a),l=o.map((c,h)=>Math.round(c+((r[h]??0)-c)*i));return{background:`rgb(${l.join(",")})`,light:no(l)<.45}}const We=80,Vn=["January","February","March","April","May","June","July","August","September","October","November","December"],Xn=e=>String(e+1).padStart(2,"0");function ao(e,t,n){if(e.mean===null)return'<td class="none"></td>';const{background:a,light:o}=Pt(e.mean),s=o?' class="deep"':"",r=`${Vn[n]}, hour ${Xn(t)}: ${e.mean.toFixed(1)} µg/m³, the mean of ${e.count} measurements`;return`<td${s} style="background:${a}" title="${r}">${Math.round(e.mean)}</td>`}function oo(e){const t=`<tr><th></th>${Vn.map(a=>`<th scope="col">${a.slice(0,3)}</th>`).join("")}</tr>`,n=e.map((a,o)=>`<tr><th scope="row">${Xn(o)}</th>${a.map((s,r)=>ao(s,o,r)).join("")}</tr>`);return`<table class="heat graded"><thead>${t}</thead><tbody>${n.join("")}</tbody></table>`}function Ot(e){if(e<=0)return[0];const t=10**Math.floor(Math.log10(e)),n=e/t>=5?t:e/t>=2?t/2:t/5,a=[];for(let o=0;o<=e;o+=n)a.push(Math.round(o*100)/100);return a}const Me=720,Ze=190,G={top:14,right:8,bottom:22,left:34},F=e=>e.toFixed(1);function Qn(e,t,n){const a=Math.min(...e),o=Math.max(...e),s=Me-G.left-G.right,r=Ze-G.top-G.bottom,i=s/Math.max(1,o-a+1),l=u=>G.left+(u-a)*i,c=u=>G.top+r-(u-t)/Math.max(1e-9,n-t)*r,d=Ot(n-t).map(u=>Math.round((u+t)*100)/100).map(u=>`<line class="grid" x1="${G.left}" x2="${Me-G.right}" y1="${F(c(u))}" y2="${F(c(u))}"/><text x="${G.left-4}" y="${F(c(u)+3)}" text-anchor="end">${u}</text>`).join(""),m=o-a>12?5:1,f=Array.from({length:o-a+1},(u,g)=>a+g).filter(u=>u%m===0).map(u=>`<text x="${F(l(u)+i/2)}" y="${Ze-6}" text-anchor="middle">${u}</text>`).join("");return{slot:i,x:l,y:c,left:G.left,right:Me-G.right,top:G.top,height:r,levels:u=>u.map(({from:g,to:v,value:y,label:k})=>`<line class="span" x1="${F(l(g))}" x2="${F(l(v)+i)}" y1="${F(c(y))}" y2="${F(c(y))}"/><text class="span" x="${F((l(g)+l(v)+i)/2)}" y="${F(c(y)-5)}" text-anchor="middle">${k}</text>`).join(""),wrap:(u,g)=>`<svg class="years" viewBox="0 0 ${Me} ${Ze}" role="img" aria-label="${u}">${d}${f}${g}</svg>`}}function bt(e,t){const n=Math.max(t.top??0,...e.map(({value:h})=>h),1),a=Qn(e.map(({year:h})=>h),0,n),{x:o,y:s,slot:r}=a,i=e.map(({year:h,value:d,title:m,chosen:f,partial:u,colour:g})=>`<rect class="${["bar",f?"chosen":"",u?"partial":""].filter(Boolean).join(" ")}" data-year="${h}"${g?` style="--bar:${g}"`:""} x="${F(o(h)+r*.15)}" y="${F(s(d))}" width="${F(r*.7)}" height="${F(s(0)-s(d))}"/><rect class="hit" data-year="${h}" x="${F(o(h))}" y="${a.top}" width="${F(r)}" height="${a.height}"><title>${m}</title></rect>`).join(""),l=(t.references??[]).map(({value:h,label:d})=>`<line class="reference" x1="${a.left}" x2="${a.right}" y1="${F(s(h))}" y2="${F(s(h))}"/><text class="reference" x="${a.right-2}" y="${F(s(h)-3)}" text-anchor="end">${d}</text>`).join(""),c=a.levels(t.spans??[]);return a.wrap(t.label,`${i}${l}${c}`)}const so=.75,ro=[{value:40,label:"EU limit, 40"},{value:10,label:"WHO guideline, 10"}];function io(e,t){const n=e.map(({year:a,mean:o,measured:s})=>{const r=s<so,i=r?`, from only ${Math.round(s*100)}% of the year's hours`:"";return{year:a,value:o,partial:r,colour:Pt(o).background,chosen:a>=t.from&&a<=t.to,title:`${a}: ${o.toFixed(1)} µg/m³${i}`}});return bt(n,{label:"Mean NO2 of each year, µg/m³",top:We,references:ro})}const sn={all:"every day of the week",workdays:"Monday to Friday",weekends:"Saturdays and Sundays"};function lo(){const e=Array.from({length:We/5+1},(n,a)=>Pt(a*5).background),t=[0,20,40,60,We].map(n=>`<span>${n===We?`${n}+`:n}</span>`).join("");return`<div class="scale" aria-hidden="true"><div class="ramp" style="background:linear-gradient(to right,${e.join(",")})"></div><div class="ticks">${t}</div><div class="ticks words"><span>clean</span><span>EU limit</span><span>twice it</span></div></div>`}function Zn(e,t){const n=Object.keys(e.years).map(Number),a=Math.max(t.from,Math.min(...n)),o=Math.min(t.to,Math.max(...n)),s=a===o?String(a):`${a}–${o}`;return`<figure class="no2"><figcaption><strong>${e.name}</strong> · ${e.kind}, ${e.area} · mean NO2 in µg/m³ by hour of the day and month of the year · ${sn[t.days]}, ${s}</figcaption>`+oo(to(e,t))+lo()+`<h4>The mean of each year, ${sn[t.days]}</h4>`+io(eo(e,t.days),{from:a,to:o})+"</figure>"}function be(e){const t=Object.keys(e.years).map(Number);return{from:Math.min(...t),to:Math.max(...t),days:"all"}}const ho=[["all","every day"],["workdays","Monday to Friday"],["weekends","Saturday and Sunday"]];function co(e){const t=new Map,n=jt(e,"/data/no2/index.json"),a=p("div");a.append(...e.querySelectorAll("figure"));let o=null,s={from:0,to:9999,days:"all"},r=!1;const i=(y,k=String(y))=>p("option",{value:y},k),l=p("select",{onchange:()=>{g(l.value)}},...oe.map(({code:y,name:k})=>i(y,k))),c=p("select",{onchange:()=>u({days:c.value})},...ho.map(([y,k])=>i(y,k))),h=p("select",{onchange:()=>u({from:Number(h.value),to:Math.max(Number(h.value),s.to)})}),d=p("select",{onchange:()=>u({to:Number(d.value),from:Math.min(Number(d.value),s.from)})}),m=p("button",{type:"button",onclick:()=>o&&u(be(o))},"every year");function f(){o&&(a.innerHTML=Zn(o,s),h.value=String(s.from),d.value=String(s.to),c.value=s.days)}function u(y){s={...s,...y},f()}async function g(y){const k=t.get(y)??fetch(`/data/no2/${y}.json`).then(w=>w.json());t.set(y,k);try{const w=await k;if(r||l.value!==y)return;const S=be(w),M=o!==null&&(s.from!==be(o).from||s.to!==be(o).to),A=Object.keys(w.years).map(Number).filter(P=>P>=s.from&&P<=s.to),$=M&&A.length>0?{from:Math.min(...A),to:Math.max(...A)}:S;o=w,s={...$,days:s.days};const C=Object.keys(w.years);h.replaceChildren(...C.map(P=>i(P))),d.replaceChildren(...C.map(P=>i(P))),f()}catch{t.delete(y),a.replaceChildren(p("p",{},"The measurements for this station did not arrive. The rest of the page does not depend on them."))}}a.addEventListener("click",y=>{const k=y.target?.closest("[data-year]")?.getAttribute("data-year");k&&u({from:Number(k),to:Number(k)})});const v=p("div",{class:"row"},p("label",{},"Station ",l),p("label",{},"Days ",c),p("label",{},"Years ",h," to ",d),m);return e.replaceChildren(v,a,n),g(l.value),()=>{r=!0}}const uo="https://analisi.transparenciacatalunya.cat/resource";function ea(e,t){const n=new URL(`${uo}/${e}.json`);for(const[a,o]of Object.entries(t))o!==void 0&&n.searchParams.set(`$${a}`,String(o));return n.toString()}const rn="tasf-thgu",ta=Array.from({length:24},(e,t)=>String(t+1).padStart(2,"0")),mo=0,po=6,Ae=()=>Array.from({length:12},()=>new Array(24).fill(0)),fo=()=>({workdays:{sums:Ae(),counts:Ae()},weekends:{sums:Ae(),counts:Ae()}});function go(e){if(!Array.isArray(e))throw new Error("the portal did not answer with rows");if(e.length===0)throw new Error("the portal answered with no rows");return e}function wo(e,t){const n=Number(t.month)-1;ta.forEach((a,o)=>{const s=e.sums[n],r=e.counts[n];if(!s||!r)throw new Error(`month ${t.month} is not a month`);s[o]=(s[o]??0)+Number(t[`s${a}`]??0),r[o]=(r[o]??0)+Number(t[`n${a}`]??0)})}const yo={name:"no2",directory:"public/data/no2",firstYear:1991,files:oe.map(e=>`${e.code}.json`),about:{measures:"NO2, hourly, µg/m³",network:"Xarxa de Vigilància i Previsió de la Contaminació Atmosfèrica",attribution:"Generalitat de Catalunya, Xarxa de Vigilància i Previsió de la Contaminació Atmosfèrica. Dades obertes.",dataset:`https://analisi.transparenciacatalunya.cat/d/${rn}`,stations:oe},requestsFor(e){const t=oe.map(a=>`'${a.code}'`).join(","),n=ta.map(a=>`sum(h${a}) as s${a}, count(h${a}) as n${a}`).join(", ");return[ea(rn,{select:`codi_eoi, date_extract_m(data) as month, date_extract_dow(data) as dow, count(*) as days, ${n}`,where:`contaminant='NO2' and codi_eoi in (${t}) and data between '${e}-01-01T00:00:00' and '${e}-12-31T23:59:59'`,group:"codi_eoi,month,dow",limit:5e3})]},withYear(e,t,n){const a=go(n[0]);if(a.some(s=>Number(s.days)>5))throw new Error("some days are in the portal twice");if(!a.some(s=>s.month==="12"))throw new Error("the year does not reach December yet");const o=new Map;for(const s of a){const r=s.codi_eoi??"",i=o.get(r)??fo();o.set(r,i);const l=Number(s.dow);wo(l===mo||l===po?i.weekends:i.workdays,s)}return Object.fromEntries(oe.map(s=>{const r=`${s.code}.json`,i=o.get(s.code),l={...e[r]?.years,...i?{[t]:i}:{}};return[r,{...s,years:l}]}))}},bo=e=>{const t=JSON.parse(e(`/data/no2/${oe[0]?.code}.json`)),n=JSON.parse(e("/data/no2/index.json"));return Zn(t,be(t))+Je(n)},vo={name:"air-quality",apps:{no2:co},stills:{no2:bo},sources:[yo]},re=5,Ue=8,de=e=>Math.max(0,Math.min(100,e));function ln(e){const{focus:t,fatigue:n,featureSize:a,weeks:o,calendar:s,meetingTypes:r}=e,i=[];let l=0,c=0;for(let h=0;h<o;h+=1)for(let d=0;d<re;d+=1){let m=0,f=0;for(let u=0;u<Ue;u+=1){const g=r[s[`${d}-${u}`]??""];if(g){m=de(m+g.focus),f=de(f+g.fatigue),i.push({week:h,day:d,hour:u,inMeeting:!0,hourFocus:m,hourFatigue:f,hourProductivity:0,accumulatedProductivity:l,completedFeatures:c,featureCompleted:!1});continue}m=de(m+t),f=de(f+n);const v=de(m-f),y=a-l,k=v>y,w=k?y:v;k?(c+=1,l=0):l+=w,i.push({week:h,day:d,hour:u,inMeeting:!1,hourFocus:m,hourFatigue:f,hourProductivity:w,accumulatedProductivity:l,completedFeatures:c,featureCompleted:k}),k&&(m=0)}}return i}function Ie(){return Array.from({length:Ue},()=>new Array(re).fill(0))}function Ee(e,{hour:t,day:n},a){const o=e[t];o&&(o[n]=(o[n]??0)+a)}function hn(e,{featureSize:t,weeks:n}){const a=e[e.length-1],o=a?.completedFeatures??0,s=a?.accumulatedProductivity??0,r=o+Math.round(10*s/t)/10,i=o*t+s,l=Array.from({length:re},()=>({productivity:0,features:0,meetings:0})),c={focus:Ie(),fatigue:Ie(),productivity:Ie(),features:Ie()};for(const d of e){const m=l[d.day];m.productivity+=d.hourProductivity,d.featureCompleted&&(m.features+=1),d.inMeeting&&(m.meetings+=1),Ee(c.focus,d,d.hourFocus),Ee(c.fatigue,d,d.hourFatigue),Ee(c.productivity,d,d.hourProductivity),d.featureCompleted&&Ee(c.features,d,1)}const h=d=>d.map(m=>m.map(f=>n>0?f/n:0));return{totalFeatures:r,totalProductivity:i,averageFeaturesPerWeek:n>0?r/n:0,averageProductivityPerWeek:n>0?i/n:0,days:l,hours:{focus:h(c.focus),fatigue:h(c.fatigue),productivity:h(c.productivity),features:c.features}}}const Ge=480,Z=240,B={top:10,right:10,bottom:34,left:36};function na(e,t,n,a){const o=Ge-B.left-B.right,s=Z-B.top-B.bottom,r=c=>B.top+s-(e>0?c/e*s:0),i=a.map(c=>`<line class="grid" x1="${B.left}" x2="${Ge-B.right}" y1="${r(c)}" y2="${r(c)}"/><text x="${B.left-4}" y="${r(c)+3}" text-anchor="end">${c}</text>`).join(""),l=(n>1?[1,Math.ceil(n/2),n]:[]).filter((c,h,d)=>d.indexOf(c)===h).map(c=>`<text x="${B.left+(c-1)/Math.max(1,n-1)*o}" y="${Z-B.bottom+14}" text-anchor="middle">${c}</text>`).join("");return`${i}${l}<text x="${B.left+o/2}" y="${Z-6}" text-anchor="middle">${t.x}</text><text transform="translate(9 ${B.top+s/2}) rotate(-90)" text-anchor="middle">${t.y}</text>`}function ko(e,t){const n=Math.max(...e.map(h=>h.values.length),1),a=Math.max(1,...e.flatMap(h=>h.values)),o=Ge-B.left-B.right,s=Z-B.top-B.bottom,r=h=>B.left+h/Math.max(1,n-1)*o,i=h=>B.top+s-h/a*s,l=e.map(h=>{const d=h.values.map((m,f)=>`${r(f).toFixed(1)},${i(m).toFixed(1)}`).join(" ");return`<polyline class="line ${h.className}" points="${d}"><title>${h.name}</title></polyline>`}).join(""),c=e.map((h,d)=>`<rect class="${h.className}" x="${B.left+d*90}" y="${Z-B.bottom+20}" width="10" height="3"/><text x="${B.left+d*90+14}" y="${Z-B.bottom+24}">${h.name}</text>`).join("");return`<svg viewBox="0 0 ${Ge} ${Z}" role="img" aria-label="${t.y} by ${t.x}">${na(a,t,n,Ot(a))}${l}${c}</svg>`}const cn=480,ue=240,H={top:10,right:10,bottom:34,left:36};function aa(e,t,n){const a=Math.max(...e.map(u=>u.values.length),1),o=Math.max(1,...e.flatMap(u=>u.values)),s=cn-H.left-H.right,r=ue-H.top-H.bottom,i=s/a,l=i*.7/e.length,c=u=>H.top+r-u/o*r,h=e.map((u,g)=>u.values.map((v,y)=>{const k=H.left+y*i+i*.15+g*l;return`<rect class="${u.className}" x="${k.toFixed(1)}" y="${c(v).toFixed(1)}" width="${l.toFixed(1)}" height="${(H.top+r-c(v)).toFixed(1)}"><title>${u.name}: ${Math.round(v*10)/10}</title></rect>`}).join("")).join(""),d=(n??[]).map((u,g)=>`<text x="${H.left+g*i+i/2}" y="${ue-H.bottom+14}" text-anchor="middle">${u}</text>`).join(""),m=e.map((u,g)=>`<rect class="${u.className}" x="${H.left+g*90}" y="${ue-H.bottom+20}" width="10" height="3"/><text x="${H.left+g*90+14}" y="${ue-H.bottom+24}">${u.name}</text>`).join(""),f=na(o,t,n?0:a,Ot(o));return`<svg viewBox="0 0 ${cn} ${ue}" role="img" aria-label="${t.y} by ${t.x}">${f}${h}${d}${m}</svg>`}const vt=["Mon","Tue","Wed","Thu","Fri"],oa=Array.from({length:Ue},(e,t)=>`${9+t}:00`);function xo(e){return e<=500?e:e<=750?500+(e-500)*2:e<1e3?1e3+(e-750)*35:1e4}function $o(e){return e<=500?e:e<=1e3?500+(e-500)/2:e<1e4?750+(e-1e3)/35:1e3}function Ce(e,t){const n=t.flat(),a=Math.min(...n),o=Math.max(...n),s=p("div",{class:"week"},p("span"),...vt.map(r=>p("span",{class:"head"},r)));return t.forEach((r,i)=>{s.append(p("span",{class:"hour"},oa[i]??""));for(const l of r){const c=o>a?(l-a)/(o-a):0;s.append(p("span",{class:"cell",style:`--heat:${(.1+c*.9).toFixed(2)}`},String(Math.round(l))))}}),p("div",{},p("h4",{},e),s)}function To(e){const t={focus:25,fatigue:15,featureSize:300,weeks:8},n={"🍽️ Lunch":{focus:-100,fatigue:-100},"🏃 Sprint plan":{focus:-100,fatigue:50},"😴 Boring":{focus:-50,fatigue:-25}},a={};for(let I=0;I<re;I+=1)a[`${I}-3`]="🍽️ Lunch";let o="🏃 Sprint plan",s=null;const r=p("div",{class:"figures"}),i=p("div",{class:"chart"}),l=p("div",{class:"maps"}),c=p("div",{class:"week"}),h=p("select"),d=p("input",{type:"number",min:-100,max:100}),m=p("input",{type:"number",min:-100,max:100}),f=p("input",{type:"text",placeholder:"New meeting name",size:16}),u=(I,x,O,b,T=R=>R,D=R=>R)=>{const R=p("output",{},String(t[I])),j=p("input",{type:"range",min:O,max:b,value:D(t[I]),oninput:()=>{t[I]=T(Number(j.value)),R.textContent=String(t[I]),L()}});return p("label",{},`${x}: `,R,j)},g=p("div",{class:"dials"},u("focus","Focus an hour",0,100),u("fatigue","Fatigue an hour",0,100),u("featureSize","Feature size",0,1e3,xo,$o),u("weeks","Weeks",1,16));function v(){h.replaceChildren(...Object.keys(n).map(x=>p("option",{value:x,selected:x===o},x)));const I=n[o];d.value=String(I?.focus??0),m.value=String(I?.fatigue??0)}h.addEventListener("change",()=>{o=h.value,v()});const y=()=>{n[o]={focus:Number(d.value)||0,fatigue:Number(m.value)||0},L()};d.addEventListener("change",y),m.addEventListener("change",y);const k=()=>{const I=f.value.trim();!I||n[I]||(n[I]={focus:0,fatigue:0},o=I,f.value="",v())},w=p("div",{class:"row"},p("span",{},"Paint: "),h,p("span",{},"focus "),d,p("span",{},"fatigue "),m,f,p("button",{type:"button",onclick:k},"Add"));let S=null;const M=I=>{if(S==="add"&&!a[I])a[I]=o;else if(S==="remove"&&a[I])delete a[I];else return;L()};function A(){c.replaceChildren(p("span"),...vt.map(I=>p("span",{class:"head"},I))),oa.forEach((I,x)=>{c.append(p("span",{class:"hour"},I));for(let O=0;O<re;O+=1){const b=`${O}-${x}`,T=a[b];c.append(p("span",{class:T?"slot meeting":"slot",title:T??"free",onpointerdown:D=>{D.preventDefault(),S=a[b]?"remove":"add",M(b)},onpointerenter:()=>{S&&M(b)}},T?T.slice(0,2):""))}})}window.addEventListener("pointerup",()=>{S=null});const $=p("div",{class:"row"}),C=()=>{s={summary:hn(ln({...t,calendar:a,meetingTypes:n}),t),weeks:t.weeks},L()},P=()=>{s=null,L()};function L(){A();const I=ln({...t,calendar:a,meetingTypes:n}),x=hn(I,t),O=t.weeks*re*Ue;r.replaceChildren(p("div",{class:"clean"},p("strong",{},x.totalFeatures.toFixed(1)),"features finished"),p("div",{},p("strong",{},x.averageFeaturesPerWeek.toFixed(2)),"features a week"),p("div",{},p("strong",{},Math.round(x.totalProductivity/O).toString()),"productivity an hour"),p("div",{},p("strong",{},String(O)),"hours simulated")),$.replaceChildren(s?p("span",{},`Baseline: ${s.summary.averageFeaturesPerWeek.toFixed(2)} features a week over ${s.weeks} weeks; now ${x.averageFeaturesPerWeek.toFixed(2)}. `):p("span",{},"Keep this run to compare against: "),p("button",{type:"button",onclick:C},s?"Save again":"Save as baseline")),s&&$.append(p("button",{type:"button",onclick:P},"Clear")),i.innerHTML=aa([{name:"Productivity",className:"clean",values:x.days.map(b=>b.productivity/t.weeks)},{name:"Features ×100",className:"debt",values:x.days.map(b=>b.features/t.weeks*100)}],{x:"",y:"A day, on average"},vt),i.prepend(p("h4",{},"The shape of a week")),l.replaceChildren(Ce("Focus",x.hours.focus),Ce("Fatigue",x.hours.fatigue),Ce("Productivity",x.hours.productivity),Ce("Features finished",x.hours.features))}v(),e.append(g,w,p("div",{class:"charts"},c,i),r,$,l),L()}const So={name:"developer-meetings",apps:{"developer-meetings":To}};function Mo(e,t){const n=[];for(let a=e.length-1;a>=0;a-=1)n.push(e.slice(0,a));for(let a=1;a<=t.length;a+=1)n.push(t.slice(0,a));return n}const Ao=3800,Io=6500,Eo=26,Co=46,jo=420;function Po(e){return[...e.childNodes].map(t=>t.nodeName==="BR"?`
`:t.textContent??"").join("")}function Oo(e){const t=document.querySelector("main h1");if(!t||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return()=>{};const n={text:Po(t)};t.setAttribute("aria-label",n.text),t.classList.add("typing");const a=document.createElement("span");a.className="caret idle",a.setAttribute("aria-hidden","true");const o=(h,d)=>{const m=h.split(`
`).flatMap((f,u)=>u===0?[f]:[document.createElement("br"),f]);if(d){const f=document.createElement("a");f.href=d,f.append(...m,a),t.replaceChildren(f)}else t.replaceChildren(...m,a)};o(n.text);let s=n,r=[],i=performance.now()+Ao,l=0;const c=h=>{if(l=requestAnimationFrame(c),h<i)return;if(r.length===0){const m=e(s,n);r=Mo(s.text,m.text),s=m,a.classList.remove("idle")}const d=r.shift()??s.text;o(d,r.length===0?s.href:void 0),r.length===0?(a.classList.add("idle"),i=h+Io):d===""?i=h+jo:i=h+(d.length<(r[0]?.length??0)?Co:Eo)};return l=requestAnimationFrame(c),()=>{cancelAnimationFrame(l),o(n.text),a.remove(),t.classList.remove("typing"),t.removeAttribute("aria-label")}}function Lo(e,t){const n=[...e];for(let a=n.length-1;a>0;a-=1){const o=Math.min(a,Math.floor(t()*(a+1)));[n[a],n[o]]=[n[o],n[a]]}return n}function Do(e,t){let n=[];return a=>(n.length===0&&(n=Lo(e,t),n.length>1&&n[0]===a&&n.push(n.shift())),n.shift()??a)}const Ro=[{text:`More than
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
as this page opened.`,href:"/worlds/"}];let et=null;const No={name:"headline",arrive:e=>{if(et?.(),et=null,e.route!=="/")return;let t=null;et=Oo((n,a)=>(t??=Do([a,...Ro],Math.random),t(n)))}};function Fo(e,t){let n=Array.from({length:t.length+1},(a,o)=>o);for(let a=1;a<=e.length;a+=1){const o=[a];for(let s=1;s<=t.length;s+=1){const r=(n[s-1]??0)+(e[a-1]===t[s-1]?0:1);o[s]=Math.min(r,(n[s]??0)+1,(o[s-1]??0)+1)}n=o}return n[t.length]??0}function Bo(e,t){if(t.includes(e))return e;let n=null,a=1/0;for(const o of t){const s=Fo(e,o);s<a&&([n,a]=[o,s])}return n}const Wo=/[\p{L}\p{M}\p{N}']+|[.,!?;:]/gu,qo=/\]\([^)]*\)|^---[\s\S]*?\n---|[#*_`>\[\]|]|::[a-z-]+/gm;function _e(e){return e.normalize("NFKC").replace(qo," ").toLowerCase().match(Wo)??[]}const je=" ";class kt{constructor(t,n){this.memory=n;const a=_e(t),o=new Map;for(const s of a)o.set(s,(o.get(s)??0)+1);this.vocabulary=[...o.keys()],this.commonest=[...o].reduce((s,r)=>s&&s[1]>=r[1]?s:r,null)?.[0]??null;for(let s=1;s<a.length;s+=1)for(let r=1;r<=n&&r<=s;r+=1){const i=a.slice(s-r,s).join(je),l=this.followers.get(i)??new Map;l.set(a[s]??"",(l.get(a[s]??"")??0)+1),this.followers.set(i,l)}}memory;vocabulary;commonest;followers=new Map;after(t){for(let n=Math.min(this.memory,t.length);n>=1;n-=1){const a=t.slice(-n),o=this.followers.get(a.join(je));if(o)return{context:a,candidates:dn(o)}}return{context:[],candidates:[]}}transitions(){return[...this.followers].filter(([t])=>t.split(je).length===this.memory).flatMap(([t,n])=>dn(n).map(a=>({context:t.split(je),...a}))).sort((t,n)=>n.probability-t.probability||n.count-t.count)}}function dn(e){const t=[...e.values()].reduce((n,a)=>n+a,0);return[...e].map(([n,a])=>({word:n,count:a,probability:a/t})).sort((n,a)=>a.count-n.count)}function Ho(e,t){let n=t();for(const a of e)if(n-=a.probability,n<=0)return a.word;return e[e.length-1]?.word??null}function un(e){return e.reduce((t,n)=>t===""||/^[.,!?;:]$/.test(n)?t+n:`${t} ${n}`,"")}function sa(e,t){if(t<=0)return e.map((o,s)=>({...o,probability:s===0?1:0}));const n=e.map(o=>o.probability**(1/t)),a=n.reduce((o,s)=>o+s,0);return e.map((o,s)=>({...o,probability:(n[s]??0)/a}))}const tt=40,mn=8,nt=e=>`${Math.round(e*100)}%`;function ra(e,t,n){const{context:a,candidates:o}=e.after(t),s=o.slice(0,mn),r=sa(o,n).slice(0,mn),i=o.reduce((g,{count:v})=>g+v,0),l=t.slice(0,t.length-a.length),c=`<p class="written">${E(un(l))}${l.length&&a.length?" ":""}${a.length?`<mark>${E(un(a))}</mark>`:""}<span class="caret"></span></p>`,h=s.length?`<ol class="offered">${s.map(({word:g,count:v,probability:y},k)=>{const w=r[k]?.probability??0;return`<li><button type="button" data-word="${E(g)}" title="seen ${v} of ${i} times: ${nt(y)} as learnt"><span class="word">${E(g)}</span><span class="chance" style="--p:${w.toFixed(3)}"></span><span class="figure">${nt(w)}</span></button></li>`}).join("")}</ol>`:`<p class="offered">It never saw anything follow “${E(t[t.length-1]??"")}”. This is where it stops.</p>`,d=g=>a.length===e.memory&&g.context.join(" ")===a.join(" "),m=e.transitions(),f=[...m.filter(d),...m.filter(g=>!d(g))].slice(0,tt).map(g=>`<tr${d(g)?' class="now"':""}><td>${E(g.context.join(" "))}</td><td>${E(g.word)}</td><td>${g.count}</td><td>${nt(g.probability)}</td></tr>`).join(""),u=`<table class="learnt"><caption>What it learnt: ${m.length} transitions between ${e.vocabulary.length} words${m.length>tt?`, the first ${tt} shown`:""}</caption><thead><tr><th>after</th><th>comes</th><th>seen</th><th>chance</th></tr></thead><tbody>${f}</tbody></table>`;return`<div class="next-word">${c}<h4>What may come next</h4>${h}${u}</div>`}const qe="The cat is happy. The dog is glad. The cat sleeps. The dog plays. The cat eats. The dog runs. The car is fast. The car goes far.",zo=350;function Go(e,{site:t}){const n={small:()=>qe,site:()=>t.pages.map($=>$.body).join(`

`),own:()=>h.value};let a=new kt(qe,1),o=_e("the"),s=null;const r=p("div"),i=($,C)=>p("option",{value:$},C),l=p("select",{onchange:()=>y()},i("small","eight short sentences"),i("site","this website"),i("own","your own text")),c=p("select",{onchange:()=>y()},i(1,"one word back"),i(2,"two words back"),i(3,"three words back")),h=p("textarea",{rows:5,hidden:!0,placeholder:"Paste any text here. The longer, the better it pretends.",oninput:()=>y()}),d=p("output",{},"1"),m=p("input",{type:"range",min:0,max:2,step:.1,value:1,oninput:()=>g()}),f=p("input",{type:"text",value:"the",onchange:()=>v()}),u=p("button",{type:"button",onclick:()=>s?S():w()},"write");function g(){d.textContent=m.value,r.innerHTML=ra(a,o,Number(m.value))}function v(){S();const $=_e(f.value).flatMap(C=>Bo(C,a.vocabulary)??[]);o=$.length?$:a.commonest?[a.commonest]:[],g()}function y(){h.hidden=l.value!=="own",a=new kt(n[l.value]?.()??qe,Number(c.value)),v()}function k(){const $=Ho(sa(a.after(o).candidates,Number(m.value)),Math.random);return $===null?!1:(o=[...o,$],g(),!0)}function w(){u.textContent="stop",s=setInterval(()=>{k()||S()},zo)}function S(){s&&clearInterval(s),s=null,u.textContent="write"}r.addEventListener("click",$=>{const C=$.target?.closest("[data-word]")?.getAttribute("data-word");C&&(o=[...o,C],g())});const M=p("div",{class:"dials"},p("label",{},"It has read",l),p("label",{},"It looks",c),p("label",{},"Temperature: ",d,m),p("label",{},"Start from",f)),A=p("div",{class:"row"},p("button",{type:"button",onclick:()=>{k()}},"next word"),u,p("button",{type:"button",onclick:()=>v()},"start over"));return e.replaceChildren(M,h,A,r),g(),S}const _o=()=>ra(new kt(qe,1),_e("the"),1),Jo={name:"next-word",apps:{"next-word":Go},stills:{"next-word":_o}},at={"string-cache-map":"a WeakMap replacement for string keys, with a bounded cache behind it","async-barrier":"a helper that makes async/await tests say what they wait for","spy-middleware":"a Redux middleware for spying on actions in tests","grunt-frontmatter":"a Grunt task: many files with YAML front matter into one JSON","object-canonical-keys":"always the same array of keys for the same keys, so comparisons stay cheap","async-deferrer":"one function that returns a promise, or resolves it"},pn=160,ot=28,He=e=>e.toLocaleString("en-US");function st(e,t){const n=Math.max(1,...e.map(t)),a=pn/e.length,o=e.map((s,r)=>{const i=t(s)/n*(ot-2);return`<rect x="${(r*a+1).toFixed(1)}" y="${(ot-i).toFixed(1)}" width="${(a-2).toFixed(1)}" height="${i.toFixed(1)}"><title>${s}: ${He(t(s))}</title></rect>`}).join("");return`<svg class="spark" viewBox="0 0 ${pn} ${ot}" role="img" aria-label="Downloads a year, ${e[0]} to ${e[e.length-1]}">${o}</svg>`}function ia(e){const t=Object.keys(e.years).sort(),n=h=>d=>e.years[d]?.[h]??0,a=h=>t.reduce((d,m)=>d+h(m),0),o=Object.keys(at).sort((h,d)=>a(n(d))-a(n(h))),s=[...new Set(t.flatMap(h=>Object.keys(e.years[h]??{})))].filter(h=>!(h in at)),r=h=>s.reduce((d,m)=>d+n(m)(h),0),i=h=>Object.values(e.years[h]??{}).reduce((d,m)=>d+m,0),l=o.filter(h=>a(n(h))>0).map(h=>`<tr><th scope="row"><a href="https://www.npmjs.com/package/${h}"><code>${h}</code></a><span>${at[h]}</span></th><td>${st(t,n(h))}</td><td>${He(a(n(h)))}</td></tr>`).join(""),c=s.length?`<tr><th scope="row">the other ${s.length}<span>mostly AngularJS and Redux helpers written for one project each</span></th><td>${st(t,r)}</td><td>${He(a(r))}</td></tr>`:"";return`<figure class="packages"><table class="packages"><thead><tr><th>package</th><th>${t[0]} to ${t[t.length-1]}, a bar a year</th><th>downloads</th></tr></thead><tbody>${l}${c}</tbody><tfoot><tr><th scope="row">all of them</th><td>${st(t,i)}</td><td>${He(a(i))}</td></tr></tfoot></table></figure>`}function Uo(e){if(e.querySelector("figure"))return;const t=jt(e,"/data/npm/index.json");fetch("/data/npm/downloads.json").then(n=>n.json()).then(n=>{e.innerHTML=ia(n),e.append(t)}).catch(()=>{e.textContent="The download counts did not arrive. The rest of the page does not depend on them."})}const rt=["string-cache-map","async-barrier","spy-middleware","grunt-frontmatter","object-canonical-keys","gherkin-genie","async-deferrer","egg-hatchery","angular-tags","class-strict","micro-egg-hatchery","node-dio","ducks-middleware","drpx-updateable","generator-drpx","grunt-ngtags","teal-redux-egg","ducks-reducer","drpx-storage-mocks","strict-classes","ngtags","redux-egg","esmoquin","drpx-storage","dio-provider","drpx-components","grunt-angular-tags","drpx-bind-angular","drpx-toggle","drpx-id","drpx-seo","drpx-otherwisehome","drpx-class-route","drpx-transcludeto"],it="downloads.json",Yo={name:"npm",directory:"public/data/npm",firstYear:2015,files:[it],about:{measures:"downloads a year of the npm packages published as drpicox",attribution:"npm, Inc. Download counts of the public registry.",dataset:"https://github.com/npm/registry/blob/main/docs/download-counts.md",packages:rt},requestsFor(e){return[`https://api.npmjs.org/downloads/point/${e}-01-01:${e}-12-31/${rt.join(",")}`]},withYear(e,t,n){const a=n[0],o=Object.entries(typeof a=="object"&&a!==null?a:{}).flatMap(([s,r])=>{const i=r?.downloads;return rt.includes(s)&&typeof i=="number"&&i>0?[[s,i]]:[]});if(o.length===0)throw new Error("the registry did not answer with downloads");return{[it]:{years:{...e[it]?.years,[t]:Object.fromEntries(o)}}}}},Ko=e=>ia(JSON.parse(e("/data/npm/downloads.json")))+Je(JSON.parse(e("/data/npm/index.json"))),Vo={name:"packages",apps:{packages:Uo},stills:{packages:Ko},sources:[Yo]},ke={dryMass:25e3,fuel:5e3,exhaust:.72,acceleration:.3},Pe=149597870700,me=94607e11,xt=[{name:"the Moon",metres:3844e5,said:"384,400 km"},{name:"Mars",metres:.52*Pe,said:"0.52 au"},{name:"Jupiter",metres:4.2*Pe,said:"4.2 au"},{name:"Saturn",metres:8.5*Pe,said:"8.5 au"},{name:"Pluto",metres:38.5*Pe,said:"38.5 au"},{name:"Proxima Centauri",metres:4.24*me,said:"4.24 light-years"},{name:"Sirius",metres:8.58*me,said:"8.58 light-years"},{name:"Epsilon Eridani",metres:10.52*me,said:"10.52 light-years"},{name:"the centre of the galaxy",metres:26e3*me,said:"26,000 light-years",towards:{ra:17.76,dec:-29}},{name:"Andromeda",metres:25e5*me,said:"2.5 million light-years",towards:{ra:.712,dec:41.27}}],Xo=[[365.25*86400*1e6,"million years"],[365.25*86400,"years"],[86400,"days"],[3600,"hours"],[60,"minutes"],[1,"seconds"]];function le(e){const[t,n]=Xo.find(([s])=>e>=s)??[1,"seconds"],a=e/t;return`${a>=10?Math.round(a).toLocaleString("en-US"):String(Math.round(a*10)/10)} ${n}`}const J=299792458,Qo=9.81;function la(e,t){const n=t.acceleration*Qo,a=t.dryMass+t.fuel,o=t.exhaust*J,s=J/n*Math.acosh(1+n*e/(2*J*J)),r=a*(1-Math.exp(-2*n*s/o)),i=r>t.fuel,l=i?o/n*Math.log(a/(a-t.fuel/2)):s,c=Math.tanh(n*l/J),h=J/n*Math.sinh(n*l/J),d=J*J/n*(Math.cosh(n*l/J)-1),m=Math.max(0,e-2*d),f=i?m/(c*J):0,u=f*Math.sqrt(1-c*c);return{shipTime:2*l+u,homeTime:2*h+f,burnTime:l,coastTime:u,topSpeed:c,fuelBurnt:i?t.fuel:r,coasts:i}}const ha=299792458,Zo=9.81,pe=720,Oe=170,z={top:12,right:10,bottom:24,left:40};function ca(e){if(e<.01)return`${Math.round(e*ha/1e3).toLocaleString("en-US")} km/s`;if(e<.99)return`${(e*100).toPrecision(2)}% of c`;const t=Math.min(12,Math.ceil(-Math.log10(1-e)));return`${(Math.floor(e*10**t)/10**(t-2)).toFixed(t-2)}% of c`}const es=new Intl.NumberFormat("en-US",{notation:"compact",maximumSignificantDigits:3});function fn(e){return e>=1e6?`${es.format(e)} t`:`${e>=100?Math.round(e).toLocaleString("en-US"):e.toPrecision(2)} t`}function ts(e,t){const n=pe-z.left-z.right,a=Oe-z.top-z.bottom,o=m=>z.left+m/e.shipTime*n,s=m=>z.top+a-m/Math.max(e.topSpeed,1e-12)*a,r=t.acceleration*Zo,i=24,l=Array.from({length:i+1},(m,f)=>e.burnTime*f/i).map(m=>[m,Math.tanh(r*m/ha)]),h=[...l.map(([m,f])=>[m,f]),...l.reverse().map(([m,f])=>[e.shipTime-m,f])].map(([m,f])=>`${o(m).toFixed(1)},${s(f).toFixed(1)}`).join(" "),d=e.coasts?`<text x="${((o(e.burnTime)+o(e.shipTime-e.burnTime))/2).toFixed(1)}" y="${(s(e.topSpeed)+14).toFixed(1)}" text-anchor="middle">engine off, ${le(e.coastTime)}</text>`:"";return`<svg class="trip" viewBox="0 0 ${pe} ${Oe}" role="img" aria-label="Speed against the ship's clock"><line class="grid" x1="${z.left}" x2="${pe-z.right}" y1="${s(0)}" y2="${s(0)}"/><line class="grid" x1="${z.left}" x2="${pe-z.right}" y1="${s(e.topSpeed)}" y2="${s(e.topSpeed)}"/><text x="${z.left}" y="${s(e.topSpeed)-3}">${ca(e.topSpeed)}</text><polyline class="line" points="${h}"/>${d}<text x="${z.left}" y="${Oe-6}">departure</text><text x="${pe-z.right}" y="${Oe-6}" text-anchor="end">arrival, ${le(e.shipTime)} on board</text></svg>`}function da(e,t){const n=xt.map(s=>({destination:s,trip:la(s.metres,e)})),a=n.map(({destination:s,trip:r})=>{const i=[s.name===t?"chosen":"",r.coasts?"coasts":""].filter(Boolean).join(" "),l=r.coasts?`all ${fn(e.fuel)}, then coasts`:fn(r.fuelBurnt);return`<tr${i?` class="${i}"`:""} data-destination="${s.name}"><th scope="row">${s.name}</th><td>${s.said}</td><td>${le(r.shipTime)}</td><td>${le(r.homeTime)}</td><td>${ca(r.topSpeed)}</td><td>${l}</td></tr>`}).join(""),o=n.find(({destination:s})=>s.name===t)??n[0];return`<figure class="rocket"><table class="voyages"><thead><tr><th>to</th><th>distance</th><th>on board</th><th>at home</th><th>top speed</th><th>fuel burnt</th></tr></thead><tbody>${a}</tbody></table>`+(o?`<h4>To ${o.destination.name}: speed against the ship's clock</h4>${ts(o.trip,e)}`:"")+"</figure>"}const Le=[{name:"Proxima Centauri",ra:14.495,dec:-62.68,lightYears:4.24},{name:"Alpha Centauri",ra:14.66,dec:-60.83,lightYears:4.37},{name:"Barnard's Star",ra:17.963,dec:4.69,lightYears:5.96},{name:"Wolf 359",ra:10.941,dec:7.01,lightYears:7.86},{name:"Lalande 21185",ra:11.056,dec:35.97,lightYears:8.31},{name:"Sirius",ra:6.752,dec:-16.72,lightYears:8.58},{name:"Luyten 726-8",ra:1.65,dec:-17.95,lightYears:8.73},{name:"Ross 154",ra:18.83,dec:-23.84,lightYears:9.69},{name:"Ross 248",ra:23.699,dec:44.18,lightYears:10.3},{name:"Epsilon Eridani",ra:3.549,dec:-9.46,lightYears:10.52},{name:"Lacaille 9352",ra:23.098,dec:-35.85,lightYears:10.72},{name:"Ross 128",ra:11.796,dec:.8,lightYears:11.01},{name:"EZ Aquarii",ra:22.643,dec:-15.3,lightYears:11.1},{name:"61 Cygni",ra:21.115,dec:38.75,lightYears:11.4},{name:"Procyon",ra:7.655,dec:5.22,lightYears:11.46},{name:"Struve 2398",ra:18.713,dec:59.63,lightYears:11.5},{name:"Groombridge 34",ra:.306,dec:44.02,lightYears:11.6},{name:"Epsilon Indi",ra:22.056,dec:-56.78,lightYears:11.87},{name:"Tau Ceti",ra:1.734,dec:-15.94,lightYears:11.91}];function De(e,t){const n=t.radius/t.reach;return e.map(({name:a,ra:o,dec:s,lightYears:r})=>{const i=o/24*2*Math.PI,l=s/180*Math.PI,c=r*Math.cos(l)*Math.cos(i),h=r*Math.cos(l)*Math.sin(i),d=r*Math.sin(l),m=h*Math.cos(t.yaw)-c*Math.sin(t.yaw),f=c*Math.cos(t.yaw)+h*Math.sin(t.yaw),u=d*Math.cos(t.pitch)-f*Math.sin(t.pitch),g=f*Math.cos(t.pitch)+d*Math.sin(t.pitch);return{name:a,x:m*n,y:-u*n,depth:g}})}const X=299792458,ns=9.81;function as(e,t,n){const a=t.acceleration*ns,o=d=>({distance:X*X/a*(Math.cosh(a*d/X)-1),homeTime:X/a*Math.sinh(a*d/X),speed:Math.tanh(a*d/X)}),s=o(e.burnTime),r=e.homeTime-2*s.homeTime,i=r*e.topSpeed*X,l=2*s.distance+i,c=Math.max(0,Math.min(n,e.shipTime));if(c<=e.burnTime){const d=o(c);return{along:d.distance/l,homeTime:d.homeTime,speed:d.speed}}if(c<=e.burnTime+e.coastTime){const d=(c-e.burnTime)/e.coastTime;return{along:(s.distance+d*i)/l,homeTime:s.homeTime+d*r,speed:e.topSpeed}}const h=o(e.shipTime-c);return{along:1-h.distance/l,homeTime:e.homeTime-h.homeTime,speed:h.speed}}const Re=12.5,gn=9,wn=1.5,os=new Set(["Alpha Centauri"]),q={ground:"#06080f",ring:"rgba(127,166,234,0.22)",stem:"rgba(127,166,234,0.18)",star:"#dfe7f5",dim:"#7d8aa3",sun:"#ffd98a",way:"#ff9d6e",ship:"#ffffff"};function ss(e,t,n){const a=e.getContext("2d");if(!a)return()=>{};const o=a,s=window.matchMedia("(prefers-reduced-motion: reduce)").matches,r=new Set(xt.map(({name:k})=>k));let i={yaw:.6,pitch:.45,radius:1,reach:Re},l=0,c=performance.now(),h=null,d=[];const m=()=>({x:e.clientWidth/2,y:e.clientHeight/2});function f(k){const w=e.clientWidth,S=e.clientHeight,M=window.devicePixelRatio||1;e.width!==Math.round(w*M)&&(e.width=Math.round(w*M),e.height=Math.round(S*M)),o.setTransform(M,0,0,M,0,0),o.fillStyle=q.ground,o.fillRect(0,0,w,S),!s&&!h&&(i={...i,yaw:i.yaw+.0015}),i={...i,radius:Math.min(w,S)*.47};const A=m(),$=T=>({x:A.x+T.x,y:A.y+T.y});o.font="11px ui-monospace, Menlo, monospace";for(const T of[5,10]){const D=De(Array.from({length:73},(j,N)=>({name:"",ra:N/72*24,dec:0,lightYears:T})),i);o.beginPath(),D.forEach((j,N)=>N?o.lineTo($(j).x,$(j).y):o.moveTo($(j).x,$(j).y)),o.strokeStyle=q.ring,o.stroke();const R=$(D[0]??{x:0,y:0});o.fillStyle=q.dim,o.fillText(`${T} ly`,R.x+4,R.y-3)}const{ship:C,chosen:P}=t(),L=xt.find(({name:T})=>T===P),I=Le.find(({name:T})=>T===P),x=L?la(L.metres,C):null;d=De(Le,i);const O=De(Le.map(T=>({...T,lightYears:T.lightYears*Math.cos(T.dec/180*Math.PI),dec:0})),i),b=d.map((T,D)=>D).sort((T,D)=>(d[T]?.depth??0)-(d[D]?.depth??0));for(const T of b){const D=$(d[T]??{x:0,y:0}),R=$(O[T]??{x:0,y:0}),j=d[T]?.name??"",N=((d[T]?.depth??0)+Re)/(2*Re);o.strokeStyle=q.stem,o.beginPath(),o.moveTo(D.x,D.y),o.lineTo(R.x,R.y),o.stroke(),o.fillStyle=j===P?q.way:q.star,o.globalAlpha=.45+.55*N,o.beginPath(),o.arc(D.x,D.y,1.6+1.8*N,0,2*Math.PI),o.fill(),r.has(j)&&(o.strokeStyle=j===P?q.way:q.dim,o.beginPath(),o.arc(D.x,D.y,7,0,2*Math.PI),o.stroke()),o.fillStyle=j===P?q.way:q.dim,os.has(j)||o.fillText(j,D.x+10,D.y+4),o.globalAlpha=1}if(o.fillStyle=q.sun,o.beginPath(),o.arc(A.x,A.y,4,0,2*Math.PI),o.fill(),o.fillText("the Sun",A.x+8,A.y-6),x&&L){const T=L.towards?De([{name:"",...L.towards,lightYears:Re*1.15}],i)[0]:null,D=I?d[Le.indexOf(I)]:T,R=(k-c)/1e3%(gn+2*wn),j=s?.5:Math.min(1,Math.max(0,(R-wn)/gn)),N=as(x,C,j*x.shipTime);if(D){const K=$(D);o.strokeStyle=q.way,o.setLineDash(I?[]:[4,4]),o.beginPath(),o.moveTo(A.x,A.y),o.lineTo(K.x,K.y),o.stroke(),o.setLineDash([]);const ce={x:A.x+(K.x-A.x)*N.along,y:A.y+(K.y-A.y)*N.along};o.fillStyle=q.ship,o.beginPath(),o.arc(ce.x,ce.y,3,0,2*Math.PI),o.fill(),I||o.fillText(`to ${L.name}, ${L.said}: not to scale`,12,S-34)}else o.fillStyle=q.dim,o.fillText(`${L.name} is inside the dot: the planets are a thousandth of a light-year away`,12,S-34);o.fillStyle=q.star,o.font="13px ui-monospace, Menlo, monospace",o.fillText(`on board ${le(j*x.shipTime)}`,12,22),o.fillText(`at home  ${le(N.homeTime)}`,12,40),o.fillStyle=q.dim,o.fillText(`${(N.speed*100).toFixed(N.speed>.99?4:1)}% of c`,12,58),o.fillText("drag to turn",w-96,S-14)}l=s&&!h?0:requestAnimationFrame(f)}const u=k=>{const w=e.getBoundingClientRect();return{x:k.clientX-w.left,y:k.clientY-w.top}},g=k=>{h=u(k),e.setPointerCapture(k.pointerId),l||(l=requestAnimationFrame(f))},v=k=>{if(!h)return;const w=u(k);i={...i,yaw:i.yaw+(w.x-h.x)*.01,pitch:Math.max(-1.4,Math.min(1.4,i.pitch+(w.y-h.y)*.01))},h=w},y=k=>{const w=u(k),S=m(),M=d.find(A=>r.has(A.name)&&Math.hypot(S.x+A.x-w.x,S.y+A.y-w.y)<12);h=null,M&&(c=performance.now(),n(M.name))};return e.addEventListener("pointerdown",g),e.addEventListener("pointermove",v),e.addEventListener("pointerup",y),l=requestAnimationFrame(f),()=>{cancelAnimationFrame(l),e.removeEventListener("pointerdown",g),e.removeEventListener("pointermove",v),e.removeEventListener("pointerup",y)}}const Ne=e=>e,rs=new Intl.NumberFormat("en-US",{notation:"compact",maximumSignificantDigits:2}),is=[{key:"acceleration",label:"Acceleration",min:.05,max:3,step:.05,toSlider:Ne,fromSlider:Ne,show:e=>`${e.toFixed(2)} g`},{key:"fuel",label:"Fuel",min:-1,max:13,step:.05,toSlider:e=>Math.log10(e/ke.dryMass),fromSlider:e=>ke.dryMass*10**e,show:e=>`${rs.format(e/ke.dryMass)} × the ship`},{key:"exhaust",label:"Exhaust speed",min:.01,max:1,step:.01,toSlider:Ne,fromSlider:Ne,show:e=>`${Math.round(e*100)}% of c`}];function ls(e){let t=ke,n="Proxima Centauri";const a=p("div"),o=()=>{a.innerHTML=da(t,n)},s=p("div",{class:"dials"},...is.map(i=>{const l=p("output",{},i.show(t[i.key])),c=p("input",{type:"range",min:i.min,max:i.max,step:i.step,value:i.toSlider(t[i.key]),oninput:()=>{t={...t,[i.key]:i.fromSlider(Number(c.value))},l.textContent=i.show(t[i.key]),o()}});return p("label",{},`${i.label}: `,l,c)}));a.addEventListener("click",i=>{const l=i.target?.closest("[data-destination]")?.getAttribute("data-destination");l&&(n=l,o())});const r=p("canvas",{class:"starmap","aria-label":"The stars within twelve light-years of the Sun, turning, with the ship flying the chosen trip"});return e.replaceChildren(r,s,a),o(),ss(r,()=>({ship:t,chosen:n}),i=>{n=i,o()})}const hs=()=>da(ke,"Proxima Centauri"),cs={name:"rocket",apps:{rocket:ls},stills:{rocket:hs}};class ds{listeners=new Set;send(t){for(const n of[...this.listeners])n(t)}on(t){return this.listeners.add(t),()=>{this.listeners.delete(t)}}}const $t=new ds,us=900,ms=480,Fe={x:1600,y:1e3};function Be(e,t){return(e%t+t)%t}class ps{x=0;y=0;written="";driving=!1;follow({byRadians:t,tiltedBy:n,seconds:a}){const o=document.documentElement;if(o.dataset.sky!=="stars")return;this.driving||this.takeOver(o);const s=us/(Math.PI*2),r=(a/ms*Math.PI*2+t)*s;this.x=Be(this.x+r,Fe.x),this.y=Be(this.y-n*s,Fe.y);const i=`${(Math.round(this.x*2)/2).toFixed(1)}px ${(Math.round(this.y*2)/2).toFixed(1)}px`;if(i===this.written)return;this.written=i;const[l,c]=i.split(" ");o.style.setProperty("--sky-x",l??"0px"),o.style.setProperty("--sky-y",c??"0px")}release(){const t=document.documentElement;t.classList.remove("sky-driven"),t.style.removeProperty("--sky-x"),t.style.removeProperty("--sky-y"),this.x=0,this.y=0,this.written="",this.driving=!1}takeOver(t){const n=getComputedStyle(document.body,"::before").transform;if(n&&n!=="none")try{const a=new DOMMatrixReadOnly(n);this.x=Be(a.m41,Fe.x),this.y=Be(a.m42,Fe.y)}catch{}t.classList.add("sky-driven"),this.driving=!0}}function fs(e){return $t.on(t=>e.follow(t))}const yn=new ps,gs={name:"sky",install:()=>fs(yn),arrive:()=>yn.release()},lt=20;function ws(e){const{baseTime:t,shortcutFactor:n,interestRate:a,timeHorizon:o}=e,s=[];let r=null;const i=t;let l=t*(1-n),c=0,h=0,d=0,m=0,f=0,u=0;for(let g=0;g<o*lt;){for(;f<=g;)c+=1,d+=1,f+=i;for(;u<=g;)h+=1,m+=1,u+=l,l*=1+a;if(g+=1,g%lt===0){const v=g/lt;s.push({month:v,cleanCumulative:c,debtCumulative:h,cleanMonthly:d,debtMonthly:m,debtFeatureCost:l}),d=0,m=0,r===null&&c>h&&(r=v)}}return{months:s,breakEvenMonth:r}}const ys=[{key:"baseTime",label:"Base time",min:1,max:30,step:1,show:e=>`${e} days`},{key:"shortcutFactor",label:"Shortcuts",min:0,max:.9,step:.05,show:e=>`${Math.round(e*100)}%`},{key:"interestRate",label:"Interest",min:0,max:1,step:.01,show:e=>`${Math.round(e*100)}%`},{key:"timeHorizon",label:"Timeline",min:6,max:60,step:1,show:e=>`${e} months`}];function bs(e){const t={baseTime:20,shortcutFactor:.25,interestRate:.1,timeHorizon:24},n=p("div",{class:"figures"}),a=p("div",{class:"chart"}),o=p("div",{class:"chart"}),s=p("p"),r=p("div",{class:"dials"},...ys.map(l=>{const c=p("output",{},l.show(t[l.key])),h=p("input",{type:"range",min:l.min,max:l.max,step:l.step,value:t[l.key],oninput:()=>{t[l.key]=Number(h.value),c.textContent=l.show(t[l.key]),i()}});return p("label",{},`${l.label}: `,c,h)}));function i(){const{months:l,breakEvenMonth:c}=ws(t),h=l[l.length-1],d=h?.cleanCumulative??0,m=h?.debtCumulative??0,f=d>0?(d-m)/d*100:0,u=Math.abs(f)<.1?"Even":f>0?"Loss":"Gain",g=Math.abs(f)<.1?"≈0%":`${Math.abs(f).toFixed(1)}%`;n.replaceChildren(p("div",{class:"clean"},p("strong",{},String(d)),"clean features"),p("div",{class:"debt"},p("strong",{},String(m)),"debt features"),p("div",{},p("strong",{},c?`month ${c}`:"never"),"break-even"),p("div",{},p("strong",{},g),`${u.toLowerCase()} on the shortcut road`)),a.innerHTML=ko([{name:"Clean",className:"clean",values:l.map(v=>v.cleanCumulative)},{name:"Debt-driven",className:"debt",values:l.map(v=>v.debtCumulative)}],{x:"Months",y:"Features"}),a.prepend(p("h4",{},"Cumulative features")),o.innerHTML=aa([{name:"Clean",className:"clean",values:l.slice(1).map(v=>v.cleanMonthly)},{name:"Debt-driven",className:"debt",values:l.slice(1).map(v=>v.debtMonthly)}],{x:"Months",y:"Features a month"}),o.prepend(p("h4",{},"Monthly delivery rate")),s.textContent=t.interestRate===0?"With no interest there is no compound slowdown, and the shortcut simply wins. That is the one case that does not happen to real code.":c?`${Math.round(t.shortcutFactor*100)}% saved at first, ${Math.round(t.interestRate*100)}% interest on every feature: clean development overtakes at month ${c}, and by month ${t.timeHorizon} the shortcut road has delivered ${g} less.`:`${Math.round(t.shortcutFactor*100)}% saved at first, ${Math.round(t.interestRate*100)}% interest on every feature: in ${t.timeHorizon} months the clean road has not yet caught up. Give it longer, or raise the interest.`}e.append(r,n,p("div",{class:"charts"},a,o),s),i()}const vs={name:"technical-debt",apps:{"technical-debt":bs}},ks="theme";function ua(){const e=document.documentElement,t=e.dataset.pageTheme;let n=null;try{n=localStorage.getItem(ks)}catch{n=null}const a=t??(n==="light"||n==="dark"?n:null);a?e.dataset.theme=a:delete e.dataset.theme}const Tt="theme";function xs(){return window.matchMedia("(prefers-color-scheme: dark)").matches}function $s(){let e=null;try{e=localStorage.getItem(Tt)}catch{e=document.documentElement.dataset.theme??null}return e==="light"||e==="dark"?e:xs()?"dark":"light"}class Ts{apply(t){const n=t==="toggle"?$s()==="dark"?"light":"dark":t;try{n==="system"?localStorage.removeItem(Tt):localStorage.setItem(Tt,n)}catch{}return ua(),n}}function Ss(e){const t=document.querySelector(".theme-toggle");return t?(t.classList.add("ready"),t.removeAttribute("aria-hidden"),t.removeAttribute("tabindex"),t.addEventListener("click",e),()=>t.removeEventListener("click",e)):()=>{}}const St=["light","dark","system"];function Ms(e){return St.includes(e)}const As={light:"☀︎",dark:"☾︎",system:"◐︎"};function bn(e){const t=n=>`${As[n]} ${n}`;return{text:`theme   ${St.map(n=>n===e?`[${t(n)}]`:t(n)).join("   ")}`,html:`<pre class="choices">theme   ${St.map(n=>n===e?`<strong aria-current="true">${t(n)}</strong>`:`<a href="#" data-run="theme ${n}" title="theme ${n}">${t(n)}</a>`).join("   ")}</pre>`}}function Is(e){return{name:"theme",usage:"theme [light|dark|system|auto]",description:"switch the colours, or toggle them",run({site:t,cwd:n},[a]){const o=t.at(n)?.fields.theme;if(o)return{text:`theme: this page keeps its own, ${o}. It works everywhere else.`,error:!0};if(a===void 0)return bn(e.apply("toggle"));const s=a==="auto"?"system":a;return Ms(s)?bn(e.apply(s)):{text:`theme: ${a}: choose light, dark or system`,error:!0}}}}const Es={name:"theme",commands:[Is(new Ts)],install:e=>Ss(()=>e.run("theme")),arrive:()=>ua()},Cs={small:"Intel Atom 330, 2 cores, 8 W · NVIDIA 9400M, 16 cores, 10 W",large:"Intel i7 950, 4 cores, 130 W · NVIDIA GT 430, 96 cores, 49 W"},vn=[{machine:"small",algorithm:"pairs",vertices:8,graphs:150,serial:42.43,openmp:14.34,cuda:2.572},{machine:"small",algorithm:"pairs",vertices:16,graphs:150,serial:738.92,openmp:247.95,cuda:33.06},{machine:"small",algorithm:"pairs",vertices:24,graphs:150,serial:4387.13,openmp:1208.97,cuda:109.093},{machine:"large",algorithm:"pairs",vertices:8,graphs:150,serial:7.483,openmp:1.511,cuda:.653},{machine:"large",algorithm:"pairs",vertices:16,graphs:150,serial:135.505,openmp:25.061,cuda:5.24},{machine:"large",algorithm:"pairs",vertices:24,graphs:150,serial:515.757,openmp:126.228,cuda:18.99},{machine:"small",algorithm:"common-labelling",vertices:8,graphs:50,serial:843.21,openmp:214.51,cuda:33.404},{machine:"small",algorithm:"common-labelling",vertices:16,graphs:50,serial:17061.4,openmp:4284.01,cuda:550.153},{machine:"small",algorithm:"common-labelling",vertices:24,graphs:50,serial:71670.13,openmp:20274.32,cuda:2332.076}],js={pairs:e=>`Matching every pair of ${e} graphs`,"common-labelling":e=>`Finding one labelling common to ${e} graphs`};function ht(e){if(e<10)return`${e.toFixed(1)} s`;if(e<60)return`${Math.round(e)} s`;const t=Math.floor(e/60);return t<60?t<10?`${t} min ${Math.round(e-t*60)} s`:`${Math.round(e/60)} min`:`${Math.floor(t/60)} h ${t%60} min`}const Ps=e=>`×${e>=10?Math.round(e):e.toFixed(1)}`;function kn(e){const t=Math.max(...e.map(o=>o.serial/o.cuda)),n=(o,s)=>`<span class="bar ${s}" style="--p:${(o/t).toFixed(3)}"></span><span class="factor">${Ps(o)}</span>`;return`<figure class="runs"><table class="runs"><thead><tr><th>each graph has</th><th>one thread</th><th>OpenMP, every core</th><th>CUDA, the graphics card</th></tr></thead>${[...new Set(e.map(o=>`${o.algorithm}/${o.machine}`))].map(o=>{const s=e.filter(c=>`${c.algorithm}/${c.machine}`===o),{algorithm:r,machine:i}=s[0],l=s.map(c=>`<tr><th scope="row">${c.vertices} vertices</th><td>${ht(c.serial)}</td><td>${ht(c.openmp)}<div class="speedup">${n(c.serial/c.openmp,"openmp")}</div></td><td>${ht(c.cuda)}<div class="speedup">${n(c.serial/c.cuda,"cuda")}</div></td></tr>`).join("");return`<tbody><tr class="group"><th colspan="4">${js[r](s[0]?.graphs??0)}<span>${Cs[i]}</span></th></tr>${l}</tbody>`}).join("")}</table><figcaption>Measured in 2011, on graphs of the GREC dataset. Each bar is how many times faster than one thread of the same machine, and all the bars are on one scale.</figcaption></figure>`}const Os={name:"thesis-results",stills:{"graph-matching-runs":()=>kn(vn)},apps:{"graph-matching-runs":e=>{e.firstChild||(e.innerHTML=kn(vn))}}},Mt={variable:"tn",atLeast:!0,threshold:20,months:[0,1,2,3,4,5,6,7,8,9,10,11]};function Ls(e,t){const n=e.map(({value:u})=>u),a=Math.floor(Math.min(...n,...(t.spans??[]).map(({value:u})=>u))),o=Math.ceil(Math.max(...n,a+1)),s=Qn(e.map(({year:u})=>u),a,o),{x:r,y:i,slot:l}=s,c=u=>r(u)+l/2,h=[];for(const u of e){const g=h[h.length-1];g&&g[g.length-1]?.year===u.year-1?g.push(u):h.push([u])}const d=h.map(u=>`<polyline class="line" points="${u.map(({year:g,value:v})=>`${F(c(g))},${F(i(v))}`).join(" ")}"/>`).join(""),m=e.map(({year:u,value:g,title:v,partial:y})=>`<circle class="dot${y?" partial":""}" cx="${F(c(u))}" cy="${F(i(g))}" r="3.5"><title>${v}</title></circle>`).join(""),f=s.levels(t.spans??[]);return s.wrap(t.label,`${d}${m}${f}`)}function Ds(e,{threshold:t,atLeast:n},a){if(!e)return 0;const[o=0,...s]=e;return s.reduce((r,i,l)=>o+l*a>=t-1e-9===n?r+i:r,0)}const he={tn:{code:1002,unit:"°C",name:"daily minimum",summary:"mean",bin:.5,range:[-30,35]},tx:{code:1001,unit:"°C",name:"daily maximum",summary:"mean",bin:.5,range:[-25,50]},pp:{code:1300,unit:"mm",name:"daily rain",summary:"sum",bin:.5,range:[0,250]},pi:{code:1303,unit:"mm/h",name:"most rain in one hour",summary:"max",bin:.5,range:[0,100]}},Rs=.95,Ns=(e,t)=>new Date(Date.UTC(e,t+1,0)).getUTCDate(),V=e=>e.reduce((t,n)=>t+n,0);function Fs(e,t){return e.length===0?null:t==="sum"?V(e.map(({figure:n})=>n)):t==="max"?Math.max(...e.map(({figure:n})=>n)):V(e.map(({figure:n,weight:a})=>n*a))/V(e.map(({weight:n})=>n))}function Bs(e,t){const n=he[t.variable];return Object.entries(e.years).flatMap(([a,o])=>{const s=o[t.variable];if(!s)return[];const r=Number(a),i=s.months.map(u=>({days:Ds(u,t,n.bin),measured:V(u?.slice(1)??[])})),l=u=>t.months.includes(u),c=V(i.filter((u,g)=>l(g)).map(u=>u.measured)),h=V(t.months.map(u=>Ns(r,u))),d=V(i.filter((u,g)=>l(g)).map(u=>u.days)),m=s.summaries.flatMap((u,g)=>l(g)&&u!==null?[{figure:u,weight:i[g]?.measured??0}]:[]),f=Fs(m,n.summary);return[{year:r,days:d,elsewhere:V(i.map(u=>u.days))-d,measured:c,expected:h,whole:c/h>=Rs,summary:f,months:i}]}).sort((a,o)=>a.year-o.year)}const xn=["January","February","March","April","May","June","July","August","September","October","November","December"];function $n(e){const{name:t,unit:n}=he[e.variable],a=e.variable==="pi"?"":"a ",o=e.atLeast?`of ${e.threshold} ${n} or more`:`below ${e.threshold} ${n}`,s=xn[e.months[0]??0],r=xn[e.months[e.months.length-1]??11],i=e.months.length===12?"whole year":`${s} to ${r}`;return`days with ${a}${t} ${o}, ${i}`}const ma=["January","February","March","April","May","June","July","August","September","October","November","December"],Ws=.55;function qs(e,t,{days:n,measured:a}){const o=`${ma[t]} ${e}`;if(a===0)return`<td class="none" title="${o}: not measured"></td>`;const s=Math.round(n/a*1e3)/1e3;return`<td${s>=Ws?' class="deep"':""} style="--v:${s}" title="${o}: ${n} of ${a} days">${n||""}</td>`}function Hs(e,t){const n=`<tr><th></th>${ma.map(o=>`<th scope="col">${o.slice(0,3)}</th>`).join("")}</tr>`,a=[...e].reverse().map(({year:o,months:s})=>`<tr><th scope="row">${o}</th>${s.map((r,i)=>qs(o,i,r)).join("")}</tr>`);return`<table class="heat calendar${t?" warm":""}"><thead>${n}</thead><tbody>${a.join("")}</tbody></table>`}const Tn=e=>e.reduce((t,n)=>t+n,0)/e.length;function Sn(e){const t=e.flatMap(({summary:n})=>n===null?[]:[n]);return{from:e[0]?.year??0,to:e[e.length-1]?.year??0,years:e.length,days:Tn(e.map(({days:n})=>n)),summary:t.length?Tn(t):null}}function zs(e){const t=e.filter(a=>a.whole);if(t.length<4)return null;const n=Math.floor(t.length/2);return[Sn(t.slice(0,n)),Sn(t.slice(n))]}const Gs=["January","February","March","April","May","June","July","August","September","October","November","December"],_s={mean:"The mean",sum:"The total",max:"The highest"},ve=e=>String(Math.round(e*10)/10),Js=e=>`${e>0?"+":e<0?"−":""}${ve(Math.abs(e))}`,Us=e=>`${Number(e.slice(8,10))} ${Gs[Number(e.slice(5,7))-1]} ${e.slice(0,4)}`;function Ys(e,t){const{unit:n,name:a}=he[t.variable],o=Object.values(e.years).flatMap(i=>i[t.variable]?[i[t.variable].record]:[]),[s,r]=t.atLeast?o.map(([i,l])=>[i,l]).reduce((i,l)=>l[0]>i[0]?l:i):o.map(([,,i,l])=>[i,l]).reduce((i,l)=>l[0]<i[0]?l:i);return`<p class="record">The ${t.atLeast?"highest":"lowest"} ${a} on record here: ${s} ${n} on ${Us(r)}, whatever months are chosen.</p>`}function pa(e,t){const n=he[t.variable],a=`<figcaption><strong>${e.name}</strong> · ${e.altitude} m, ${e.setting} · ${$n(t)}</figcaption>`,o=Bs(e,t);if(o.length===0)return`<figure class="weather">${a}<p>This station has no ${n.name} on record.</p></figure>`;const s=zs(o),r=({from:u,to:g})=>`${u}–${g}`,i=s?'<div class="figures">'+s.map(u=>`<div><strong>${ve(u.days)}</strong>days a year, ${r(u)}</div>`).join("")+`<div><strong>${Js(s[1].days-s[0].days)}</strong>days a year, from one half to the other</div></div>`:"",l=o.map(({year:u,days:g,elsewhere:v,measured:y,expected:k,whole:w})=>{const S=v>0?`, and ${v} more outside the months chosen`:"",M=w?"":`, with only ${y} of ${k} days measured`;return{year:u,value:g,partial:!w,title:`${u}: ${g} days${M}${S}`}}),c=(s??[]).map(u=>({from:u.from,to:u.to,value:u.days,label:`${ve(u.days)} a year`})),h=o.flatMap(({year:u,summary:g,whole:v})=>g===null||!v?[]:[{year:u,value:g,title:`${u}: ${ve(g)} ${n.unit}`}]),d=(s??[]).flatMap(u=>u.summary===null?[]:[{from:u.from,to:u.to,value:u.summary,label:`${ve(u.summary)} ${n.unit}`}]),m=`${_s[n.summary]} ${n.name} of each year, ${n.unit}`,f=(n.summary==="mean"?Ls:bt)(h,{label:m,spans:d});return`<figure class="weather">${a}${i}<h4>Days a year</h4>${bt(l,{label:`Days a year: ${$n(t)}`,spans:c})}<h4>When in the year they fell</h4>${Hs(o,t.atLeast&&n.unit==="°C")}<h4>${m}, in the months chosen</h4>${f}`+Ys(e,t)+"</figure>"}const Mn=[{id:"tropical-nights",name:"tropical nights",variable:"tn",atLeast:!0,threshold:20},{id:"torrid-nights",name:"torrid nights",variable:"tn",atLeast:!0,threshold:25},{id:"hot-days",name:"hot days",variable:"tx",atLeast:!0,threshold:30},{id:"torrid-days",name:"torrid days",variable:"tx",atLeast:!0,threshold:35},{id:"frost-days",name:"frost days",variable:"tn",atLeast:!1,threshold:0},{id:"rainy-days",name:"rainy days",variable:"pp",atLeast:!0,threshold:1},{id:"heavy-rain",name:"days of heavy rain",variable:"pp",atLeast:!0,threshold:20},{id:"downpours",name:"days with a downpour",variable:"pi",atLeast:!0,threshold:10}],se=[{code:"WU",name:"Badalona - Museu",municipality:"Badalona",altitude:42,setting:"urban, by the sea"},{code:"X4",name:"Barcelona - el Raval",municipality:"Barcelona",altitude:33,setting:"dense city, on a roof"},{code:"X8",name:"Barcelona - Zona Universitària",municipality:"Barcelona",altitude:82,setting:"city edge"},{code:"D5",name:"Barcelona - Observatori Fabra",municipality:"Barcelona",altitude:410,setting:"wooded hill above the city"},{code:"UP",name:"Cabrils",municipality:"Cabrils",altitude:81,setting:"coastal slope, half rural"},{code:"XF",name:"Sabadell - Parc Agrari",municipality:"Sabadell",altitude:259,setting:"farmland beside a city"},{code:"XJ",name:"Girona",municipality:"Girona",altitude:72,setting:"market gardens by the city"},{code:"XE",name:"Tarragona - Complex Educatiu",municipality:"Tarragona",altitude:6,setting:"coast"},{code:"VK",name:"Raimat",municipality:"Lleida",altitude:286,setting:"inland plain, vineyards"}],An=[["whole year",[0,1,2,3,4,5,6,7,8,9,10,11]],["June to August",[5,6,7]],["May to October",[4,5,6,7,8,9]],["December to February",[0,1,11]]],Ks={tn:[-10,30],tx:[0,45],pp:[.5,100],pi:[.5,60]};function Vs(e){const t=new Map,n=jt(e,"/data/weather/index.json"),a=p("div");a.append(...e.querySelectorAll("figure"));let o=null,s=Mt,r=!1;const i=(y,k)=>p("option",{value:y},k),l=p("select",{onchange:()=>{g(l.value)}},...se.map(({code:y,name:k})=>i(y,k))),c=p("select",{onchange:()=>{const y=Mn.find(({id:k})=>k===c.value);y&&u({variable:y.variable,atLeast:y.atLeast,threshold:y.threshold})}},...Mn.map(({id:y,name:k})=>i(y,k))),h=p("select",{onchange:()=>u({months:An[Number(h.value)]?.[1]??Mt.months})},...An.map(([y],k)=>i(k,y))),d=p("output"),m=p("input",{type:"range",step:.5,oninput:()=>u({threshold:Number(m.value)})});function f(){const[y,k]=Ks[s.variable];m.min=String(y),m.max=String(k),m.value=String(s.threshold),d.textContent=`${s.atLeast?"":"below "}${s.threshold} ${he[s.variable].unit}${s.atLeast?" or more":""}`,o&&(a.innerHTML=pa(o,s))}function u(y){s={...s,...y},f()}async function g(y){const k=t.get(y)??fetch(`/data/weather/${y}.json`).then(w=>w.json());t.set(y,k);try{const w=await k;if(r||l.value!==y)return;o=w,f()}catch{t.delete(y),a.replaceChildren(p("p",{},"The measurements for this station did not arrive. The rest of the page does not depend on them."))}}const v=p("div",{class:"dials"},p("label",{},"Station",l),p("label",{},"Counting",c),p("label",{},"Threshold: ",d,m),p("label",{},"Months",h));return e.replaceChildren(v,a,n),g(l.value),()=>{r=!0}}function Xs(e,t,[n,a]){if(e.length===0)return null;const o=Math.round((a-n)/t),s=new Map;for(const c of e){const h=Math.min(o-1,Math.max(0,Math.floor((c-n)/t+1e-9)));s.set(h,(s.get(h)??0)+1)}const r=Math.min(...s.keys()),i=Math.max(...s.keys());return[Math.round((n+r*t)*1e3)/1e3,...Array.from({length:i-r+1},(c,h)=>s.get(r+h)??0)]}const In="7bvh-jvq2",fa=5e4,En=Object.entries(he),Qs="No representatiu",Zs=["Representatiu",""],er=(e,t)=>Math.round(e*10**t)/10**t;function tr(e,t){if(e.length===0)return null;if(t==="max")return Math.max(...e);const n=e.reduce((a,o)=>a+o,0);return er(t==="sum"?n:n/e.length,2)}function nr(e,t){const n=Array.from({length:12},(s,r)=>e.filter(({date:i})=>Number(i.slice(5,7))===r+1).map(({value:i})=>i)),a=e.reduce((s,r)=>r.value>s.value?r:s),o=e.reduce((s,r)=>r.value<s.value?r:s);return{months:n.map(s=>Xs(s,t.bin,t.range)),summaries:n.map(s=>tr(s,t.summary)),record:[a.value,a.date,o.value,o.date]}}function ar(e){if(!Array.isArray(e))throw new Error("the portal did not answer with rows");if(e.length>=fa)throw new Error("the answer was cut short at the limit");const t=e;if(!t.some(o=>o.data_lectura?.slice(5,7)==="12"))throw new Error("the year does not reach December yet");const n=new Map,a=new Set;for(const o of t){const s=o.estat??"";if(s===Qs)continue;if(!Zs.includes(s))throw new Error(`the network marks days as "${s}", which nobody has decided how to read`);const r=o.data_lectura?.slice(0,10)??"",i=`${o.codi_estacio}/${o.codi_variable}`;if(a.has(`${i}/${r}`))throw new Error(`${i} has ${r} twice`);a.add(`${i}/${r}`);const l=Number(o.valor);Number.isFinite(l)&&n.set(i,[...n.get(i)??[],{date:r,value:l}])}return n}const or={name:"weather",directory:"public/data/weather",firstYear:1988,files:se.map(e=>`${e.code}.json`),about:{measures:"daily minimum and maximum temperature, daily rain, most rain in one hour",network:"Xarxa d'Estacions Meteorològiques Automàtiques (XEMA)",attribution:"Servei Meteorològic de Catalunya (XEMA). Dades obertes de la Generalitat de Catalunya.",dataset:`https://analisi.transparenciacatalunya.cat/d/${In}`,stations:se},requestsFor(e){const t=se.map(a=>`'${a.code}'`).join(","),n=En.map(([,a])=>a.code).join(",");return[ea(In,{select:"codi_estacio,codi_variable,data_lectura,valor,estat",where:`codi_estacio in (${t}) and codi_variable in (${n}) and data_lectura between '${e}-01-01T00:00:00' and '${e}-12-31T23:59:59'`,limit:fa})]},withYear(e,t,n){const a=ar(n[0]);return Object.fromEntries(se.map(o=>{const s=`${o.code}.json`,r=En.flatMap(([c,h])=>{const d=a.get(`${o.code}/${h.code}`);return d?[[c,nr(d,h)]]:[]}),i=Object.fromEntries(r),l={...e[s]?.years,...r.length?{[t]:i}:{}};return[s,{...o,years:l}]}))}},sr=e=>{const t=JSON.parse(e(`/data/weather/${se[0]?.code}.json`)),n=JSON.parse(e("/data/weather/index.json"));return pa(t,Mt)+Je(n)},rr={name:"weather",apps:{weather:Vs},stills:{weather:sr},sources:[or]},Lt="header-world";function ga(){try{const e=localStorage.getItem(Lt);if(!e)return null;const t=JSON.parse(e);return[t.seed,t.levels,t.roughness,t.share].every(a=>typeof a=="number"&&Number.isFinite(a))?t:null}catch{return null}}function ir(e){try{localStorage.setItem(Lt,JSON.stringify(e))}catch{}}function lr(){try{localStorage.removeItem(Lt)}catch{}}const _=(1+Math.sqrt(5))/2,hr=[[-1,_,0],[1,_,0],[-1,-_,0],[1,-_,0],[0,-1,_],[0,1,_],[0,-1,-_],[0,1,-_],[_,0,-1],[_,0,1],[-_,0,-1],[-_,0,1]],cr=[[0,11,5],[0,5,1],[0,1,7],[0,7,10],[0,10,11],[1,5,9],[5,11,4],[11,10,2],[10,7,6],[7,1,8],[3,9,4],[3,4,2],[3,2,6],[3,6,8],[3,8,9],[4,9,5],[2,4,11],[6,2,10],[8,6,7],[9,8,1]];function dr(){const e=hr.map(([t,n,a])=>{const o=Math.hypot(t,n,a);return{direction:[t/o,n/o,a/o],radius:1,surface:0}});return wa(e,cr.map(t=>[...t]))}const ur=(e,t)=>(e+t)/2;function mr(e,t,n=ur){const a=Array.from({length:e.vertexCount},(i,l)=>({direction:[e.directions[l*3]??0,e.directions[l*3+1]??0,e.directions[l*3+2]??0],radius:e.radii[l]??1,surface:e.surface[l]??0})),o=new Map,s=(i,l)=>{const c=i<l?`${i}:${l}`:`${l}:${i}`,h=o.get(c);if(h!==void 0)return h;const d=a[i],m=a[l],[f,u,g]=d.direction,[v,y,k]=m.direction,w=Math.hypot(f*d.radius-v*m.radius,u*d.radius-y*m.radius,g*d.radius-k*m.radius),[S,M,A]=[(f+v)/2,(u+y)/2,(g+k)/2],$=Math.hypot(S,M,A)||1,C=n(d.surface,m.surface);a.push({direction:[S/$,M/$,A/$],radius:(d.radius+m.radius)/2+t(w),surface:C});const P=a.length-1;return o.set(c,P),P},r=[];for(let i=0;i<e.faceCount;i+=1){const l=e.faces[i*3],c=e.faces[i*3+1],h=e.faces[i*3+2],d=s(l,c),m=s(c,h),f=s(h,l);r.push([l,d,f],[c,m,d],[h,f,m],[d,m,f])}return wa(a,r)}function wa(e,t){const n=new Float32Array(e.length*3),a=new Float32Array(e.length),o=new Float32Array(e.length);e.forEach((r,i)=>{n[i*3]=r.direction[0],n[i*3+1]=r.direction[1],n[i*3+2]=r.direction[2],a[i]=r.radius,o[i]=r.surface});const s=new Uint32Array(t.length*3);return t.forEach(([r,i,l],c)=>{s[c*3]=r,s[c*3+1]=i,s[c*3+2]=l}),{directions:n,radii:a,surface:o,faces:s,faceCount:t.length,vertexCount:e.length}}function pr(e){let t=e>>>0;return()=>{t=t+1831565813>>>0;let n=Math.imul(t^t>>>15,1|t);return n=n+Math.imul(n^n>>>7,61|n)^n,((n^n>>>14)>>>0)/4294967296}}function fr(e){const t=dr();return{seed:e,mesh:t,temperature:new Float32Array(t.vertexCount),faceColour:new Uint8ClampedArray(t.faceCount*3),seaRadius:0}}function gr(e,t){return{...e,mesh:t,temperature:new Float32Array(t.vertexCount),faceColour:new Uint8ClampedArray(t.faceCount*3)}}function wr(e,t){return Math.abs(e.mesh.directions[t*3+1]??0)}function ya(e,t,n){const a=e.mesh.faces[n*3]??0,o=e.mesh.faces[n*3+1]??0,s=e.mesh.faces[n*3+2]??0;return((t[a]??0)+(t[o]??0)+(t[s]??0))/3}function yr(e,t){return ya(e,e.mesh.radii,t)}const ba=(e=4,t=.28,n=.2)=>a=>{const o=pr(a.seed);let s=a.mesh;const r=Float32Array.from(s.surface,()=>o());s={...s,surface:r};for(let i=0;i<e;i+=1)s=mr(s,l=>l*t*(o()-.5),(l,c)=>{const h=.5+(o()-.5)*(l-c)*n;return Math.min(1,Math.max(0,l*(1-h)+c*h))});return gr(a,s)},va=({equator:e=1,pole:t=.05,peak:n=0}={})=>a=>{const o=new Float32Array(a.mesh.vertexCount),s=a.mesh.radii,r=s.reduce((c,h)=>Math.min(c,h),1/0),l=s.reduce((c,h)=>Math.max(c,h),-1/0)-r||1;for(let c=0;c<a.mesh.vertexCount;c+=1){const h=((s[c]??1)-r)/l,d=wr(a,c)**2.2;o[c]=e+(t-e)*d+(n-e)*h}return{...a,temperature:o}},ka=(e=.55)=>t=>{const n=Float32Array.from(t.mesh.radii).sort(),a=Math.min(n.length-1,Math.floor(n.length*e)),o=n[a]??1,s=Float32Array.from(t.mesh.radii,r=>Math.max(r,o));return{...t,mesh:{...t.mesh,radii:s},seaRadius:o}},br=[24,92,168],vr=[62,176,206],kr=[214,196,138],Cn=[190,158,84],ct=[70,138,66],xr=[74,104,76],$r=[136,128,116],jn=[238,243,247];function Q(e,t,n){const a=Math.min(1,Math.max(0,n));return[e[0]+(t[0]-e[0])*a,e[1]+(t[1]-e[1])*a,e[2]+(t[2]-e[2])*a]}function Tr(e){return e>.78?Cn:e>.62?Q(ct,Cn,(e-.62)/.16):e>.3?ct:Q(xr,ct,(e-.12)*5.5)}const xa=e=>{const t=new Uint8ClampedArray(e.mesh.faceCount*3),n=e.mesh.radii.reduce((o,s)=>Math.max(o,s),-1/0),a=Math.max(1e-6,n-e.seaRadius);for(let o=0;o<e.mesh.faceCount;o+=1){const s=(yr(e,o)-e.seaRadius)/a,r=ya(e,e.temperature,o);let i;s<=.002?(i=Q(vr,br,.55),r<.16&&(i=Q(i,jn,(.16-r)*6))):(i=Q(kr,Tr(r),Math.min(1,s*9)),i=Q(i,$r,Math.max(0,s-.55)*2.2),r<.26&&(i=Q(i,jn,(.26-r)*4))),t[o*3]=i[0],t[o*3+1]=i[1],t[o*3+2]=i[2]}return{...e,faceColour:t}},Sr=[ba(),ka(),va(),xa];function Mr(e,t=Sr){return t.reduce((n,a)=>a(n),fr(e))}function $a(e){return Mr(e.seed,[ba(e.levels,e.roughness),ka(e.share),va(),xa])}const Pn=.3,Ar=[-.5,.45,.74],Ir=1.02;class Dt{size;pixels;depth;view=new Float32Array(0);screen=new Float32Array(0);constructor(t,n=new Uint8ClampedArray(t*t*4)){if(n.length!==t*t*4)throw new Error(`SphereRaster: ${t}×${t} needs ${t*t*4} bytes, not ${n.length}`);this.size=t,this.pixels=n,this.depth=new Float32Array(t*t)}paint(t,n){const{size:a,pixels:o,depth:s}=this;o.fill(0),s.fill(-1/0);const[r,i,l]=Er(n.light??Ar),c=n.tilt??-.38,h=Math.cos(c),d=Math.sin(c),m=Math.cos(n.rotation),f=Math.sin(n.rotation),{directions:u,radii:g,faces:v,faceCount:y,vertexCount:k}=t.mesh;let w=1;for(let $=0;$<k;$+=1){const C=g[$]??1;C>w&&(w=C)}const S=a/(2*w*Ir);this.view.length<k*3&&(this.view=new Float32Array(k*3),this.screen=new Float32Array(k*3));const M=this.view,A=this.screen;for(let $=0;$<k;$+=1){const C=g[$]??1,P=(u[$*3]??0)*C,L=(u[$*3+1]??0)*C,I=(u[$*3+2]??0)*C,x=P*m-I*f,O=P*f+I*m,b=L*h+O*d,T=-L*d+O*h;M[$*3]=x,M[$*3+1]=b,M[$*3+2]=T,A[$*3]=a/2+x*S,A[$*3+1]=a/2-b*S,A[$*3+2]=T}for(let $=0;$<y;$+=1){const C=v[$*3]??0,P=v[$*3+1]??0,L=v[$*3+2]??0,I=A[C*3],x=A[C*3+1],O=A[C*3+2],b=A[P*3],T=A[P*3+1],D=A[P*3+2],R=A[L*3],j=A[L*3+1],N=A[L*3+2],K=(b-I)*(j-x)-(T-x)*(R-I);if(K>=0)continue;const ce=M[C*3],Ft=M[C*3+1],Bt=M[C*3+2],Wt=M[P*3]-ce,qt=M[P*3+1]-Ft,Ht=M[P*3+2]-Bt,zt=M[L*3]-ce,Gt=M[L*3+1]-Ft,_t=M[L*3+2]-Bt,Jt=qt*_t-Ht*Gt,Ut=Ht*zt-Wt*_t,Yt=Wt*Gt-qt*zt,Ye=Math.hypot(Jt,Ut,Yt)||1,Oa=Jt/Ye*r+Ut/Ye*i+Yt/Ye*l,Ke=Pn+(1-Pn)*Math.max(0,Oa),La=(t.faceColour[$*3]??0)*Ke,Da=(t.faceColour[$*3+1]??0)*Ke,Ra=(t.faceColour[$*3+2]??0)*Ke,Na=Math.max(0,Math.floor(Math.min(I,b,R))),Fa=Math.min(a-1,Math.ceil(Math.max(I,b,R))),Ba=Math.max(0,Math.floor(Math.min(x,T,j))),Wa=Math.min(a-1,Math.ceil(Math.max(x,T,j)));for(let $e=Ba;$e<=Wa;$e+=1)for(let Te=Na;Te<=Fa;Te+=1){const Ve=Te+.5,Xe=$e+.5,qa=(b-I)*(Xe-x)-(T-x)*(Ve-I),Kt=(R-b)*(Xe-T)-(j-T)*(Ve-b),Vt=(I-R)*(Xe-j)-(x-j)*(Ve-R);if(qa>0||Kt>0||Vt>0)continue;const Xt=Kt/K,Qt=Vt/K,Zt=O*Xt+D*Qt+N*(1-Xt-Qt),te=$e*a+Te;Zt<=s[te]||(s[te]=Zt,o[te*4]=La,o[te*4+1]=Da,o[te*4+2]=Ra,o[te*4+3]=255)}}return o}}function Er([e,t,n]){const a=Math.hypot(e,t,n)||1;return[e/a,t/a,n/a]}const Cr=.2,jr=.36,Pr=[{upTo:20,dark:4,bright:12},{upTo:70,dark:6,bright:14},{upTo:160,dark:2,bright:10},{upTo:198,dark:3,bright:11},{upTo:275,dark:1,bright:9},{upTo:330,dark:5,bright:13},{upTo:360,dark:4,bright:12}];function Or(e,t,n){const a=Math.max(e,t,n),o=Math.min(e,t,n),s=(a+o)/2/255;if((a===0?0:(a-o)/a)<Cr)return s<.08?0:s<.5?8:s<.8?7:15;const i=a-o;let l;a===e?l=(t-n)/i*60:a===t?l=(2+(n-e)/i)*60:l=(4+(e-t)/i)*60,l<0&&(l+=360);const c=Pr.find(({upTo:h})=>l<h)??{dark:4,bright:12};return s<.08?0:s>=jr?c.bright:c.dark}function Lr(e,t){const n=(o,s)=>{const r=(s*t+o)*4;return(e[r+3]??0)===0?-1:Or(e[r]??0,e[r+1]??0,e[r+2]??0)},a=[];for(let o=0;o<t/2;o+=1){const s=[];for(let r=0;r<t;r+=1)s.push({top:n(r,o*2),bottom:n(r,o*2+1)});a.push(s)}return a}const fe=["#000000","#0000aa","#00aa00","#00aaaa","#aa0000","#aa00aa","#aa5500","#aaaaaa","#555555","#5555ff","#55ff55","#55ffff","#ff5555","#ff55ff","#ffff55","#ffffff"];function Dr(e){const t=({top:n,bottom:a})=>n<0&&a<0?"<span> </span>":n<0?`<span style="color:${fe[a]}">▄</span>`:a<0?`<span style="color:${fe[n]}">▀</span>`:n===a?`<span style="color:${fe[n]}">█</span>`:`<span style="color:${fe[n]};background:${fe[a]}">▀</span>`;return e.map(n=>n.map(t).join("")).join(`
`)}const At={levels:4,roughness:.28,share:.55},ge=32;let dt=null,On=null,ut=null;function Ln(e,t){const n=document.querySelector('link[rel="icon"]');if(!n)return;dt??=Object.assign(document.createElement("canvas"),{width:ge,height:ge});const a=dt.getContext("2d");a&&(ut??=a.createImageData(ge,ge),On??=new Dt(ge,ut.data),On.paint(e,{rotation:t}),a.putImageData(ut,0,0),n.type="image/png",n.href=dt.toDataURL("image/png"))}function Ta(e){let t=!0;if(typeof IntersectionObserver!="function")return{onScreen:()=>t,stop:()=>{}};const n=new IntersectionObserver(a=>{for(const o of a)t=o.isIntersecting},{rootMargin:"100px"});return n.observe(e),{onScreen:()=>t,stop:()=>n.disconnect()}}const Rr=90,Nr=1e3/12,Fr=400,mt=new WeakMap;function Br(e){const t=(e.textContent??"").split(`
`);return{columns:Math.max(...t.map(n=>n.length)),rows:t.length}}function It(e,t){mt.get(e)?.();const n=t??{...At,seed:Math.floor(Math.random()*16777215)},{columns:a,rows:o}=Br(e),s=Math.min(a,o*2),r=$a(n),i=new Dt(s);e.dataset.seed=String(n.seed),e.title=`World ${n.seed}, ${r.mesh.faceCount.toLocaleString("en")} triangles`;const l=v=>{e.innerHTML=Dr(Lr(i.paint(r,{rotation:v}),s)),e.classList.add("grown")};if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return l(.6),Ln(r,.6),mt.set(e,()=>{}),()=>{};let c=0,h=-1/0,d=-1/0;const m=performance.now(),f=Ta(e),u=v=>{const y=(v-m)/1e3/Rr*Math.PI*2;f.onScreen()&&v-h>=Nr&&(l(y),h=v),v-d>Fr&&(Ln(r,y),d=v),c=requestAnimationFrame(u)};c=requestAnimationFrame(u);const g=()=>{cancelAnimationFrame(c),f.stop()};return mt.set(e,g),g}function Wr(){const e=document.querySelector(".planet");return e?It(e,ga()??void 0):()=>{}}const ae=360,qr=60,Hr=1.4,Dn=Math.PI*2/qr,Rn=Math.PI*4;function zr(e){const t=p("canvas",{class:"world",width:ae,height:ae}),n=t.getContext("2d");if(!n)return()=>{};const a={...At,seed:Math.floor(Math.random()*16777215)},o=n.createImageData(ae,ae),s=new Dt(ae,o.data),r=window.matchMedia("(prefers-reduced-motion: reduce)").matches;let i,l=.6,c=-.38,h=!r,d=null,m=0,f=performance.now();const u=p("p",{class:"hint"}),g=document.querySelector(".planet"),v=(20*4**At.levels).toLocaleString("en"),y=()=>{i=$a(a);const x=ga();u.textContent=`World ${a.seed}: ${i.mesh.faceCount.toLocaleString("en")} triangles. `+(x?`The header is keeping world ${x.seed}, ${(20*4**x.levels).toLocaleString("en")} triangles.`:`The header grows a new one every visit, ${v} triangles each.`),w.hidden=!x,S()},k=p("button",{type:"button",onclick:()=>{ir({...a}),g&&It(g,{...a}),y()}},"Put it in the header"),w=p("button",{type:"button",hidden:!0,onclick:()=>{lr(),g&&It(g),y()}},"Let the header grow its own"),S=()=>{s.paint(i,{rotation:l,tilt:c}),n.putImageData(o,0,0)};let M=0;const A=Ta(t),$=x=>{const O=Math.min(.1,(x-f)/1e3);if(!d&&A.onScreen()){if(m!==0){m*=Math.exp(-O/Hr);const b=h?Dn:0;(Math.abs(m)<=b||Math.abs(m)<.01)&&(m=0)}m!==0?(l-=m*O,S()):h&&(l+=Dn*O,S()),$t.send({byRadians:m*O,tiltedBy:0,seconds:O})}f=x,M=requestAnimationFrame($)};t.addEventListener("pointerdown",x=>{d={x:x.clientX,y:x.clientY,at:x.timeStamp},m=0,t.setPointerCapture(x.pointerId)}),t.addEventListener("pointermove",x=>{if(!d)return;const O=t.clientWidth||ae,b=(x.clientX-d.x)/O*Math.PI;l-=b;const T=c;c=Math.max(-1.2,Math.min(1.2,c-(x.clientY-d.y)/O*Math.PI)),$t.send({byRadians:b,tiltedBy:c-T,seconds:0});const D=Math.max(.004,(x.timeStamp-d.at)/1e3);m=Math.max(-Rn,Math.min(Rn,m*.4+b/D*.6)),d={x:x.clientX,y:x.clientY,at:x.timeStamp},S()}),t.addEventListener("pointerup",x=>{d&&x.timeStamp-d.at>120&&(m=0),d=null,f=performance.now()}),t.addEventListener("pointercancel",()=>{d=null,m=0});const C=p("input",{type:"number",min:0,value:a.seed,onchange:()=>{a.seed=Math.max(0,Math.floor(Number(C.value)||0)),y()}}),P=p("button",{type:"button",onclick:()=>{a.seed=Math.floor(Math.random()*16777215),C.value=String(a.seed),y()}},"Another world"),L=p("button",{type:"button",onclick:()=>{h=!h,L.textContent=h?"Hold still":"Turn"}},h?"Hold still":"Turn"),I=(x,O,b,T,D,R)=>{const j=p("output",{},R(a[x])),N=p("input",{type:"range",min:b,max:T,step:D,value:a[x],onchange:()=>{a[x]=Number(N.value),j.textContent=R(a[x]),y()},oninput:()=>{j.textContent=R(Number(N.value))}});return p("label",{},`${O}: `,j,N)};return e.append(t,p("div",{class:"row"},p("span",{},"Seed "),C,P,L,k,w),p("div",{class:"dials"},I("levels","Detail",2,6,1,x=>`${x} splits`),I("roughness","Roughness",.02,1,.01,x=>x.toFixed(2)),I("share","Sea",0,.98,.01,x=>`${Math.round(x*100)}%`)),u),y(),M=requestAnimationFrame($),()=>{cancelAnimationFrame(M),A.stop()}}const Gr={name:"world",apps:{worlds:zr},install:()=>Wr()},we=[Gr,Es,gs,vs,So,No,vo,rr,Jo,cs,Vo,Os,Xa];function Nn(e,t){const n=[];for(const a of document.querySelectorAll(".app[data-app]")){const o=e[a.dataset.app??""]?.(a,t);o&&n.push(o)}return()=>{for(const a of n)a()}}function _r(e){const t={},n=e.fields.theme;(n==="dark"||n==="light")&&(t["data-page-theme"]=n);const a=e.fields.sky;return a&&(t["data-sky"]=a),t}const Jr=["data-page-theme","data-sky"];function Ur(e,t){return t==="/"?e==="/":e.startsWith(t)}const Sa=7.8,Fn=17,Ma=12,Yr=8,pt=28,Bn=44,xe=8,Kr=40,Vr=16;function Xr(e){const t=new Map;for(const w of e.nodes){const S=w.label.split(`
`),M=Math.max(...S.map(A=>A.length),1);t.set(w.id,{id:w.id,label:w.label,real:!0,rank:-1,along:Math.max(40,M*Sa+Ma*2),across:S.length*Fn+Yr*2,pos:0,preds:[],succs:[]})}for(const w of e.edges)if(!t.has(w.from)||!t.has(w.to))throw new Error(`flow: edge ${w.from} --> ${w.to} names a node that is not there`);const n=Qr(e),a={...e,edges:e.edges.map((w,S)=>n.has(S)?{...w,from:w.to,to:w.from}:w)};for(const w of a.edges){const S=t.get(w.from),M=t.get(w.to);S.succs.push(M),M.preds.push(S)}Zr(t);const o=ei(t,a),s=ti(t);ni(s);const r=s.length,i=s.map(w=>Math.max(Fn,...w.map(S=>S.real?S.across:0))),l=[];let c=xe;for(let w=0;w<r;w+=1)l.push(c),c+=(i[w]??0)+Bn;const h=w=>(l[w.rank]??0)+((i[w.rank]??0)-(w.real?w.across:0))/2,d=Math.max(...[...t.values()].map(w=>w.pos+w.along))+xe,m=c-Bn+xe,f=e.direction==="LR",u=(w,S)=>f?[S,w]:[w,S],g=[...t.values()].filter(w=>w.real).map(w=>{const[S,M]=u(w.pos,h(w));return{id:w.id,label:w.label,x:S,y:M,width:f?w.across:w.along,height:f?w.along:w.across}}),v=e.edges.map((w,S)=>{const M=o[S]??[],A=M[0],$=M[M.length-1];if(!A||!$)throw new Error("flow: an edge lost its ends");const C=e.edges.some(O=>O.from===w.to&&O.to===w.from),P=Math.min(Kr,A.along/3,$.along/3),L=C?n.has(S)?P:-P:0,I=[u(A.pos+A.along/2+L,h(A)+A.across),...M.slice(1,-1).map(O=>u(O.pos+O.along/2,h(O)+(i[O.rank]??0)/2)),u($.pos+$.along/2+L,h($))],x=n.has(S)?I.reverse():I;return w.label===void 0?{from:w.from,to:w.to,points:x}:{from:w.from,to:w.to,label:w.label,points:x}}),[y,k]=u(d,m);return{direction:e.direction,width:y,height:k,nodes:g,edges:v}}function Qr(e){const t=new Set,n=new Map,a=o=>{n.set(o,"walking"),e.edges.forEach((s,r)=>{s.from!==o||t.has(r)||(n.get(s.to)==="walking"?t.add(r):n.has(s.to)||a(s.to))}),n.set(o,"done")};for(const o of e.nodes)n.has(o.id)||a(o.id);return t}function Zr(e){const t=new Set,n=a=>{if(a.rank>=0)return a.rank;if(t.has(a))throw new Error(`flow: there is a cycle through ${a.id}, and a flow has a direction`);return t.add(a),a.rank=a.preds.length===0?0:Math.max(...a.preds.map(n))+1,t.delete(a),a.rank};for(const a of e.values())n(a)}function ei(e,t){let n=0;return t.edges.map(a=>{const o=e.get(a.from),s=e.get(a.to);if(!o||!s)return[];const r=[o];let i=o;for(let l=o.rank+1;l<s.rank;l+=1){n+=1;const c={id:`\0${n}`,label:"",real:!1,rank:l,along:Math.max(Vr,(a.label?.length??0)*Sa+Ma),across:0,pos:0,preds:[i],succs:[]};e.set(c.id,c),i.succs.push(c),r.push(c),i=c}return i!==o&&(i.succs.push(s),s.preds.push(i),o.succs.splice(o.succs.indexOf(s),1),s.preds.splice(s.preds.indexOf(o),1)),r.push(s),r})}function ti(e){const t=Math.max(...[...e.values()].map(r=>r.rank))+1,n=Array.from({length:t},()=>[]);for(const r of e.values())n[r.rank]?.push(r);const a=new Map,o=r=>r.forEach((i,l)=>a.set(i,l));n.forEach(o);const s=(r,i)=>i.length===0?a.get(r)??0:i.reduce((l,c)=>l+(a.get(c)??0),0)/i.length;for(let r=0;r<4;r+=1){for(let i=1;i<t;i+=1){const l=n[i]??[];l.sort((c,h)=>s(c,c.preds)-s(h,h.preds)),o(l)}for(let i=t-2;i>=0;i-=1){const l=n[i]??[];l.sort((c,h)=>s(c,c.succs)-s(h,h.succs)),o(l)}}return n}function ni(e){const t=r=>r.reduce((i,l)=>i+l.along,0)+pt*Math.max(0,r.length-1),n=Math.max(...e.map(t));for(const r of e){let i=xe+(n-t(r))/2;for(const l of r)l.pos=i,i+=l.along+pt}const a=r=>r.pos+r.along/2,o=(r,i)=>{const l=r.map(d=>{const m=i(d);return m.length===0?a(d):m.reduce((f,u)=>f+a(u),0)/m.length});let c=-1/0;r.forEach((d,m)=>{d.pos=Math.max((l[m]??0)-d.along/2,c),c=d.pos+d.along+pt});const h=r.reduce((d,m,f)=>d+a(m)-(l[f]??0),0)/Math.max(1,r.length);for(const d of r)d.pos-=h};for(let r=0;r<3;r+=1){for(let i=1;i<e.length;i+=1)o(e[i]??[],l=>l.preds);for(let i=e.length-2;i>=0;i-=1)o(e[i]??[],l=>l.succs)}const s=Math.min(...e.flat().map(r=>r.pos));for(const r of e.flat())r.pos+=xe-s}const Et=/(\w[\w.-]*)(?:\[([^\]]*)\])?/,ai=new RegExp(`^${Et.source}\\s*-->(?:\\|([^|]*)\\|)?\\s*${Et.source}$`),oi=new RegExp(`^${Et.source}$`),si=/^(?:flow\s+)?(TD|LR)$/i;function ri(e){const t=new Map,n=[];let a="TD";const o=(i,l)=>{i&&(t.has(i)||t.set(i,i),l!==void 0&&t.set(i,l.replace(/\\n/g,`
`)))},s=e.split(`
`);let r=!0;return s.forEach((i,l)=>{const c=i.trim();if(c===""||c.startsWith("%"))return;if(r){r=!1;const m=si.exec(c);if(m){a=m[1]?.toUpperCase()==="LR"?"LR":"TD";return}}const h=ai.exec(c);if(h){const[,m,f,u,g,v]=h;o(m,f),o(g,v),n.push(u===void 0?{from:m??"",to:g??""}:{from:m??"",to:g??"",label:u});return}const d=oi.exec(c);if(d){o(d[1],d[2]);return}throw new Error(`flow: cannot read line ${l+1}: "${c}"`)}),{direction:a,nodes:[...t].map(([i,l])=>({id:i,label:l})),edges:n}}const ii=20,Wn=17;function li(e){let t=5381;for(let n=0;n<e.length;n+=1)t=(t*33^e.charCodeAt(n))>>>0;return t.toString(36)}const W=e=>String(Math.round(e*10)/10);function hi(e,t){const[n,...a]=e.points;if(!n)return"";let o=`M${W(n[0])},${W(n[1])}`,s=n;for(const r of a){const[i,l]=s,[c,h]=r,d=t?[(i+c)/2,l]:[i,(l+h)/2],m=t?[(i+c)/2,h]:[c,(l+h)/2];o+=` C${W(d[0])},${W(d[1])} ${W(m[0])},${W(m[1])} ${W(c)},${W(h)}`,s=r}return o}function ci(e){const{points:t}=e,n=t[Math.floor((t.length-1)/2)]??[0,0],a=t[Math.ceil((t.length-1)/2)]??n;return[(n[0]+a[0])/2,(n[1]+a[1])/2]}function di(e){const t=Xr(ri(e)),n=t.direction==="LR",a=`arrow-${li(e)}`,o=t.edges.map(l=>{const c=`<path class="edge" d="${hi(l,n)}" marker-end="url(#${a})"/>`;if(l.label===void 0)return c;const[h,d]=ci(l);return`${c}<text class="edge-label" x="${W(h)}" y="${W(d)}" text-anchor="middle" dominant-baseline="middle">${E(l.label)}</text>`}).join(""),s=t.nodes.map(l=>{const c=l.x+l.width/2,h=l.label.split(`
`),d=l.y+(l.height-h.length*Wn)/2,m=h.map((f,u)=>`<tspan x="${W(c)}" y="${W(d+ii-8+u*Wn)}">${E(f)}</tspan>`).join("");return`<g class="node"><rect x="${W(l.x)}" y="${W(l.y)}" width="${W(l.width)}" height="${W(l.height)}" rx="4"/><text text-anchor="middle" dominant-baseline="middle">${m}</text></g>`}).join(""),r=W(t.width),i=W(t.height);return`<figure class="flow"><svg class="flow" viewBox="0 0 ${r} ${i}" width="${r}" height="${i}" style="max-width: 100%; height: auto" role="img"><defs><marker id="${a}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z"/></marker></defs>${o}${s}</svg></figure>`}const Rt=e=>new Set(e.split(/\s+/).filter(Boolean)),ui=Rt(`
  var let const function return if else for while do break continue new this
  true false null undefined class extends import export from default async await
  throw try catch finally typeof instanceof in of switch case delete void yield`),mi=Rt(`
  auto break case char const continue default do double else enum extern float for goto if
  inline int long register restrict return short signed sizeof static struct switch typedef
  union unsigned void volatile while NULL true false`),pi=Rt(`
  abstract assert boolean break byte case catch char class const continue default do double
  else enum extends final finally float for goto if implements import instanceof int interface
  long native new package private protected public return short static strictfp super switch
  synchronized this throw throws transient try var void volatile while true false null`);function U(e,t){return`<span class="hl-${e}">${E(t)}</span>`}function Aa(e,t,n){for(let a=t+1;a<e.length;a+=1)if(e[a]==="\\")a+=1;else if(e[a]===n)return a+1;return e.length}function ft(e,t,n){let a="",o=0;for(;o<e.length;){const s=e.slice(o);let r;const i=e.lastIndexOf(`
`,o-1)+1,l=/^\s*$/.test(e.slice(i,o));if(s.startsWith("//")||n&&s[0]==="#"&&l){const c=e.indexOf(`
`,o),h=c<0?e.length:c;a+=U(s[0]==="#"?"a":"c",e.slice(o,h)),o=h}else if(s.startsWith("/*")){const c=e.indexOf("*/",o+2),h=c<0?e.length:c+2;a+=U("c",e.slice(o,h)),o=h}else if(s[0]==='"'||s[0]==="'"||s[0]==="`"){const c=Aa(e,o,s[0]??"");a+=U("s",e.slice(o,c)),o=c}else if(r=/^[A-Za-z_$][\w$]*/.exec(s)){const c=r[0];a+=t.has(c)?U("k",c):E(c),o+=c.length}else(r=/^\d+(?:\.\d+)?/.exec(s))?(a+=U("n",r[0]),o+=r[0].length):(a+=E(s[0]??""),o+=1)}return a}function fi(e){let t="",n=0;for(;n<e.length;){const a=e.slice(n);if(a.startsWith("<!--")){const s=e.indexOf("-->",n+4),r=s<0?e.length:s+3;t+=U("c",e.slice(n,r)),n=r;continue}const o=/^<(\/?)([A-Za-z][\w-]*)/.exec(a);if(!o){const s=e.indexOf("<",n+1),r=s<0?e.length:s;t+=E(e.slice(n,r)),n=r;continue}for(t+=`&lt;${o[1]}${U("t",o[2]??"")}`,n+=o[0].length;n<e.length&&e[n]!==">";){const s=e.slice(n);let r;if(r=/^\s+/.exec(s))t+=r[0],n+=r[0].length;else if(r=/^[A-Za-z_:][\w:.-]*/.exec(s))t+=U("a",r[0]),n+=r[0].length;else if(s[0]==="="&&(s[1]==='"'||s[1]==="'")){const i=Aa(e,n+1,s[1]??"");t+=`=${U("s",e.slice(n+1,i))}`,n=i}else t+=E(s[0]??""),n+=1}e[n]===">"&&(t+="&gt;",n+=1)}return t}function gi(e,t){return t==="js"||t==="javascript"?ft(e,ui,!1):t==="c"?ft(e,mi,!0):t==="java"?ft(e,pi,!1):t==="html"?fi(e):E(e)}function wi(e,t){const a=/^https?:/.test(t)?' target="_blank" rel="noopener noreferrer"':"";return`<a href="${E(t)}"${a}>${e}</a>`}const yi=["large","wide"];function bi(e,t,n){const a=n&&yi.includes(n)?` class="${n}"`:"";return`<img src="${E(t)}" alt="${E(e)}"${a}>`}const vi=/(`[^`]+`|!\[[^\]]*\]\([^)\s]+(?:\s+"[^"]*")?\)|\[[^\]]+\]\([^)\s]+\))/g,ki=/^!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)$/,xi=/^\[([^\]]+)\]\(([^)\s]+)\)$/;function Ia(e){return e.split(vi).map(t=>{if(t.startsWith("`")&&t.endsWith("`")&&t.length>1)return`<code>${E(t.slice(1,-1))}</code>`;const n=ki.exec(t);if(n)return bi(n[1]??"",n[2]??"",n[3]);const a=xi.exec(t);return a?wi(Ia(a[1]??""),a[2]??""):E(t)}).join("")}function $i(e){const t=[];return e.replace(/<code>[\s\S]*?<\/code>/g,a=>`\0${t.push(a)-1}\0`).replace(/\*\*([^*]+)\*\*/g,"<strong>$1</strong>").replace(/(^|[^*])\*([^*]+)\*/g,"$1<em>$2</em>").replace(/ {2,}\n/g,"<br>").replace(/\n/g," ").replace(/ -- /g," — ").replace(/\u0000(\d+)\u0000/g,(a,o)=>t[Number(o)]??"")}function Y(e){return $i(Ia(e))}function Ti(e){const t=e.split(`
`).map(f=>f.trim()).filter(Boolean),n=t.find(f=>!f.includes(" :: ")),a=t.filter(f=>f.includes(" :: ")).map(f=>{const u=f.indexOf(" :: ");return{left:f.slice(0,u).trim(),right:f.slice(u+4).trim()}}),o=a.filter(({left:f})=>f.startsWith("=")).map(({left:f,right:u})=>({value:Number(f.slice(1)),name:u})),s=a.filter(({left:f})=>!f.startsWith("=")).map(({left:f,right:u})=>{const[g="",v]=u.split("|").map(k=>k.trim()),y=Number(g.replace(/!$/,"").trim());return{label:f,value:y,shown:v??String(y),marked:g.endsWith("!")}}),r=Math.max(0,...s.map(({value:f})=>f),...o.map(({value:f})=>f))||1,i=f=>(Math.max(0,f)/r).toFixed(3),l=o[0],c=s.map(({label:f,value:u,shown:g,marked:v})=>`<tr${v?' class="marked"':""}><th scope="row">${Y(f)}</th><td><span class="bar" style="--p:${i(u)}"></span><span class="value">${E(g)}</span></td></tr>`).join(""),h=l?` style="--rule:${i(l.value)}"`:"",d=l?` The line is ${E(l.name)}, at ${l.value}.`:"",m=n||l?`<figcaption>${n?Y(n)+".":""}${d}</figcaption>`:"";return`<figure class="bars"><table${h}${l?' class="ruled"':""}><tbody>${c}</tbody></table>${m}</figure>`}const qn=/^(?:[-*]|\d+\.)\s/;function Si(e,t,n){if(!qn.test(e[0]??""))return!1;const a=t.slice(n).find(o=>o.trim()!=="");return a!==void 0&&qn.test(a)}function Mi(e){const t=[],n=e.replace(/\r\n?/g,`
`).split(`
`);let a=[],o=!1;return n.forEach((s,r)=>{if(s.startsWith("```")){o=!o,a.push(s),o||(t.push(a),a=[]);return}if(!o&&s.trim()===""){if(Si(a,n,r+1))return;a.length&&t.push(a),a=[];return}a.push(s)}),a.length&&t.push(a),t}function Ai(e){return e.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}function Ii(e){const t=/^(#{1,4})\s+(.*)$/.exec(e[0]??"");if(!t||!e.slice(0,-1).every(s=>/ {2,}$/.test(s)))return null;const a=t[1]?.length??1,o=[t[2]??"",...e.slice(1)].join(`
`);return`<h${a} id="${Ai(o)}">${Y(o)}</h${a}>`}function Ei(e){if(!e[0]?.startsWith("```"))return null;const t=e[0].slice(3).trim(),n=e.slice(1,-1).join(`
`);return t==="flow"?di(n):t==="bars"?Ti(n):`<pre><code>${gi(n,t)}</code></pre>`}function Ci(e,t){const n=[];for(const a of e)t.test(a)?n.push(a.replace(t,"")):n.length&&(n[n.length-1]+=`
${a.trim()}`);return n}function ji(e){const t=e[0]??"",n=/^\d+\.\s/.test(t),a=/^[-*]\s/.test(t);if(!n&&!a)return null;const o=n?/^\d+\.\s+/:/^[-*]\s+/;if(!e.every(i=>o.test(i)||/^\s/.test(i)))return null;const s=n?"ol":"ul",r=Ci(e,o).map(i=>`<li>${Y(i)}</li>`).join("");return`<${s}>${r}</${s}>`}function Pi(e){return e.every(n=>n.includes(" :: "))?`<dl>${e.map(n=>{const a=n.indexOf(" :: ");return[n.slice(0,a),n.slice(a+4)]}).map(([n,a])=>`<dt>${Y(n)}</dt><dd>${Y(a)}</dd>`).join("")}</dl>`:null}function Oi(e){if(!e.every(n=>n.startsWith(">")))return null;const t=e.map(n=>n.replace(/^>\s?/,"")).join(" ");return`<blockquote>${Y(t)}</blockquote>`}function Li(e){const t=/^::([a-z0-9-]+)$/.exec(e[0]??"");return!t||e.length!==1?null:`<div class="app" data-app="${t[1]}"></div>`}function Di(e){return e.length===1&&/^-{3,}$/.test(e[0]??"")?"<hr>":null}function Ri(e){const t=e.length===1&&/^(\\+)$/.exec(e[0]??"");return t?`<div class="space" style="--n:${t[1]?.length??1}"></div>`:null}function Ni(e){return e.length===1&&/^!\[[^\]]*\]\([^)\s]+(?:\s+"[^"]*")?\)$/.test(e[0]??"")?`<figure>${Y(e[0]??"")}</figure>`:null}function Fi(e){return`<p>${Y(e.join(`
`))}</p>`}const Bi=[Di,Ri,Ii,Ei,Oi,Li,Ni,Pi,ji];function Ea(e){return Mi(e).map(t=>{for(const n of Bi){const a=n(t);if(a!==null)return a}return Fi(t)}).join(`
`)}function Nt(e){return e==="/"?"~":`~${e.replace(/\/$/,"")}`}function Ca(e,t){return`<p class="ran"><span class="ps1">${E(e)} $</span> ${E(t)}</p>`}function Wi(e,t){if(t.parent===null)return"";const n=e.childrenOf(t.route);if(n.length===0)return"";const a=n.map(o=>`<li><a class="entry" href="${o.route}"><code>${E(o.name)}/</code><span class="title">${E(o.title)}</span>`+(o.summary?`<span class="summary">${E(o.summary)}</span>`:"")+"</a></li>").join("");return`${Ca(Nt(t.route),"ls")}
<ul class="listing">${a}</ul>`}function qi(e,t){const n=e.trailTo(t.route).slice(1).map(a=>a.name).join("/");return Ca("~",n?`cd ${n} && cat README.md`:"cat README.md")}function Hi(e,t){return`${qi(e,t)}
${Ea(t.body)}
${Wi(e,t)}`}function zi(e,t){const n=document.querySelector("main");if(!n)return()=>!1;const a=(o,{push:s=!0,keep:r=!1}={})=>{const i=e.at(o);if(!i)return!1;r||(n.innerHTML=Hi(e,i));const l=_r(i);for(const c of Jr){const h=l[c];h?document.documentElement.setAttribute(c,h):document.documentElement.removeAttribute(c)}document.title=i.route==="/"?"David Rodenas":`${i.title} — David Rodenas`;for(const c of document.querySelectorAll("nav .navlink"))Ur(o,c.getAttribute("href")??"\0")?c.setAttribute("aria-current","page"):c.removeAttribute("aria-current");return s&&(o===window.location.pathname?window.history.replaceState({route:o},"",o):window.history.pushState({route:o},"",o),r||window.scrollTo({top:0})),window.goatcounter?.count?.({path:o,title:document.title}),t(i,r),!0};return document.addEventListener("click",o=>{if(o.defaultPrevented||o.button!==0||o.metaKey||o.ctrlKey||o.shiftKey||o.altKey)return;const s=o.target?.closest("a[href]");if(!s||s.target||s.dataset.run)return;const r=new URL(s.href,window.location.href);if(r.origin!==window.location.origin)return;const i=r.pathname.endsWith("/")?r.pathname:`${r.pathname}/`;e.at(i)&&(o.preventDefault(),i!==window.location.pathname&&a(i))}),window.addEventListener("popstate",()=>{const o=window.location.pathname.endsWith("/")?window.location.pathname:`${window.location.pathname}/`;a(o,{push:!1})}),a}class Gi{typed=[];drafts=[];index=0;get lines(){return this.typed}add(t){this.typed.push(t),this.drafts=[...this.typed,""],this.index=this.typed.length}previous(t){return this.moveTo(this.index-1,t)}next(t){return this.moveTo(this.index+1,t)}moveTo(t,n){return this.drafts.length===0&&(this.drafts=[""]),t<0||t>=this.drafts.length?n:(this.drafts[this.index]=n,this.index=t,this.drafts[t]??n)}}function _i(e,t,n,a){if(e==="k"){const o=t.slice(n);return{line:t.slice(0,n),caret:n,killed:o||a}}if(e==="u"){const o=t.slice(0,n);return{line:t.slice(n),caret:0,killed:o||a}}return e==="y"?{line:t.slice(0,n)+a+t.slice(n),caret:n+a.length,killed:a}:null}function ja(e){return e.split(/\s*(?:;|&&)\s*/).map(t=>t.trim().split(/\s+/).filter(Boolean)).filter(t=>t.length>0)}function ee(e,t){const a=t.startsWith("~")||t.startsWith("/")?[]:e.split("/").filter(Boolean),o=t.replace(/^~/,"").split("/").filter(Boolean),s=[...a];for(const r of o)r!=="."&&(r===".."?s.pop():s.push(r));return s.length===0?"/":`/${s.join("/")}/`}function Ji(e){return e.replace(/(?:^|\/)(?:README\.md|\*)$/,"")||"."}const Ui={name:"cat",usage:"cat <file>",description:"print a page, README.md or * for the one here",run({site:e,cwd:t},[n]){if(!n)return{text:"cat: usage: cat <file>",error:!0};const a=ee(t,Ji(n)),o=e.at(a);return!o||/\.md$/.test(n)!==/README\.md$/.test(n)?{text:`cat: ${n}: no such file`,error:!0}:{html:Ea(o.body),at:a}}},Yi={name:"cd",usage:"cd [dir]",description:"go to a directory (the address follows)",run(e,[t="~"]){const n=ee(e.cwd,t);return e.site.at(n)?(e.cwd=n,{at:n}):{text:`cd: ${t}: no such directory`,error:!0}}},Ki={name:"clear",usage:"clear",description:"clear what the shell has printed",run(){return{clear:!0}}},Vi={name:"find",usage:"find [path] [word]",description:"every page under a directory; with a word, only those it is in the name or title of",run({site:e,cwd:t},n){const[a,o]=n,s=a!==void 0&&(a==="."||a.includes("/")||e.at(ee(t,a))!==void 0),r=s?a??".":".",i=(s?o:a)?.toLowerCase(),l=ee(t,r);if(!e.at(l))return{text:`find: ${r}: no such directory`,error:!0};const h=e.pages.filter(d=>d.route.startsWith(l)).filter(d=>!i||d.route.toLowerCase().includes(i)||d.title.toLowerCase().includes(i));return h.length===0?{text:`find: nothing under ${r}${i?` with "${i}" in it`:""}`}:{text:h.map(d=>`${d.route}  # ${d.title}`).join(`
`),html:`<pre class="listing">${h.map(d=>`<span class="line"><a href="${E(d.route)}">${E(d.route)}</a><span class="hint">  # ${E(d.title)}</span></span>`).join("")}</pre>`}}},gt=40,Xi=e=>e.replace(/\]\([^)]*\)/g,"]").replace(/[#*_`>\[\]]/g,"").trim(),Qi={name:"grep",usage:"grep <word> [path]",description:"the lines of every page under a directory that say a word",run({site:e,cwd:t},[n,a="."]){if(!n)return{text:"grep: usage: grep <word> [path]",error:!0};const o=ee(t,a);if(!e.at(o))return{text:`grep: ${a}: no such directory`,error:!0};const s=n.toLowerCase(),r=e.pages.filter(h=>h.route.startsWith(o)).flatMap(h=>h.body.split(`
`).map((d,m)=>({page:h,number:m+1,line:Xi(d)})).filter(({line:d})=>d.toLowerCase().includes(s)));if(r.length===0)return{text:`grep: no page under ${a} says "${n}"`};const i=r.slice(0,gt),l=r.length>gt?[`… and ${r.length-gt} more. Give grep a directory to look in.`]:[],c=h=>E(h).replace(new RegExp(E(n).replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),"ig"),d=>`<mark>${d}</mark>`);return{text:[...i.map(({page:h,number:d,line:m})=>`${h.route}:${d}: ${m}`),...l].join(`
`),html:`<pre class="listing wrap">${[...i.map(({page:h,number:d,line:m})=>`<span class="line"><a href="${E(h.route)}">${E(h.route)}</a>:${d}: <span class="hint">${c(m)}</span></span>`),...l.map(h=>`<span class="line">${E(h)}</span>`)].join("")}</pre>`}}},Zi={name:"help",usage:"help [command]",description:"this",run({commands:e},[t]){if(t){const r=e.find(i=>i.name===t);return r?{text:`${r.usage}
  ${r.description}`}:{text:`help: ${t}: no such command`,error:!0}}const n=Math.max(...e.map(r=>r.usage.length)),a=e.map(r=>`${r.usage.padEnd(n)}  ${r.description}`),o="Tab completes; → takes the grey suggestion. ↑↓ recall. ^K kills to the end of the line, ^U back to the start, ^Y puts it back.",s=e.map(r=>`<dt><a href="#" data-run="help ${r.name}">${E(r.usage)}</a></dt><dd>${E(r.description)}</dd>`).join("");return{text:["Commands:",...a,"",o].join(`
`),html:`<p>Commands:</p><dl class="help">${s}</dl><p>${E(o)}</p>`}}};function el(e){const t=e.filter(a=>a.startsWith("-")).flatMap(a=>a.slice(1).split("")),n=e.find(a=>!a.startsWith("-"))??".";return{flags:t,path:n}}function tl(e,t,n,a){const o=a==="."?"":`${a.replace(/\/$/,"")}/`;return[...t?[{mode:"dr-x",name:"..",title:t.title,summary:t.summary,href:t.route,run:`cd ${o}..`}]:[],{mode:"--r-",name:"README.md",title:e.title,summary:e.summary,href:e.route,run:`cat ${o}README.md`},...n.map(s=>({mode:"dr-x",name:`${s.name}/`,title:s.title,summary:s.summary,href:s.route}))]}function Hn(e){const t=e.run?` data-run="${E(e.run)}"`:"";return`<a href="${E(e.href)}"${t}>${E(e.name)}</a>`}function nl(e,t){const n=r=>" ".repeat(Math.max(0,20-r.length)),a=r=>t?`${r.mode}  ${r.name}${n(r.name)}  ${r.title}${r.summary?` — ${r.summary}`:""}`:`${r.name}${n(r.name)}  # ${r.title}`,o=r=>t?`<span class="line">${r.mode}  ${Hn(r)}${n(r.name)}  ${E(r.title)}${r.summary?`<span class="hint"> — ${E(r.summary)}</span>`:""}</span>`:`<span class="line">${Hn(r)}${n(r.name)}<span class="hint">  # ${E(r.title)}</span></span>`,s=t?[`total ${e.length}`]:[];return{text:[...s,...e.map(a)].join(`
`),html:`<pre class="listing">${[...s.map(r=>`<span class="line">${r}</span>`),...e.map(o)].join("")}</pre>`}}const al={name:"ls",usage:"ls [-l] [path]",description:"list what a directory holds, each with its title; -l adds a line on each",run({site:e,cwd:t},n){const{flags:a,path:o}=el(n),s=a.find(c=>c!=="l");if(s)return{text:`ls: -${s}: no such option. Try ls -l`,error:!0};const r=ee(t,o),i=e.at(r);if(!i)return{text:`ls: ${o}: no such directory`,error:!0};const l=i.parent===null?void 0:e.at(i.parent);return nl(tl(i,l,e.childrenOf(r),o),a.includes("l"))}},ol={name:"pwd",usage:"pwd",description:"print where you are",run({cwd:e}){return{text:Nt(e)}}},Pa=[al,Yi,Ui,Vi,Qi,ol,Zi,Ki];class sl{context;constructor(t,n,a=Pa){this.context={site:t,cwd:n,commands:a}}get prompt(){return`${Nt(this.context.cwd)} $`}moveTo(t){return this.context.site.at(t)?(this.context.cwd=t,!0):!1}run(t){const n=[];for(const[a="",...o]of ja(t)){const s=this.context.commands.find(i=>i.name===a),r=s?s.run(this.context,o):{text:`${a}: command not found. Try help`,error:!0};if(n.push(r),r.error)break}return n}complete(t){const n=t.split(/\s+/),a=n.pop()??"",o=n.length===0?"":`${n.join(" ")} `;return(n.length===0?this.commandNames():this.pathNames(a)).filter(r=>r.startsWith(a)).map(r=>o+r)}commandNames(){return this.context.commands.map(t=>t.name).sort()}pathNames(t){const n=t.lastIndexOf("/"),a=n<0?".":t.slice(0,n+1),o=ee(this.context.cwd,a);if(!this.context.site.at(o))return[];const s=n<0?"":a;return["README.md",...this.context.site.childrenOf(o).map(i=>`${i.name}/`)].map(i=>s+i)}}function rl(e,t,n){if(e==="")return"help";const o=[...[...t].reverse(),...n].find(s=>s.startsWith(e)&&s!==e);return o?o.slice(e.length):""}const Ct="shell-pending";function il(e){try{e&&sessionStorage.setItem(Ct,e)}catch{}}function ll(){try{const e=sessionStorage.getItem(Ct)??"";return sessionStorage.removeItem(Ct),e}catch{return""}}function hl(){window.__stopTyped?.();const e=window.__typed??[];if(window.__typed=[],e.length===0)return null;const t=[];let n="";for(const a of e)a==="Enter"?(t.push(n),n=""):a==="Backspace"?n=n.slice(0,-1):n+=a;return{finished:t,unfinished:n}}function cl(e,t,n={}){const a=document.querySelector(".terminal"),o=document.querySelector(".screen"),s=a?.querySelector("form.prompt"),r=s?.querySelector("input"),i=s?.querySelector(".line"),l=s?.querySelector(".suggest"),c=s?.querySelector(".ps1"),h=document.querySelector(".ran.end"),d=h?.querySelector(".ps1"),m=h?.querySelector(".line"),f=h?.querySelector(".typed");if(!a||!o||!s||!r||!i||!l||!c||!h||!d||!m||!f)return null;const u=()=>{c.textContent=g.prompt,d.textContent=g.prompt},g=new sl(e,t,n.commands),v=new Gi;let y=null;const k=b=>{o.append(b)},w=()=>{y?.remove(),y=null},S=()=>{const b=r.selectionStart??r.value.length;i.style.setProperty("--caret",String(b)),i.style.setProperty("--typed",String(r.value.length)),f.textContent=r.value,m.style.setProperty("--caret",String(b)),l.textContent=b===r.value.length?rl(r.value,v.lines,g.complete(r.value)):""},M=(b,T=b.length)=>{r.value=b,r.setSelectionRange(T,T),S()},A=b=>{if(b.clear&&(o.replaceChildren(),n.clearPage?.()),b.html){const T=p("div",{class:b.text?"listing-out":"cat"});T.innerHTML=b.html,k(T)}else b.text&&k(p("pre",{class:b.error?"error":""},b.text))},$=b=>{w();const T=p("p",{class:"echo"},p("span",{class:"ps1"},g.prompt),` ${b}`);k(T);let D=!1;const R=ja(b).map(j=>j.join(" "));for(let j=0;j<R.length;j+=1){const[N]=g.run(R[j]??"");if(N){if(A(N),N.html&&!N.text&&(D=!0),N.at&&!n.moveTo?.(N.at)){il(R.slice(j+1).join(" && ")),window.location.assign(N.at);return}if(N.error)break}}u(),S(),D?T.scrollIntoView({block:"start"}):window.scrollTo({top:document.documentElement.scrollHeight})},C=()=>{if(w(),r.value.trim()===""){M("help");return}const b=g.complete(r.value);b.length===1?M(b[0]??r.value):b.length>1&&(y=p("p",{class:"hint"},b.map(T=>T.split(" ").pop()).join("  ")),s.insertAdjacentElement("afterend",y),window.scrollTo({top:document.documentElement.scrollHeight}))};s.addEventListener("submit",b=>{b.preventDefault();const T=r.value.trim();M(""),T&&(v.add(T),$(T))});let P="";r.addEventListener("keydown",b=>{if(b.key==="Tab")b.preventDefault(),C();else if(b.key==="ArrowUp")b.preventDefault(),M(v.previous(r.value));else if(b.key==="ArrowDown")b.preventDefault(),M(v.next(r.value));else if(b.key==="ArrowRight"&&r.selectionStart===r.value.length&&l.textContent)b.preventDefault(),M(r.value+l.textContent);else if(b.ctrlKey&&!b.metaKey&&!b.altKey){const T=_i(b.key,r.value,r.selectionStart??r.value.length,P);if(!T)return;b.preventDefault(),w(),M(T.line,T.caret),P=T.killed}else w()});for(const b of["input","keyup","click","focus","select"])r.addEventListener(b,S);let L=!0;r.addEventListener("input",()=>{L&&r.value!==""&&window.scrollTo({top:document.documentElement.scrollHeight}),L=r.value===""}),document.addEventListener("selectionchange",()=>{document.activeElement===r&&S()}),o.addEventListener("click",b=>{const T=b.target?.closest("a[data-run]");T?.dataset.run&&(b.preventDefault(),$(T.dataset.run))}),window.addEventListener("keydown",b=>{const D=b.target?.matches("input, textarea, select, [contenteditable]")??!1,R=b.key.length===1&&!b.ctrlKey&&!b.metaKey&&!b.altKey;D||!R||r.focus({preventScroll:!1})}),s.addEventListener("click",()=>r.focus()),h.addEventListener("click",()=>r.focus()),S();const I=ll();I&&$(I);const x=hl();if(x){for(const b of x.finished)b.trim()&&(v.add(b.trim()),$(b.trim()));M(x.unfinished),r.focus()}return{run:$,moveTo:b=>{g.moveTo(b)&&(o.replaceChildren(),u(),S())}}}const dl=[{file:"book/index.md",markdown:`---
title: The Emotional and Technical Guide to Rescue Stalled Software
summary: Never rewrite. Never stop delivery. A book about rescuing stalled software, 2024, 156 pages.
order: 1
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
order: 2
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

## The book

![The cover of the book](/book/BookGuide.jpeg) *The Emotional and Technical
Guide to Rescue Stalled Software* (2024) is about conquering technical debt
without sacrificing your sanity or your shipping schedule. Its rule fits on one
line: never rewrite, never stop delivery. [About the book.](/book/)

## Essays

> > More than half a million views.

More than 250 of them on [Medium](https://drpicox.medium.com), one every
Saturday since 2022. The most read one, and the ones read longest, argue with
the canon:

- [The JavaScript framework war is over](https://medium.com/p/bd110ddab732)
- [Software Development Is A Beautiful Mess](https://drpicox.medium.com/software-development-is-a-beautiful-mess-45edab1fab73)
- [Scrum vs Extreme Programming: Was XP Right All Along?](https://drpicox.medium.com/scrum-vs-extreme-programming-was-xp-right-all-along-1bb1061e9e6b)
- [Confirmed: Code Coverage Is a Useless Management Metric](https://medium.com/better-programming/confirmed-code-coverage-is-a-useless-management-metric-35afa05e8549)
- [The Craziest Piece of Software I've Ever Seen](https://drpicox.medium.com/the-craziest-piece-of-software-ive-ever-seen-4605085ceb5b)
- [What Are Micro-Frontends Really For?](https://drpicox.medium.com/what-are-micro-frontends-for-aad66e9c2cf8)

[Twenty of them, with a line on each.](/essays/)

## Two public APIs of AngularJS are mine

> I made its compiler faster.

Two performance changes in the AngularJS compiler are mine. They shipped in
2016 and were never taken out: six years of releases later they are still in
1.8.3, the last one the framework had. So is my implementation of
\`$componentController\`, the helper its testing module gives you to unit-test a
component. So are two benchmark suites I wrote when maintainers asked for
numbers they could check -- one of which measured the \`ngClass\` rewrite built
on my work at more than a hundred times faster on the case that mattered. None
of it is documentation. [The whole account.](/open-source/angularjs/)

## The world at the top

The mark in the header is not a picture. It is a planet, grown the moment this
page opened, by the pipeline of a program I wrote around 2000 for a
university graphics course: [Mons fractals](https://david-rodenas.com/mons-fractals/),
Java 1.1.8 on MS-DOS, writing worlds out as VRML.

It is a pipeline of filters, and the order is part of the meaning. Start from
an icosahedron. Split every edge and push each new midpoint out or in by a
fraction of the edge it came from, so the first rounds carve continents and the
last ones only roughen a slope. Put in the sea as a minimum radius:
everything below it is raised up to it, which is why a coastline reads as a
coastline and not as a change of colour. Work out the climate from height
above the sea and from latitude, so that a summit is white wherever it stands,
the way the Himalaya is. Only then paint it. Paint first and you get a ball of
one colour.

Reload, and it is a different world. The same pipeline runs here, rewritten in
TypeScript with nothing underneath it, and you can [turn the dials yourself](/worlds/).
`},{file:"kata/index.md",markdown:`---
title: The Bowling Game Kata
summary: Robert C. Martin's kata, with slides and a repository to do it in JavaScript or Java.
order: 6
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
`},{file:"open-data/hot-nights.md",markdown:`---
title: Hot nights, counted
summary: How many nights a year never cool below 20 °C, at nine weather stations, and whether the second half of each record differs from the first.
order: 2
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
`},{file:"open-data/index.md",markdown:`---
title: Open data
summary: Public measurements of Catalonia, looked at until they show something.
order: 9
---

# Open data

The Generalitat de Catalunya publishes what its measuring networks record, and
most of it is only ever looked at a day at a time. These pages add it up
another way and keep the picture that came out.

The sums are kept in this site's repository, a finished year at a time, and
the portal is asked again only when a year has ended. While you read, nothing
is fetched from anyone but this site.

- [NO2 by the hour and the month](/open-data/no2/) -- thirty years of hourly measurements, averaged by hour of the day and month of the year. A city's working day turns out to have a shape, and it does not reach the top of the hill.
- [Hot nights, counted](/open-data/hot-nights/) -- how many nights a year never cool below 20 °C, at nine weather stations, and whether the second half of each record differs from the first.

Use \`ls\` to see them, or \`cat no2\` to read one here.
`},{file:"open-data/no2.md",markdown:`---
title: NO2 by the hour and the month
summary: Thirty years of hourly NO2, averaged by hour of the day and month of the year. A city's working day turns out to have a shape.
order: 1
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
order: 3
---

# Open source

Most of what I have written belongs to whoever paid for it. This is the part
that does not: code that is public, and that other people have run, merged,
or built on.

- [AngularJS](/open-source/angularjs/) -- two public APIs of the compiler are mine, with the \`ngClass\` rewrite built on my work, the testing module's \`$componentController\`, two benchmark suites and a directive. All of it still in 1.8.3, the last release the framework had. The whole account, commit by commit.
- [What strangers install](/open-source/packages/) -- thirty-four npm packages, most written for one project. A few kept being downloaded for years by people nobody told about them: what npm counted, year by year.

Elsewhere on this site, and just as public:

- [Worlds](/worlds/) -- the fractal planet generator from around 2000, [Mons fractals](https://github.com/drpicox/mons-fractals), rewritten here with its dials outside.
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
`},{file:"projects/index.md",markdown:`---
title: Projects
summary: Things built to be looked at and played with: a language model you can count by hand, and a relativistic rocket.
order: 10
---

# Projects

Small things, each made to show one idea by letting you move it.

- [The next word](/projects/next-word/) -- a language model with everything taken away but the idea: count which word follows which, then throw the dice. Let it read this website.
- [A relativistic rocket](/projects/rocinante/) -- how long a trip takes on board and how long for those left at home, and why a ship that crosses the solar system in days cannot reach a star in a lifetime.

Use \`ls\` to see them, or \`cat next-word\` to read one here.
`},{file:"projects/next-word.md",markdown:`---
title: The next word
summary: A language model with everything taken away but the idea: count which word follows which, then throw the dice.
order: 1
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
`},{file:"projects/rocinante.md",markdown:`---
title: A relativistic rocket
summary: How long a trip takes on board, how long for those left at home, and why a ship that crosses the solar system in days cannot reach a star in a lifetime.
order: 2
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
order: 6
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
`},{file:"simulators/developer-meetings.md",markdown:`---
title: Developer Meetings Simulator
summary: How the kind and timing of meetings affect focus, fatigue and how many features a week finishes.
order: 2
---

# Developer Meetings Simulator

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
`},{file:"simulators/index.md",markdown:`---
title: Simulators
summary: Two things you can turn the dials of: technical debt, and a week of meetings.
order: 7
---

# Simulators

Software development concepts like technical debt or team dynamics are
abstract and hard to visualise. These two are not lectures: they are small
models you can turn the dials of and watch.

- [Technical debt](/simulators/technical-debt/) -- how shortcuts create compound productivity losses over time: the true cost of a shortcut, the break-even point between clean and debt-driven development, and what the interest rate does to it.
- [Developer meetings](/simulators/developer-meetings/) -- how the kind and the timing of meetings affect a developer's focus and fatigue, and with them how many features a week actually finishes. Paint a calendar and see.

Use \`ls\` to see them, or \`cat technical-debt\` to read one here.
`},{file:"simulators/technical-debt.md",markdown:`---
title: Technical Debt Simulator
summary: How shortcuts create compound productivity losses over time.
order: 1
---

# Technical Debt Simulator

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
`},{file:"talks/index.md",markdown:`---
title: Talks
summary: Twenty-one years of them: two international conferences as first author, the Barcelona JavaScript circuit of 2013–2017, and since 2022 talks about algorithms for people who do not write them.
order: 4
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
2016-06 :: **The Bowling Game Kata**, twice in a fortnight. It is [still here](/kata/).
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
order: 3
---

# Sixty-four rooms

In the autumn of 2007 I taught the lab of *Introducció als Ordinadors* at the
UPC: first year, first term, first programs in C. The lab was a text
adventure. It is small — one file of C, six hundred lines, and three text
files it reads at the start — and it is playable, here, exactly as it was:

::adventure

The words are the game's, in Spanish, as they were written for the class:
\`norte\`, \`sur\`, \`este\`, \`oeste\`, \`coger\`, \`atacar\`. The English ones work
too. You start in the south-west corner with sixteen points of life and
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
`},{file:"teaching/index.md",markdown:`---
title: Teaching
summary: A software laboratory where the specification is a blog post that compiles into tests, and a consensus algorithm taught through a recipe for concurrency anyone can follow.
order: 5
---

# Teaching

I have taught at three universities. The first time was in 2002, through the
UPC's foundation: computing for people between 65 and 97 years old; five years
later, at the UPC itself, the first programs of the first year. The courses
here are those and two more. In all of them the subject was the part of software
that a lecture cannot give — what happens when several people, or several
threads, touch the same thing at once — and both times I ended up building
what the students stood on, so that the difficulty they met was the one the
course was about and not three others.

- [The post comes first](/teaching/software-lab/) -- Tecnocampus, six autumns, 2017 to 2022. *Laboratori de Software 2*: teams building a game the way software is built, where a feature starts as a blog post in markdown that compiles into a test for the server and a test for the client, the writer of a post is never its coder, and the grades are read from the repository's history.
- [Sixty-four rooms](/teaching/adventure/) -- UPC, 2007, *Introducció als Ordinadors*. A text adventure as the lab of a first-year course, built so that four traversal-and-search schemas were all a student needed, on a map drawn on squared paper first. Playable.
- [Raft, and a recipe for concurrency](/teaching/raft/) -- UOC, the distributed systems laboratory, 2013. A consensus algorithm as the assignment, the year before its paper was presented, and the three steps -- copy inside the guard, work outside it, check before writing -- that let someone writing their first concurrent program get it right.

At the Tecnocampus, between 2017 and 2023, I designed three subjects from
scratch -- *Enginyeria del Software III*, *Laboratori de Software 2* and
*Arquitectura de Serveis* -- with a first-year lab, a front-end course and
final-project tutoring around them.

Use \`ls\` to see them, or \`cat software-lab\` to read one here.
`},{file:"teaching/raft.md",markdown:`---
title: Raft, and a recipe for concurrency
summary: A consensus algorithm as a laboratory assignment in 2013, and the three-step recipe that lets someone who has never written concurrent code get it right.
order: 1
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

If that sounds like BDD, it is -- reinvented so that the specification is a
blog post the team wanted to write anyway, in their own words rather than in
Gherkin's, and compiled into the tests rather than interpreted at run time.

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
`},{file:"worlds/index.md",markdown:`---
title: Worlds
summary: The fractal planet generator from around 2000, in the browser, with the dials exposed.
order: 8
theme: dark
sky: stars
---

# Worlds

[Mons fractals](https://david-rodenas.com/mons-fractals/) was a university
graphics assignment from around 2000: Java 1.1.8 on MS-DOS, a pipeline
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
`}],zn="---";function ul(e){return(/^"(.*)"$/.exec(e)??/^'(.*)'$/.exec(e))?.[1]??e}function ml(e){const t=e.replace(/\r\n?/g,`
`).split(`
`);if(t[0]?.trim()!==zn)return{fields:{},body:e.trim()};const n=t.indexOf(zn,1);if(n<0)return{fields:{},body:e.trim()};const a={};for(const o of t.slice(1,n)){const s=o.indexOf(":");s<=0||(a[o.slice(0,s).trim()]=ul(o.slice(s+1).trim()))}return{fields:a,body:t.slice(n+1).join(`
`).trim()}}function pl(e){const n=e.replace(/\.md$/,"").replace(/(^|\/)index$/,"");return n===""?"/":`/${n}/`}function fl(e){if(e==="/")return null;const t=e.slice(0,-1);return t.slice(0,t.lastIndexOf("/")+1)}function Gn(e){if(e==="/")return"/";const t=e.slice(0,-1);return t.slice(t.lastIndexOf("/")+1)}function gl(e){const{fields:t,body:n}=ml(e.markdown),a=pl(e.file);return{file:e.file,route:a,parent:fl(a),name:Gn(a),title:t.title??Gn(a),summary:t.summary??"",order:Number(t.order??"100"),body:n,fields:t}}function _n(e,t){return e.order-t.order||e.name.localeCompare(t.name)}class wl{byRoute;constructor(t){const n=t.map(gl).sort(_n);this.byRoute=new Map(n.map(a=>[a.route,a]))}get pages(){return[...this.byRoute.values()]}at(t){return this.byRoute.get(t)}childrenOf(t){return this.pages.filter(n=>n.parent===t).sort(_n)}trailTo(t){const n=this.at(t);return n?n.parent===null?[n]:[...this.trailTo(n.parent),n]:[]}}const ye=new wl(dl);function Jn(){const e=[...Pa,...we.flatMap(h=>h.commands??[])],t=Object.assign({},...we.map(h=>h.apps??{})),a=(h=>h.endsWith("/")?h:`${h}/`)(window.location.pathname),o=ye.at(a);let s=Nn(t,{site:ye}),r=null;const i=zi(ye,(h,d)=>{s(),s=Nn(t,{site:ye});for(const m of we)m.arrive?.(h);d||r?.moveTo(h.route)});if(r=cl(ye,o?a:"/",{moveTo:h=>i(h,{keep:!0}),clearPage:()=>{s(),s=()=>{},document.querySelector("main")?.replaceChildren()},commands:e}),o)for(const h of we)h.arrive?.(o);const c={run:h=>r?.run(h)};for(const h of we)h.install?.(c)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Jn):Jn();
