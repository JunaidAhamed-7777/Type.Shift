const PARAGRAPHS = {
  easy: [
    // Existing 5 easy paragraphs
    {
      text: "Once there were four children named Peter, Susan, Edmund, and Lucy who were sent away from London to live in a large old house full of rooms and long quiet hallways.",
      source: " The Lion, the Witch and the Wardrobe · C.S. Lewis · Chapter 1",
      image: "/assets/easy/lionwitchwardrobe.png",
    },
    {
      text: "The Cat in the Hat came in with a bump and a grin, saying he could show tricks and games to make a dull rainy day much more fun for everyone in the house.",
      source: " The Cat in the Hat · Dr. Seuss · Opening Section",
      image: "/assets/easy/catinthehat.png",
    },
    {
      text: "Max sailed off through night and day and in and out of weeks and almost over a year to where the wild things are, and he found creatures who roared their terrible roars.",
      source: " Where the Wild Things Are · Maurice Sendak · Journey Scene",
      image: "/assets/easy/wherethewildthingsare.png",
    },
    {
      text: "I will not eat them in a house, I will not eat them with a mouse, I do not like them here or there, I do not like them anywhere, but I might try them someday.",
      source: " Green Eggs and Ham · Dr. Seuss · Repetition Section",
      image: "/assets/easy/greeneggsandham.png",
    },
    {
      text: "In a small green room there was a quiet bed and a bright moon shining through the window, and everything slowly grew calm as the night became deeper and softer.",
      source: " Goodnight Moon · Margaret Wise Brown · Closing Scene",
      image: "/assets/easy/goodnightmoon.png",
    },

    // --- 50 new Easy paragraphs (Children's books, 150–200 characters) ---
    {
      text: "The little girl wore a red hood and carried a basket of goodies to her grandmother's house, but a sly wolf watched her from the trees with hungry eyes.",
      source: " Little Red Riding Hood · Traditional · Opening",
      image: "/assets/easy/littleredridinghood.png",
    },
    {
      text: "Alice followed the white rabbit down the hole and found herself in a world of nonsense, where the Queen shouted off with her head and the Cheshire Cat grinned.",
      source: " Alice's Adventures in Wonderland · Lewis Carroll · Chapter 1",
      image: "/assets/easy/aliceinwonderland.png",
    },
    {
      text: "Peter Pan flew through the night sky with Wendy and her brothers, leading them to Neverland where lost boys played and Captain Hook plotted his revenge.",
      source: " Peter Pan · J.M. Barrie · Flight Scene",
      image: "/assets/easy/peterpan.png",
    },
    {
      text: "Winnie the Pooh loved honey more than anything, and he often got stuck in narrow places while trying to reach a pot of the sweet golden treat.",
      source: " Winnie the Pooh · A.A. Milne · Pooh's Adventure",
      image: "/assets/easy/winniethepooh.png",
    },
    {
      text: "The very hungry caterpillar ate through apples, pears, and strawberries, growing bigger and bigger until he built a cocoon and became a beautiful butterfly.",
      source: " The Very Hungry Caterpillar · Eric Carle · Story Summary",
      image: "/assets/easy/hungrycaterpillar.png",
    },
    {
      text: "Charlie found a golden ticket hidden inside a chocolate wrapper, and soon he was touring Willy Wonka's fantastic factory full of rivers of chocolate and fizzy lifting drinks.",
      source: " Charlie and the Chocolate Factory · Roald Dahl · Ticket Discovery",
      image: "/assets/easy/charliechocolate.png",
    },
    {
      text: "The little prince lived on a tiny asteroid with a single rose, and he traveled to other planets to meet strange grown-ups before coming to Earth.",
      source: " The Little Prince · Antoine de Saint-Exupéry · Chapter 2",
      image: "/assets/easy/littleprince.png",
    },
    {
      text: "Matilda was a brilliant girl who loved reading books, but her cruel parents and the terrifying headmistress made her life difficult until she discovered her magical powers.",
      source: " Matilda · Roald Dahl · Introduction",
      image: "/assets/easy/matilda.png",
    },
    {
      text: "The wind blew through the trees and carried the seeds of the dandelion far away, each one drifting to a new place where a new flower would grow.",
      source: " The Dandelion Seed · Joseph Anthony · Opening",
      image: "/assets/easy/dandelionseed.png",
    },
    {
      text: "Peter Rabbit sneaked into Mr. McGregor's garden to feast on fresh vegetables, but he had to run fast to escape the farmer's sharp hoe and angry shouts.",
      source: " The Tale of Peter Rabbit · Beatrix Potter · Garden Scene",
      image: "/assets/easy/peterrabbit.png",
    },
    {
      text: "A tiny mouse found a big lion caught in a net, and he gnawed through the ropes to set him free, proving that even the smallest friend can be a great help.",
      source: " The Lion and the Mouse · Aesop's Fables · Moral",
      image: "/assets/easy/lionandmouse.png",
    },
    {
      text: "The rainbow fish had shimmering scales of every color, and he learned that sharing his beauty with others brought him more joy than keeping it all to himself.",
      source: " The Rainbow Fish · Marcus Pfister · Story",
      image: "/assets/easy/rainbowfish.png",
    },
    {
      text: "Baba Yaga lived in a hut that stood on chicken legs, and she flew around in a mortar, kidnapping children who strayed too deep into the forest.",
      source: " Baba Yaga · Russian Folktale · Introduction",
      image: "/assets/easy/baba-yaga.png",
    },
    {
      text: "The gingerbread man ran away from the old woman and the cow, shouting as fast as he could, but the clever fox finally outran him and ate him up.",
      source: " The Gingerbread Man · Traditional · Chase Scene",
      image: "/assets/easy/the-gingerbread-man.png",
    },
    {
      text: "Snow White fled into the forest to escape the wicked queen, and she found a cottage where seven dwarfs welcomed her with kindness and a warm bed.",
      source: " Snow White · Brothers Grimm · Chapter 2",
      image: "/assets/easy/snowwhite.png",
    },
    {
      text: "The boy who cried wolf learned a hard lesson when the villagers stopped believing him; after the real wolf came, nobody came to help him at all.",
      source: " The Boy Who Cried Wolf · Aesop's Fables · Moral",
      image: "/assets/easy/the-boy-who-cried-wolf.png",
    },
    {
      text: "A young girl named Goldilocks entered the house of three bears and tasted their porridge, finding one bowl too hot, one too cold, and one just right.",
      source: " Goldilocks and the Three Bears · Traditional · Scene",
      image: "/assets/easy/goldilocks-and-the-three-bears.png",
    },
    {
      text: "The ugly duckling was teased by all the farmyard animals, but when he grew up he transformed into a graceful swan, the most beautiful bird of all.",
      source: " The Ugly Duckling · Hans Christian Andersen · Transformation",
      image: "/assets/easy/uglyduckling.png",
    },
    {
      text: "The elves helped the poor shoemaker finish his work every night, and when he discovered them, he made them tiny clothes and shoes as a thank you.",
      source: " The Elves and the Shoemaker · Brothers Grimm · Story",
      image: "/assets/easy/elvesandshoemaker.png",
    },
    {
      text: "A young boy named Jack traded his cow for magic beans, and a giant beanstalk grew to the sky where a huge giant lived with a golden harp and hen.",
      source: " Jack and the Beanstalk · Traditional · Opening",
      image: "/assets/easy/jack-and-the-beanstalk.png",
    },
    {
      text: "The little mermaid longed to live on land and fell in love with a prince, so she traded her voice to a sea witch for a chance to win his heart.",
      source: " The Little Mermaid · Hans Christian Andersen · Opening",
      image: "/assets/easy/littlemermaid.png",
    },
    {
      text: "The princess and the pea: a royal girl felt a tiny pea through twenty mattresses, proving she was a true princess, and the prince married her at once.",
      source: " The Princess and the Pea · Hans Christian Andersen · Summary",
      image: "/assets/easy/princesspea.png",
    },
    {
      text: "The three little pigs built houses of straw, sticks, and bricks, but only the brick house could withstand the wolf's huffing and puffing.",
      source: " The Three Little Pigs · Traditional · Story",
      image: "/assets/easy/threelittlepigs.png",
    },
    {
      text: "Little Red Hen found some wheat and asked for help, but when nobody helped, she baked the bread all by herself and ate it with great satisfaction.",
      source: " The Little Red Hen · Traditional · Moral",
      image: "/assets/easy/the-little-red-hen.png",
    },
    {
      text: "The tortoise and the hare raced, and the slow tortoise won because the hare took a nap and underestimated his opponent's steady pace.",
      source: " The Tortoise and the Hare · Aesop's Fables · Moral",
      image: "/assets/easy/tortoisehare.png",
    },
    {
      text: "The ant and the grasshopper: the ant worked hard all summer storing food while the grasshopper played, and when winter came, the grasshopper had nothing to eat.",
      source: " The Ant and the Grasshopper · Aesop's Fables · Moral",
      image: "/assets/easy/the-ant-and-the-grasshopper.png",
    },
    {
      text: "The town mouse and the country mouse visited each other, and each preferred their own home, finding peace in simplicity over luxury with danger.",
      source: " The Town Mouse and the Country Mouse · Aesop's Fables · Story",
      image: "/assets/easy/the-town-mouse-and-the-country-mouse.png",
    },
    {
      text: "The fox and the grapes: a hungry fox saw a bunch of grapes high on a vine, but after trying to reach them, he said they were sour and walked away.",
      source: " The Fox and the Grapes · Aesop's Fables · Moral",
      image: "/assets/easy/the-fox-and-the-grapes.png",
    },
    {
      text: "The farmer and his sons: before dying, the farmer told his sons that treasure was buried in the fields, and they dug so much that they improved the soil and grew better crops.",
      source: " The Farmer and His Sons · Aesop's Fables · Story",
      image: "/assets/easy/the-farmer-and-his-sons.png",
    },
    {
      text: "The dog and his shadow: a dog carrying a bone saw his reflection in the water and dropped his bone to grab the larger one, only to lose both.",
      source: " The Dog and His Shadow · Aesop's Fables · Moral",
      image: "/assets/easy/the-dog-and-his-shadow.png",
    },
    {
      text: "The goose that laid the golden eggs: a farmer was greedy and killed the goose to get all the gold at once, but found nothing and lost his daily treasure.",
      source: " The Goose that Laid the Golden Eggs · Aesop's Fables · Moral",
      image: "/assets/easy/the-goose-that-laid-the-golden-eggs.png",
    },
    {
      text: "The tiger, the Brahmin, and the jackal: a man was tricked by a tiger, but the clever jackal helped the man trap the tiger back in the cage.",
      source: " The Tiger, the Brahmin, and the Jackal · Indian Folktale · Story",
      image: "/assets/easy/the-tiger-the-brahmin-and-the-jackal.png",
    },
    {
      text: "The monkey and the crocodile: a crocodile tried to trick a monkey into giving him his heart, but the monkey escaped and taught the crocodile a lesson.",
      source: " The Monkey and the Crocodile · Panchatantra · Tale",
      image: "/assets/easy/monkeycrocodile.png",
    },
    {
      text: "The lion's share: a lion hunting with a cow, goat, and sheep divided the prey unfairly, taking everything for himself because of his strength.",
      source: " The Lion's Share · Aesop's Fables · Moral",
      image: "/assets/easy/lionsshare.png",
    },
    {
      text: "The hare with many friends: a hare claimed to have many friends, but when a wolf attacked, no one came to help, teaching that true friends are loyal.",
      source: " The Hare with Many Friends · Aesop's Fables · Moral",
      image: "/assets/easy/the-hare-with-many-friends.png",
    },
    {
      text: "The crow and the pitcher: a thirsty crow dropped pebbles into a pitcher to raise the water level until he could drink, showing cleverness and persistence.",
      source: " The Crow and the Pitcher · Aesop's Fables · Story",
      image: "/assets/easy/the-crow-and-the-pitcher.png",
    },
    {
      text: "The north wind and the sun: they argued who was stronger, and the sun won by shining warmly to make a traveler remove his coat, rather than forcing him.",
      source: " The North Wind and the Sun · Aesop's Fables · Moral",
      image: "/assets/easy/the-north-wind-and-the-sun.png",
    },
    {
      text: "The bundle of sticks: a father taught his sons that united they are strong, but divided they break easily, so they must stay together as a family.",
      source: " The Bundle of Sticks · Aesop's Fables · Moral",
      image: "/assets/easy/the-bundle-of-sticks.png",
    },
    {
      text: "The ant and the dove: an ant saved a dove from a hunter by stinging him, and later the dove rescued the ant from drowning, showing kindness repaid.",
      source: " The Ant and the Dove · Aesop's Fables · Story",
      image: "/assets/easy/the-ant-and-the-dove.png",
    },
    {
      text: "The frog and the ox: a frog tried to puff up to be as big as an ox, but he burst, teaching that pride and envy can lead to disaster.",
      source: " The Frog and the Ox · Aesop's Fables · Moral",
      image: "/assets/easy/the-frog-and-the-ox.png",
    },
    {
      text: "The wolves and the sheep: the wolves proposed a truce if the sheep gave up their dogs, but without protection, the wolves soon attacked them.",
      source: " The Wolves and the Sheep · Aesop's Fables · Moral",
      image: "/assets/easy/the-wolves-and-the-sheep.png",
    },
    {
      text: "The vain jackdaw: a bird dressed in peacock feathers to look beautiful, but the peacocks saw through the disguise and the jackdaw was shamed.",
      source: " The Vain Jackdaw · Aesop's Fables · Moral",
      image: "/assets/easy/the-vain-jackdaw.png",
    },
    {
      text: "The shepherd's boy and the wolf: the boy cried wolf so many times that when the wolf truly came, nobody believed him, and his sheep were lost.",
      source: " The Shepherd's Boy and the Wolf · Aesop's Fables · Story",
      image: "/assets/easy/the-shepherds-boy-and-the-wolf.png",
    },
    {
      text: "The oak and the reed: a reed bent in the storm while the mighty oak stood firm and was uprooted, showing that flexibility can be a strength.",
      source: " The Oak and the Reed · Aesop's Fables · Moral",
      image: "/assets/easy/the-oak-and-the-reed.png",
    },
    {
      text: "The fisherman and the little fish: a fisherman caught a small fish that begged for release, promising to grow bigger, but the fisherman kept it, valuing the sure catch.",
      source: " The Fisherman and the Little Fish · Aesop's Fables · Moral",
      image: "/assets/easy/the-fisherman-and-the-little-fish.png",
    },
    {
      text: "The monkey and the dolphin: a monkey convinced a dolphin to carry him to safety, but the dolphin discovered the monkey's lies and left him to drown.",
      source: " The Monkey and the Dolphin · Aesop's Fables · Story",
      image: "/assets/easy/the-monkey-and-the-dolphin.png",
    },
    {
      text: "The donkey and the grasshopper: a donkey wanted to sing like a grasshopper, but eating grasshoppers' food did not give him their voice, teaching we all have our own talents.",
      source: " The Donkey and the Grasshopper · Aesop's Fables · Moral",
      image: "/assets/easy/the-donkey-and-the-grasshopper.png",
    },
    {
      text: "The lion, the bear, and the fox: a lion and bear fought over a deer while a fox watched, and when they were exhausted, the fox stole the deer.",
      source: " The Lion, the Bear, and the Fox · Aesop's Fables · Story",
      image: "/assets/easy/the-lion-the-bear-and-the-fox.png",
    },
    {
      text: "The horse and the stag: a horse asked a hunter for help to punish a stag, but ended up being enslaved by the hunter, regretting the deal.",
      source: " The Horse and the Stag · Aesop's Fables · Moral",
      image: "/assets/easy/the-horse-and-the-stag.png",
    },
    {
      text: "The serpent and the file: a serpent tried to bite a file, thinking it was alive, but only damaged its teeth, showing that some things are not worth attacking.",
      source: " The Serpent and the File · Aesop's Fables · Moral",
      image: "/assets/easy/the-serpent-and-the-file.png",
    },
    {
      text: "The camel and the Arab: a camel asked to put his head in the tent to escape the cold, then his neck, then his whole body, eventually pushing the Arab out.",
      source: " The Camel and the Arab · Aesop's Fables · Story",
      image: "/assets/easy/the-camel-and-the-arab.png",
    },
    {
      text: "The peacock and the crane: a peacock envied the crane's ability to fly, but the crane reminded him that beauty is not everything, and they each have their own gifts.",
      source: " The Peacock and the Crane · Aesop's Fables · Moral",
      image: "/assets/easy/the-peacock-and-the-crane.png",
    },
    {
      text: "The wolf in sheep's clothing: a wolf disguised himself as a sheep to eat the flock, but the shepherd found him and killed him, teaching that evil cannot hide forever.",
      source: " The Wolf in Sheep's Clothing · Aesop's Fables · Moral",
      image: "/assets/easy/the-wolf-in-sheeps-clothing.png",
    },
  ],
  medium: [
    // Existing 5 medium paragraphs
    {
      text: "It was the best of times, it was the worst of times, a period filled with hope and despair, where everything seemed possible yet uncertain, and the world moved forward in ways no one could fully understand.",
      source: " A Tale of Two Cities · Charles Dickens · Book 1, Chapter 1",
      image: "/assets/medium/taleoftwocities.png",
    },
    {
      text: "Call me Ishmael. Some years ago, never mind how long precisely, I found myself drawn to the sea, seeking a sense of purpose and adventure in a world that often felt too confined.",
      source: " Moby Dick · Herman Melville · Chapter 1",
      image: "/assets/medium/mobydick.png",
    },
    {
      text: "It is a truth universally acknowledged that a single man of fortune must be in want of a wife, though the feelings and views of such a man may be quite unknown to those around him.",
      source: " Pride and Prejudice · Jane Austen · Chapter 1",
      image: "/assets/medium/prideandprejudice.png",
    },
    {
      text: "The man in black fled across the desert, and the gunslinger followed, moving steadily under the burning sun, driven by a purpose that stretched far beyond the horizon.",
      source: " The Gunslinger · Stephen King · Chapter 1",
      image: "/assets/medium/gunslinger.png",
    },
    {
      text: "All we have to decide is what to do with the time that is given to us, for even the smallest choices can shape the path ahead and lead us toward courage or regret.",
      source: " The Fellowship of the Ring · J.R.R. Tolkien · Book 1",
      image: "/assets/medium/fellowshipofthering.png",
    },

    // --- 50 new Medium paragraphs (Novels, 200–250 characters) ---
    {
      text: "In the summer of 1922, Nick Carraway moved to West Egg, Long Island, where he encountered the lavish parties and mysterious wealth of Jay Gatsby, a man driven by love.",
      source: " The Great Gatsby · F. Scott Fitzgerald · Chapter 1",
      image: "/assets/medium/greatgatsby.png",
    },
    {
      text: "Winston Smith lived in a world of constant surveillance and lies, where the Party controlled everything, and he secretly dreamed of rebellion and a love that could break the chains.",
      source: " Nineteen Eighty-Four · George Orwell · Part 1",
      image: "/assets/medium/1984.png",
    },
    {
      text: "Atticus Finch taught his children that courage was not a man with a gun, but when you know you're licked before you begin but you begin anyway and see it through no matter what.",
      source: " To Kill a Mockingbird · Harper Lee · Chapter 11",
      image: "/assets/medium/tokillamockingbird.png",
    },
    {
      text: "The old man and the sea: Santiago struggled against the giant marlin for three days, his hands bloody and his spirit unbroken, for he believed that a man can be destroyed but not defeated.",
      source: " The Old Man and the Sea · Ernest Hemingway · Final Scene",
      image: "/assets/medium/oldmansea.png",
    },
    {
      text: "Holden Caulfield stood on the edge of adulthood, feeling alienated and cynical, yet desperate to protect the innocence of children from the phony world he despised.",
      source: " The Catcher in the Rye · J.D. Salinger · Chapter 1",
      image: "/assets/medium/catcherintherye.png",
    },
    {
      text: "Janie Crawford journeyed through three marriages, seeking true love and self-fulfillment, finally finding her voice in the horizon of her own identity.",
      source: " Their Eyes Were Watching God · Zora Neale Hurston · Overview",
      image: "/assets/medium/theireyes.png",
    },
    {
      text: "A tramp and a young boy named Jim Hawkins discovered a treasure map, and soon they were aboard a ship sailing toward an island full of pirates, danger, and gold.",
      source: " Treasure Island · Robert Louis Stevenson · Chapter 1",
      image: "/assets/medium/treasureisland.png",
    },
    {
      text: "The Martian chronicles told of Earthmen colonizing Mars, only to find that the red planet held its own ancient secrets and a longing for a lost past.",
      source: " The Martian Chronicles · Ray Bradbury · Prologue",
      image: "/assets/medium/martianchronicles.png",
    },
    {
      text: "Hester Prynne stood on the scaffold wearing the scarlet letter A, an emblem of shame that would follow her, yet she bore it with a dignity that transformed its meaning.",
      source: " The Scarlet Letter · Nathaniel Hawthorne · Chapter 2",
      image: "/assets/medium/scarletletter.png",
    },
    {
      text: "Kafka's protagonist, Gregor Samsa, woke one morning to find himself transformed into a monstrous insect, and his family's horror slowly turned into neglect and resentment.",
      source: " The Metamorphosis · Franz Kafka · Opening",
      image: "/assets/medium/metamorphosis.png",
    },
    {
      text: "In a bleak and cold London, Oliver Twist escaped the workhouse and fell into a den of thieves, but his innate goodness and a kind benefactor eventually saved him.",
      source: " Oliver Twist · Charles Dickens · Chapter 3",
      image: "/assets/medium/olivertwist.png",
    },
    {
      text: "The great white whale Moby Dick had already taken Captain Ahab's leg, and now the captain was obsessed with vengeance, dragging his crew into a fateful hunt.",
      source: " Moby Dick · Herman Melville · Chapter 36",
      image: "/assets/medium/mobydick2.png",
    },
    {
      text: "Scout Finch and her brother Jem explored the mysteries of their small town, learning about prejudice and bravery as their father defended a black man accused of a crime.",
      source: " To Kill a Mockingbird · Harper Lee · Chapter 9",
      image: "/assets/medium/tokillamockingbird2.png",
    },
    {
      text: "Anna Karenina saw the handsome Vronsky at the train station, and their fateful encounter set in motion a passionate affair that would lead to tragedy and social ruin.",
      source: " Anna Karenina · Leo Tolstoy · Part 1, Chapter 18",
      image: "/assets/medium/annakarenina.png",
    },
    {
      text: "Raskolnikov, a poor student, conceived a terrible plan to murder a pawnbroker, believing he was above ordinary morality, but guilt and paranoia soon consumed him.",
      source: " Crime and Punishment · Fyodor Dostoevsky · Part 1",
      image: "/assets/medium/crimeandpunishment.png",
    },
    {
      text: "The narrator of The Great Gatsby observed the green light at the end of Daisy's dock, a symbol of his unattainable dream, and he stretched his arms toward it every night.",
      source: " The Great Gatsby · F. Scott Fitzgerald · Chapter 1",
      image: "/assets/medium/greatgatsby2.png",
    },
    {
      text: "On the road to a distant city, two drifters, George and Lennie, dreamed of owning a small farm, but their friendship was tested by Lennie's strength and innocence.",
      source: " Of Mice and Men · John Steinbeck · Chapter 1",
      image: "/assets/medium/ofmiceandmen.png",
    },
    {
      text: "The sun also rose on a group of expatriates in Paris and Spain, their lives filled with drinking and aimless travel, yet they searched for meaning in a world scarred by war.",
      source: " The Sun Also Rises · Ernest Hemingway · Book 1",
      image: "/assets/medium/sunalsorises.png",
    },
    {
      text: "Elizabeth Bennett refused Mr. Collins's proposal and later clashed with Mr. Darcy's pride, but she gradually realized her own prejudice and the depth of his true character.",
      source: " Pride and Prejudice · Jane Austen · Chapter 19",
      image: "/assets/medium/prideandprejudice2.png",
    },
    {
      text: "The hobbit Bilbo Baggins set out on an unexpected journey, leaving his comfortable hole to face dragons, goblins, and the dangerous ring that would change his world forever.",
      source: " The Hobbit · J.R.R. Tolkien · Chapter 1",
      image: "/assets/medium/thehobbit.png",
    },
    {
      text: "In the heart of the American West, the frontier town of Lonesome Dove was home to two retired Texas Rangers, who embarked on a cattle drive that tested their friendship.",
      source: " Lonesome Dove · Larry McMurtry · Chapter 2",
      image: "/assets/medium/lonesomedove.png",
    },
    {
      text: "Beloved, a ghostly presence, haunted Sethe's house, a reminder of the trauma of slavery, and the novel explores motherhood, memory, and the struggle for freedom.",
      source: " Beloved · Toni Morrison · Part 1",
      image: "/assets/medium/beloved.png",
    },
    {
      text: "A young boy named Sam Gribley ran away to the Catskill Mountains and lived alone in the wilderness, learning to survive by observing nature and relying on his own skills.",
      source: " My Side of the Mountain · Jean Craighead George · Opening",
      image: "/assets/medium/mysideofthemountain.png",
    },
    {
      text: "In a future where society is divided into factions based on human virtues, a girl named Tris discovers she is Divergent, a threat to the order, and must hide her true identity.",
      source: " Divergent · Veronica Roth · Chapter 1",
      image: "/assets/medium/divergent.png",
    },
    {
      text: "The island of Utopia seemed perfect, but the narrator soon learned that its harmony came at the cost of individual freedom, and he questioned the price of a flawless society.",
      source: " Utopia · Thomas More · Book 1",
      image: "/assets/medium/utopia.png",
    },
    {
      text: "A young boy named Jonas lives in a world without pain or choice, until he is chosen as the Receiver of Memory, and he discovers the truths of human emotion.",
      source: " The Giver · Lois Lowry · Chapter 1",
      image: "/assets/medium/giver.png",
    },
    {
      text: "The adventures of Huckleberry Finn and Jim, a runaway slave, along the Mississippi River, challenged the norms of society and friendship in the pre-Civil War South.",
      source: " Adventures of Huckleberry Finn · Mark Twain · Chapter 1",
      image: "/assets/medium/huckfinn.png",
    },
    {
      text: "The mysterious woman in white appeared on the moonlit road, and the young artist, Walter Hartright, was drawn into a web of deceit and injustice that spanned generations.",
      source: " The Woman in White · Wilkie Collins · Part 1",
      image: "/assets/medium/womaninwhite.png",
    },
    {
      text: "The Count of Monte Cristo, wrongfully imprisoned, escaped and transformed into a wealthy and vengeful man who meticulously destroyed the enemies who had betrayed him.",
      source: " The Count of Monte Cristo · Alexandre Dumas · Chapter 1",
      image: "/assets/medium/countmontecristo.png",
    },
    {
      text: "In the bleak and brutal world of the Northern Kingdom, a young outcast, Lyra Belacqua, sets out to rescue her friend from kidnappers and uncovers a plot that spans universes.",
      source: " The Golden Compass · Philip Pullman · Chapter 1",
      image: "/assets/medium/goldencompass.png",
    },
    {
      text: "A quiet schoolteacher, Jean Valjean, redeemed himself from a life of crime through love and sacrifice, but his past pursued him as he cared for the orphan Cosette.",
      source: " Les Misérables · Victor Hugo · Part 1",
      image: "/assets/medium/lesmiserables.png",
    },
    {
      text: "The detective Sherlock Holmes and his friend Dr. Watson solved many mysteries, from the hound of the Baskervilles to the scandal in Bohemia, using logic and deduction.",
      source: " The Adventures of Sherlock Holmes · Arthur Conan Doyle · Introduction",
      image: "/assets/medium/sherlockholmes.png",
    },
    {
      text: "In the small town of Castle Rock, a devoted fan becomes obsessed with his favorite author, leading to a dangerous game of imitation and terror.",
      source: " Misery · Stephen King · Chapter 1",
      image: "/assets/medium/misery.png",
    },
    {
      text: "The narrator of Invisible Man navigated a world that refused to see him, moving from the South to Harlem, and grappling with identity, race, and political ideology.",
      source: " Invisible Man · Ralph Ellison · Prologue",
      image: "/assets/medium/invisibleman.png",
    },
    {
      text: "The ship named Demeter carried a mysterious cargo from Transylvania to England, and soon the passengers realized that something evil and undead had boarded with them.",
      source: " Dracula · Bram Stoker · Chapter 2",
      image: "/assets/medium/dracula.png",
    },
    {
      text: "In a world where people are assigned roles at birth, a young female prodigy, Ender's sister, fought against the system to prove that individuality could change the future.",
      source: " Ender's Game · Orson Scott Card · Chapter 1",
      image: "/assets/medium/endersgame.png",
    },
    {
      text: "A soldier returned home from the Great War changed forever, and in his hometown, he struggled to find meaning and connection in a world that had moved on without him.",
      source: " All Quiet on the Western Front · Erich Maria Remarque · Chapter 1",
      image: "/assets/medium/all-quiet-on-the-western-front.png",
    },
    {
      text: "The narrative of the slave Frederick Douglass showed the brutal reality of bondage and the power of literacy, as he escaped and became a leader in the abolitionist movement.",
      source: " Narrative of the Life of Frederick Douglass · Frederick Douglass · Chapter 1",
      image: "/assets/medium/frederickdouglass.png",
    },
    {
      text: "An eccentric millionaire made a bet with a man to live inside a department store for a year, and the strange contest revealed the absurdity of wealth and consumerism.",
      source: " The Store · Sinclair Lewis · Section 1",
      image: "/assets/medium/thestore.png",
    },
    {
      text: "In a dystopian future, books are banned and firefighters burn them; a fireman named Montag begins to question his role and seeks to preserve forbidden knowledge.",
      source: " Fahrenheit 451 · Ray Bradbury · Part 1",
      image: "/assets/medium/fahrenheit451.png",
    },
    {
      text: "A family of five from Kansas is swept away by a tornado to the Land of Oz, and they journey through a magical world to find the wizard who can grant their wishes.",
      source: " The Wonderful Wizard of Oz · L. Frank Baum · Chapter 1",
      image: "/assets/medium/wizardofoz.png",
    },
    {
      text: "A young gentleman, Phileas Fogg, makes a wager that he can travel around the world in eighty days, and he embarks on an adventure filled with obstacles and mystery.",
      source: " Around the World in Eighty Days · Jules Verne · Chapter 1",
      image: "/assets/medium/aroundtheworld.png",
    },
    {
      text: "The tale of a solitary lighthouse keeper and his wife, as they care for a newborn girl washed ashore, exploring love, loss, and the ethical dilemmas of raising a child.",
      source: " The Light Between Oceans · M.L. Stedman · Chapter 1",
      image: "/assets/medium/lightbetweenoceans.png",
    },
    {
      text: "The story of a family in apartheid-era South Africa, the tyranny of the regime, and the courage of a black woman who fights for justice and her children's future.",
      source: " Cry, the Beloved Country · Alan Paton · Book 1",
      image: "/assets/medium/crybelovedcountry.png",
    },
    {
      text: "A young orphan, Jane Eyre, endures a harsh childhood, becomes a governess, and falls in love with her employer, but secrets from his past threaten their happiness.",
      source: " Jane Eyre · Charlotte Brontë · Chapter 1",
      image: "/assets/medium/janeeyre.png",
    },
    {
      text: "A mysterious benefactor sends a young boy to an exclusive boarding school, where he discovers a hidden society of sorcerers and a destiny that links him to a dark lord.",
      source: " Harry Potter and the Sorcerer's Stone · J.K. Rowling · Chapter 1",
      image: "/assets/medium/harrypotter.png",
    },
    {
      text: "The lost city of Atlantis, the brave hero, and the dangerous mission to discover the underwater world, testing the limits of courage and technology.",
      source: " Twenty Thousand Leagues Under the Sea · Jules Verne · Part 1",
      image: "/assets/medium/twentythousandleagues.png",
    },
    {
      text: "The trials of a young woman who must navigate the complexities of love, family, and career in early 20th-century England, striving for independence and respect.",
      source: " The House of Mirth · Edith Wharton · Chapter 1",
      image: "/assets/medium/houseofmirth.png",
    },
    {
      text: "A man named Thomas awakens in a strange place with no memories, and he must escape a maze filled with monstrous creatures, uncovering the secrets of a dystopian experiment.",
      source: " The Maze Runner · James Dashner · Chapter 1",
      image: "/assets/medium/mazerunner.png",
    },
    {
      text: "In a future where happiness is mandatory and sadness is a crime, a man named John questions the system and seeks genuine emotion, risking everything for truth.",
      source: " Brave New World · Aldous Huxley · Chapter 1",
      image: "/assets/medium/bravenewworld.png",
    },
    {
      text: "The story of a brilliant but reclusive mathematician who cracks an unbreakable code, only to find his discovery threatens national security and his own life.",
      source: " The Code Book · Simon Singh · Chapter 1",
      image: "/assets/medium/codebook.png",
    },
    {
      text: "A young girl named Meg Murray travels through time and space to rescue her missing father, accompanied by her brother and a friend, facing cosmic evil and finding inner strength.",
      source: " A Wrinkle in Time · Madeleine L'Engle · Chapter 1",
      image: "/assets/medium/wrinkleintime.png",
    },
  ],
  hard: [
    // Existing 5 hard paragraphs
    {
      text: "The laws of physics remain consistent across all inertial frames of reference, forming the basis of relativity, where measurements of time and space depend on the observer, yet the fundamental principles governing them remain unchanged.",
      source: " Relativity: The Special and General Theory · Albert Einstein · Part 1",
      image: "/assets/hard/relativity.png",
    },
    {
      text: "Natural selection operates through the preservation of favorable variations and the rejection of harmful ones, gradually shaping species over generations as organisms adapt to their environment in subtle yet powerful ways.",
      source: " On the Origin of Species · Charles Darwin · Chapter 4",
      image: "/assets/hard/originofspecies.png",
    },
    {
      text: "Programs must be written for people to read and only incidentally for machines to execute, emphasizing clarity, structure, and abstraction as essential qualities in the development of reliable and maintainable software systems.",
      source: " Structure and Interpretation of Computer Programs · Abelson & Sussman · Chapter 1",
      image: "/assets/hard/structureandinterpretationofcomputerprograms.png",
    },
    {
      text: "Information can be understood as the resolution of uncertainty, where communication systems are designed to encode, transmit, and decode messages efficiently while minimizing loss and distortion in the presence of noise.",
      source: " A Mathematical Theory of Communication · Claude Shannon · Section 1",
      image: "/assets/hard/mathematicaltheoryofcommunication.png",
    },
    {
      text: "The universe follows a set of laws that may not always align with human intuition, yet through observation, mathematics, and experimentation, we can gradually uncover patterns that explain even the most complex phenomena.",
      source: " The Grand Design · Stephen Hawking · Chapter 1",
      image: "/assets/hard/granddesign.png",
    },

    // --- 50 new Hard paragraphs (Scientific articles, 250–300 characters) ---
    {
      text: "Quantum mechanics challenges classical determinism by asserting that particles exist in superpositions of states until measured, and the act of observation collapses these probabilities into a single outcome.",
      source: " Quantum Physics · Feynman Lectures · Vol III",
      image: "/assets/hard/feynman-lectures-vol-iii.png",
    },
    {
      text: "The theory of evolution by natural selection explains the diversity of life through inherited variations, competition for resources, and differential reproductive success over vast timescales.",
      source: " The Blind Watchmaker · Richard Dawkins · Chapter 3",
      image: "/assets/hard/blindwatchmaker.png",
    },
    {
      text: "In computational complexity, NP-complete problems are those for which a solution can be verified quickly, but finding one is believed to require exponential time, posing a central open question in computer science.",
      source: " Introduction to Algorithms · Cormen et al. · Chapter 34",
      image: "/assets/hard/npcomplete.png",
    },
    {
      text: "The second law of thermodynamics states that the entropy of an isolated system never decreases, providing a fundamental arrow of time and governing the direction of all macroscopic processes.",
      source: " Thermodynamics and Its Applications · Tester & Modell · Chapter 2",
      image: "/assets/hard/thermodynamics.png",
    },
    {
      text: "General relativity describes gravity as the curvature of spacetime caused by mass and energy, leading to predictions such as black holes, gravitational waves, and the expansion of the universe.",
      source: " General Relativity · Robert M. Wald · Chapter 1",
      image: "/assets/hard/generalrelativity.png",
    },
    {
      text: "The DNA double helix encodes genetic information in a sequence of nucleotides, and the central dogma of molecular biology explains how this information flows from DNA to RNA to protein.",
      source: " Molecular Biology of the Gene · Watson et al. · Chapter 6",
      image: "/assets/hard/dna.png",
    },
    {
      text: "Artificial neural networks are composed of layers of interconnected nodes that can learn complex patterns from data through backpropagation, revolutionizing fields like image recognition and natural language processing.",
      source: " Deep Learning · Goodfellow, Bengio, Courville · Chapter 1",
      image: "/assets/hard/deeplearning.png",
    },
    {
      text: "The cosmic microwave background radiation is a relic of the Big Bang, providing a near-perfect blackbody spectrum and revealing tiny fluctuations that seeded the formation of galaxies.",
      source: " Cosmology · Steven Weinberg · Chapter 2",
      image: "/assets/hard/cmb.png",
    },
    {
      text: "Game theory analyzes strategic interactions where the outcome for each participant depends on the choices of others, with concepts like Nash equilibrium and prisoner's dilemma shaping economics and political science.",
      source: " Strategy: An Introduction to Game Theory · Joel Watson · Chapter 1",
      image: "/assets/hard/gametheory.png",
    },
    {
      text: "The proof of Fermat's Last Theorem, finally solved by Andrew Wiles, combines modular forms and elliptic curves to show that no positive integers a, b, c satisfy a^n+b^n=c^n for n>2.",
      source: " Fermat's Enigma · Simon Singh · Summary",
      image: "/assets/hard/fermat.png",
    },
    {
      text: "Quantum entanglement shows that particles can be correlated in ways that defy classical explanation, with measurements on one instantly affecting the other, regardless of distance, a phenomenon that puzzled even Einstein.",
      source: " Quantum Theory · David Bohm · Chapter 5",
      image: "/assets/hard/entanglement.png",
    },
    {
      text: "The human genome project sequenced the entire human DNA, revealing approximately three billion base pairs and the location of over 20,000 protein-coding genes, opening new doors to personalized medicine.",
      source: " The Human Genome · Eric Lander · Scientific American",
      image: "/assets/hard/the-human-genome.png",
    },
    {
      text: "Topological insulators are materials that behave as insulators in their interior but conduct electricity on their surface, a property arising from the topology of electronic band structures.",
      source: " Condensed Matter Physics · Mahan · Chapter 10",
      image: "/assets/hard/topologicalinsulator.png",
    },
    {
      text: "The concept of infinity in mathematics is not a single entity but comes in different sizes, with Georg Cantor showing that the set of real numbers is uncountably infinite, larger than the natural numbers.",
      source: " Infinite Powers · Steven Strogatz · Chapter 7",
      image: "/assets/hard/infinity.png",
    },
    {
      text: "Evolutionary game theory applies Darwinian principles to strategic behavior, showing how cooperation can emerge through repeated interactions and reputation mechanisms even among selfish individuals.",
      source: " The Evolution of Cooperation · Robert Axelrod · Chapter 1",
      image: "/assets/hard/evolutiongame.png",
    },
    {
      text: "The Higgs field permeates all space, and its quantum excitation, the Higgs boson, gives mass to elementary particles via spontaneous symmetry breaking, a cornerstone of the Standard Model.",
      source: " Particle Physics · Griffiths · Chapter 2",
      image: "/assets/hard/higgs.png",
    },
    {
      text: "Machine learning algorithms can be roughly categorized into supervised, unsupervised, and reinforcement learning, each addressing different types of tasks from classification to control.",
      source: " Pattern Recognition and Machine Learning · Christopher Bishop · Chapter 1",
      image: "/assets/hard/machinelearning.png",
    },
    {
      text: "The concept of a black hole information paradox arises because Hawking radiation appears to destroy information, violating the unitary evolution of quantum mechanics, prompting efforts to reconcile gravity with quantum theory.",
      source: " The Black Hole War · Leonard Susskind · Part 1",
      image: "/assets/hard/blackholeinfo.png",
    },
    {
      text: "Stochastic processes, such as Markov chains and Brownian motion, provide mathematical frameworks for modeling randomness in physics, finance, and biology, with broad applications in diverse fields.",
      source: " Stochastic Processes · Sheldon Ross · Chapter 1",
      image: "/assets/hard/stochastic.png",
    },
    {
      text: "The search for extraterrestrial intelligence (SETI) employs radio telescopes to scan the cosmos for signals that might indicate the presence of technologically advanced civilizations beyond Earth.",
      source: " SETI · Carl Sagan · Cosmos · Episode 10",
      image: "/assets/hard/seti.png",
    },
    {
      text: "The principle of least action in physics states that the path taken by a physical system between two points is the one that minimizes the action, a concept fundamental to classical and quantum mechanics.",
      source: " The Feynman Lectures on Physics · Feynman · Vol I, Chapter 19",
      image: "/assets/hard/leastaction.png",
    },
    {
      text: "In systems biology, network motifs such as negative feedback loops and oscillators are essential for understanding the dynamics of cellular processes, including gene regulation and circadian rhythms.",
      source: " Systems Biology · Uri Alon · Chapter 2",
      image: "/assets/hard/systemsbiology.png",
    },
    {
      text: "The standard model of particle physics unifies three of the four fundamental forces, but gravity remains elusive, and physicists seek a theory of everything that reconciles quantum mechanics and general relativity.",
      source: " The Elegant Universe · Brian Greene · Part 1",
      image: "/assets/hard/elegantuniverse.png",
    },
    {
      text: "The study of chaotic systems reveals that deterministic equations can produce unpredictable behavior, sensitive to initial conditions, a phenomenon known as the butterfly effect, with implications for weather and climate.",
      source: " Chaos · James Gleick · Chapter 1",
      image: "/assets/hard/chaos.png",
    },
    {
      text: "The concept of emergence explains how complex systems exhibit properties that are not present in their individual components, such as consciousness from neurons or traffic flow from individual driver decisions.",
      source: " Emergence · Steven Johnson · Introduction",
      image: "/assets/hard/emergence.png",
    },
    {
      text: "In cognitive science, the study of language acquisition suggests that humans are born with an innate ability for grammar, a universal grammar that underlies all languages, proposed by Noam Chomsky.",
      source: " Syntactic Structures · Noam Chomsky · Chapter 1",
      image: "/assets/hard/chomsky.png",
    },
    {
      text: "The microbiome, the collection of microorganisms living in our gut, influences not only digestion but also immune function, metabolism, and even behavior, revealing a complex ecosystem within us.",
      source: " Gut: The Inside Story · Giulia Enders · Chapter 2",
      image: "/assets/hard/microbiome.png",
    },
    {
      text: "Nanotechnology manipulates matter at the atomic level to create novel materials and devices with applications from medicine to electronics, utilizing quantum effects that dominate at small scales.",
      source: " Nanotechnology: The Future · Drexler · Chapter 1",
      image: "/assets/hard/nanotechnology.png",
    },
    {
      text: "The Drake equation estimates the number of active, communicative extraterrestrial civilizations in the Milky Way, but many factors are uncertain, including the probability of life arising.",
      source: " Extraterrestrial · Avi Loeb · Chapter 3",
      image: "/assets/hard/drake.png",
    },
    {
      text: "The concept of entropy in information theory relates to the average amount of information produced by a stochastic source, measured in bits, and is fundamental to data compression and cryptography.",
      source: " Information Theory · Cover & Thomas · Chapter 2",
      image: "/assets/hard/informationtheory.png",
    },
    {
      text: "In evolutionary developmental biology, the study of how changes in gene expression patterns during development lead to morphological diversity, revealing the genetic basis of animal body plans.",
      source: " Evo-Devo · Sean B. Carroll · Chapter 4",
      image: "/assets/hard/evodevo.png",
    },
    {
      text: "The CRISPR-Cas9 system, a revolutionary gene-editing tool, allows precise modification of DNA sequences in living organisms, with immense potential for treating genetic diseases but also raising ethical concerns.",
      source: " CRISPR · Jennifer Doudna · Chapter 1",
      image: "/assets/hard/crispr.png",
    },
    {
      text: "The theory of plate tectonics explains the movement of Earth's lithosphere, driving continental drift, mountain building, and earthquakes, fundamentally altering our understanding of geology.",
      source: " Plate Tectonics · John Tuzo Wilson · Chapter 1",
      image: "/assets/hard/platetectonics.png",
    },
    {
      text: "In neuroscience, the connectome project aims to map the complete neural connections in the brain, offering insights into how structure relates to function and disorders like autism and depression.",
      source: " Connectome · Olaf Sporns · Chapter 1",
      image: "/assets/hard/connectome.png",
    },
    {
      text: "The concept of dark matter arises from observations that galaxies rotate faster than expected from visible mass, suggesting an invisible matter that interacts gravitationally but not electromagnetically.",
      source: " Dark Matter · Peter Fisher · Scientific American",
      image: "/assets/hard/darkmatter.png",
    },
    {
      text: "The mathematical field of topology studies the properties of space that remain invariant under continuous deformations, such as connectedness and holes, with applications in physics and engineering.",
      source: " Topology · John Stillwell · Chapter 1",
      image: "/assets/hard/topology.png",
    },
    {
      text: "The anthropogenic greenhouse effect is caused by emissions of carbon dioxide and other gases, trapping heat in the atmosphere and leading to global warming, with severe consequences for climate patterns.",
      source: " Climate Change · IPCC Report · Summary",
      image: "/assets/hard/climatechange.png",
    },
    {
      text: "In the realm of artificial intelligence, the Turing test measures a machine's ability to exhibit intelligent behavior equivalent to a human, a benchmark that has been debated since its inception.",
      source: " Computing Machinery and Intelligence · Alan Turing · 1950",
      image: "/assets/hard/computing-machinery-and-intelligence.png",
    },
    {
      text: "The study of quantum computing utilizes qubits that exist in superposition and can be entangled, enabling computations that would be infeasible on classical computers, promising breakthroughs in cryptography and simulations.",
      source: " Quantum Computation · Nielsen & Chuang · Chapter 1",
      image: "/assets/hard/quantumcomputing.png",
    },
    {
      text: "The concept of the multiverse arises from inflationary cosmology, suggesting that our universe is just one of many bubble universes with different physical constants, a controversial but intriguing idea.",
      source: " The Hidden Reality · Brian Greene · Chapter 1",
      image: "/assets/hard/multiverse.png",
    },
    {
      text: "In social psychology, the bystander effect describes how individuals are less likely to offer help in the presence of others, a phenomenon attributed to diffusion of responsibility and pluralistic ignorance.",
      source: " The Social Animal · Elliot Aronson · Chapter 3",
      image: "/assets/hard/bystandereffect.png",
    },
    {
      text: "The concept of memes, coined by Richard Dawkins, suggests that cultural ideas spread and evolve like genes, with memetic selection driving trends, languages, and beliefs in human populations.",
      source: " The Selfish Gene · Richard Dawkins · Chapter 11",
      image: "/assets/hard/memes.png",
    },
    {
      text: "The study of exoplanets, planets orbiting other stars, has advanced rapidly with missions like Kepler, revealing a diversity of worlds, including super-Earths and hot Jupiters, challenging our solar system model.",
      source: " Exoplanets · Andrew Liddle · Part 1",
      image: "/assets/hard/exoplanets-astronomy.png",
    },
    {
      text: "The concept of modularity in evolutionary biology suggests that organisms are composed of semi-independent modules that can evolve separately, allowing for innovation and adaptation without disrupting overall function.",
      source: " The Plausibility of Life · Kirschner & Gerhart · Chapter 1",
      image: "/assets/hard/modularity.png",
    },
    {
      text: "The Bayesian inference framework provides a rigorous way to update beliefs based on new evidence, with applications across science, from medicine to machine learning, formalizing rational decision-making.",
      source: " Bayesian Data Analysis · Gelman et al. · Chapter 1",
      image: "/assets/hard/bayesian.png",
    },
    {
      text: "The Great Oxidation Event, about 2.4 billion years ago, marked the rise of atmospheric oxygen due to cyanobacteria, fundamentally changing Earth's atmosphere and enabling the evolution of aerobic life.",
      source: " Oxygen · Nick Lane · Chapter 2",
      image: "/assets/hard/greatoxidation.png",
    },
    {
      text: "In behavioral economics, the concept of nudges suggests that subtle changes in choice architecture can influence behavior significantly, without removing options, used in public policy and marketing.",
      source: " Nudge · Thaler & Sunstein · Chapter 1",
      image: "/assets/hard/nudge.png",
    },
    {
      text: "The concept of asymptotic freedom in quantum chromodynamics explains that the strong force becomes weaker at high energy, allowing quarks to be quasi-free, a discovery that earned a Nobel prize.",
      source: " Quantum Field Theory · Peskin & Schroeder · Chapter 17",
      image: "/assets/hard/asymptoticfreedom.png",
    },
    {
      text: "The theory of punctuated equilibrium proposes that evolution proceeds in rapid bursts of change followed by long periods of stasis, contrasting with gradual Darwinian evolution, based on fossil record patterns.",
      source: " Punctuated Equilibrium · Gould & Eldredge · 1977",
      image: "/assets/hard/punctuatedequilibrium.png",
    },
    {
      text: "The concept of dark energy is invoked to explain the accelerating expansion of the universe, constituting about 70% of the cosmos, yet its nature remains one of the greatest mysteries in physics.",
      source: " Dark Energy · Sean Carroll · Scientific American",
      image: "/assets/hard/darkenergy.png",
    },
    {
      text: "The study of supercooled liquids and glasses reveals complex dynamics, with a dramatic slowdown of molecular motion near the glass transition, a topic of both fundamental and industrial importance.",
      source: " The Physics of Amorphous Materials · Zallen · Chapter 4",
      image: "/assets/hard/glasses.png",
    },
    {
      text: "The concept of the anthropic principle suggests that observations of the universe are biased by the necessity for our existence, potentially explaining the fine-tuning of physical constants for life.",
      source: " Anthropic Principle · Barrow & Tipler · Chapter 1",
      image: "/assets/hard/anthropic.png",
    },
  ],
  code: [
    // Existing 5 code snippets (no images)
    {
      text: "int bs(int a[],int n,int x){int l=0,r=n-1;while(l<=r){int m=(l+r)/2;if(a[m]==x)return m;else if(a[m]<x)l=m+1;else r=m-1;}return -1;}",
      source: " Binary Search",
    },
    {
      text: "void bubble(int a[],int n){for(int i=0;i<n;i++)for(int j=0;j<n-i-1;j++)if(a[j]>a[j+1]){int t=a[j];a[j]=a[j+1];a[j+1]=t;}}",
      source: " Bubble Sort",
    },
    {
      text: "int fact(int n){if(n<=1)return 1;return n*fact(n-1);} int main(){int x=5;printf(\"%d\",fact(x));}",
      source: " Factorial (Recursion)",
    },
    {
      text: "int fib(int n){if(n<=1)return n;int a=0,b=1,c;for(int i=2;i<=n;i++){c=a+b;a=b;b=c;}return b;}",
      source: " Fibonacci (Iterative)",
    },
    {
      text: "int lin(int a[],int n,int x){for(int i=0;i<n;i++)if(a[i]==x)return i;return -1;}",
      source: " Linear Search",
    },

    // --- 50 new Code snippets (Algorithms, up to ~100 characters) ---
    {
      text: "void merge(int a[],int l,int m,int r){int n1=m-l+1,n2=r-m;int L[n1],R[n2];for(int i=0;i<n1;i++)L[i]=a[l+i];for(int j=0;j<n2;j++)R[j]=a[m+1+j];int i=0,j=0,k=l;while(i<n1&&j<n2){if(L[i]<=R[j]){a[k]=L[i];i++;}else{a[k]=R[j];j++;}k++;}while(i<n1){a[k]=L[i];i++;k++;}while(j<n2){a[k]=R[j];j++;k++;}}",
      source: " Merge Sort (merge function)",
    },
    {
      text: "void quicksort(int a[],int low,int high){if(low<high){int pi=partition(a,low,high);quicksort(a,low,pi-1);quicksort(a,pi+1,high);}}",
      source: " Quick Sort (recursive)",
    },
    {
      text: "int gcd(int a,int b){if(b==0)return a;return gcd(b,a%b);} int lcm(int a,int b){return a/gcd(a,b)*b;}",
      source: " GCD and LCM",
    },
    {
      text: "char* strcpy(char* dest,const char* src){char* tmp=dest;while(*src){*dest++=*src++;}*dest='\\0';return tmp;}",
      source: " String copy (C)",
    },
    {
      text: "void heapify(int a[],int n,int i){int largest=i,l=2*i+1,r=2*i+2;if(l<n&&a[l]>a[largest])largest=l;if(r<n&&a[r]>a[largest])largest=r;if(largest!=i){swap(&a[i],&a[largest]);heapify(a,n,largest);}}",
      source: " Heapify (Max Heap)",
    },
    {
      text: "void insertion(int a[],int n){for(int i=1;i<n;i++){int key=a[i],j=i-1;while(j>=0&&a[j]>key){a[j+1]=a[j];j--;}a[j+1]=key;}}",
      source: " Insertion Sort",
    },
    {
      text: "int power(int base,int exp){int res=1;while(exp>0){if(exp&1)res*=base;base*=base;exp>>=1;}return res;}",
      source: " Fast exponentiation (iterative)",
    },
    {
      text: "int strcmp(const char*s1,const char*s2){while(*s1&&(*s1==*s2)){s1++;s2++;}return *(unsigned char*)s1-*(unsigned char*)s2;}",
      source: " String compare (C)",
    },
    {
      text: "void selection(int a[],int n){for(int i=0;i<n-1;i++){int min=i;for(int j=i+1;j<n;j++)if(a[j]<a[min])min=j;swap(&a[i],&a[min]);}}",
      source: " Selection Sort",
    },
    {
      text: "int add(int a,int b){while(b){int c=a&b;a=a^b;b=c<<1;}return a;}",
      source: " Addition using bitwise ops",
    },
    {
      text: "void bfs(int start,vector<int> adj[],int n){vector<bool> vis(n,false);queue<int>q;vis[start]=true;q.push(start);while(!q.empty()){int v=q.front();q.pop();for(int u:adj[v])if(!vis[u]){vis[u]=true;q.push(u);}}}",
      source: " Breadth-First Search (graph)",
    },
    {
      text: "void dfs(int v,vector<int> adj[],vector<bool>& vis){vis[v]=true;for(int u:adj[v])if(!vis[u])dfs(u,adj,vis);}",
      source: " Depth-First Search (recursive)",
    },
    {
      text: "int maxSubarraySum(int a[],int n){int max_so_far=a[0],max_ending_here=a[0];for(int i=1;i<n;i++){max_ending_here=max(a[i],max_ending_here+a[i]);max_so_far=max(max_so_far,max_ending_here);}return max_so_far;}",
      source: " Kadane's Algorithm (max subarray)",
    },
    {
      text: "int coinChange(int coins[],int m,int amount){int dp[amount+1];dp[0]=0;for(int i=1;i<=amount;i++){dp[i]=INT_MAX;for(int j=0;j<m;j++){if(coins[j]<=i&&dp[i-coins[j]]!=INT_MAX)dp[i]=min(dp[i],1+dp[i-coins[j]]);}}return dp[amount]==INT_MAX?-1:dp[amount];}",
      source: " Coin Change (min coins)",
    },
    {
      text: "int lis(int a[],int n){vector<int>tail;for(int i=0;i<n;i++){auto it=lower_bound(tail.begin(),tail.end(),a[i]);if(it==tail.end())tail.push_back(a[i]);else*it=a[i];}return tail.size();}",
      source: " Longest Increasing Subsequence (O(n log n))",
    },
    {
      text: "int knapsack(int W,int wt[],int val[],int n){int dp[n+1][W+1];for(int i=0;i<=n;i++){for(int w=0;w<=W;w++){if(i==0||w==0)dp[i][w]=0;else if(wt[i-1]<=w)dp[i][w]=max(val[i-1]+dp[i-1][w-wt[i-1]],dp[i-1][w]);elsedp[i][w]=dp[i-1][w];}}return dp[n][W];}",
      source: " 0/1 Knapsack (DP)",
    },
    {
      text: "bool isPrime(int n){if(n<=1)return false;for(int i=2;i*i<=n;i++)if(n%i==0)return false;return true;}",
      source: " Primality Test (naive)",
    },
    {
      text: "int maxHeap(int a[],int n){make_heap(a,a+n);return a[0];} void popHeap(int a[],int n){pop_heap(a,a+n);}",
      source: " Heap operations (C++ STL style)",
    },
    {
      text: "int partition(int a[],int low,int high){int pivot=a[high];int i=low-1;for(int j=low;j<high;j++){if(a[j]<=pivot){i++;swap(&a[i],&a[j]);}}swap(&a[i+1],&a[high]);return i+1;}",
      source: " Quick Sort partition",
    },
    {
      text: "int binarySearchFirst(int a[],int n,int x){int l=0,r=n-1,ans=-1;while(l<=r){int m=(l+r)/2;if(a[m]==x){ans=m;r=m-1;}else if(a[m]<x)l=m+1;else r=m-1;}return ans;}",
      source: " Binary Search (first occurrence)",
    },
    {
      text: "int binarySearchLast(int a[],int n,int x){int l=0,r=n-1,ans=-1;while(l<=r){int m=(l+r)/2;if(a[m]==x){ans=m;l=m+1;}else if(a[m]<x)l=m+1;else r=m-1;}return ans;}",
      source: " Binary Search (last occurrence)",
    },
    {
      text: "int countOnes(int n){int c=0;while(n){n=n&(n-1);c++;}return c;}",
      source: " Count set bits (Brian Kernighan)",
    },
    {
      text: "int reverseBits(int n){int r=0;for(int i=0;i<32;i++){r=(r<<1)|(n&1);n>>=1;}return r;}",
      source: " Reverse bits (32-bit)",
    },
    {
      text: "int strStr(char*haystack,char*needle){if(!*needle)return 0;for(int i=0;haystack[i];i++){int j=0;while(haystack[i+j]&&needle[j]&&haystack[i+j]==needle[j])j++;if(!needle[j])return i;}return -1;}",
      source: " Substring search (naive)",
    },
    {
      text: "int isPalindrome(char*s){int l=0,r=strlen(s)-1;while(l<r)if(s[l++]!=s[r--])return 0;return 1;}",
      source: " Check palindrome (string)",
    },
    {
      text: "void reverse(char*s){int l=0,r=strlen(s)-1;while(l<r){char t=s[l];s[l]=s[r];s[r]=t;l++;r--;}}",
      source: " Reverse string",
    },
    {
      text: "int atoi(char*s){int res=0;for(int i=0;s[i];i++){if(s[i]<'0'||s[i]>'9')return 0;res=res*10+s[i]-'0';}return res;}",
      source: " String to integer (atoi)",
    },
    {
      text: "void itoa(int n,char* s){int i=0;if(n==0){s[i++]='0';s[i]='\\0';return;}while(n){s[i++]=n%10+'0';n/=10;}reverse(s);s[i]='\\0';}",
      source: " Integer to string (itoa)",
    },
    {
      text: "int max(int a,int b){return a>b?a:b;} int min(int a,int b){return a<b?a:b;}",
      source: " Max and min functions",
    },
    {
      text: "void swap(int*a,int*b){int t=*a;*a=*b;*b=t;}",
      source: " Swap two integers",
    },
    {
      text: "int isPowerOfTwo(int n){return n&&!(n&(n-1));}",
      source: " Check power of two",
    },
    {
      text: "int multiply(int a,int b){int r=0;while(b){if(b&1)r+=a;a<<=1;b>>=1;}return r;}",
      source: " Multiply using bit shifting",
    },
    {
      text: "int sumDigits(int n){int s=0;while(n){s+=n%10;n/=10;}return s;}",
      source: " Sum of digits",
    },
    {
      text: "int reverseNumber(int n){int r=0;while(n){r=r*10+n%10;n/=10;}return r;}",
      source: " Reverse integer",
    },
    {
      text: "int factorialIter(int n){int res=1;for(int i=2;i<=n;i++)res*=i;return res;}",
      source: " Factorial (iterative)",
    },
    {
      text: "int fibRecur(int n){if(n<=1)return n;return fibRecur(n-1)+fibRecur(n-2);}",
      source: " Fibonacci (recursive)",
    },
    {
      text: "int gcdIter(int a,int b){while(b){int t=b;b=a%b;a=t;}return a;}",
      source: " GCD (iterative)",
    },
    {
      text: "int lcmIter(int a,int b){return a/gcdIter(a,b)*b;}",
      source: " LCM (using iterative gcd)",
    },
    {
      text: "int isEven(int n){return !(n&1);} int isOdd(int n){return n&1;}",
      source: " Even/Odd check",
    },
    {
      text: "int sqrtInt(int x){int l=0,r=x,ans=0;while(l<=r){int m=(l+r)/2;if(m*m<=x){ans=m;l=m+1;}else r=m-1;}return ans;}",
      source: " Integer square root (binary search)",
    },
    {
      text: "int powRecur(int b,int e){if(e==0)return 1;if(e&1)return b*powRecur(b,e-1);return powRecur(b*b,e/2);}",
      source: " Power (recursive, fast)",
    },
    {
      text: "int ceilDiv(int a,int b){return (a+b-1)/b;}",
      source: " Ceiling division",
    },
    {
      text: "int absVal(int n){return n<0?-n:n;}",
      source: " Absolute value",
    },
    {
      text: "int maxArray(int a[],int n){int m=a[0];for(int i=1;i<n;i++)if(a[i]>m)m=a[i];return m;}",
      source: " Max element in array",
    },
    {
      text: "int sumArray(int a[],int n){int s=0;for(int i=0;i<n;i++)s+=a[i];return s;}",
      source: " Sum of array",
    },
    {
      text: "int findMissing(int a[],int n){int total=(n+1)*(n+2)/2;for(int i=0;i<n;i++)total-=a[i];return total;}",
      source: " Find missing number (1..n+1)",
    },
    {
      text: "int majorityElement(int a[],int n){int c=0,el=0;for(int i=0;i<n;i++){if(c==0)el=a[i];c+=(a[i]==el)?1:-1;}return el;}",
      source: " Majority element (Boyer-Moore)",
    },
    {
      text: "int lengthOfLongestSubstring(char*s){int vis[256]={0},l=0,r=0,ans=0;while(s[r]){if(vis[s[r]]>0)l=max(l,vis[s[r]]);vis[s[r]]=r+1;ans=max(ans,r-l+1);r++;}return ans;}",
      source: " Longest substring without repeating chars",
    },
    {
      text: "int romanToInt(char*s){int vals[26];vals['I'-'A']=1;vals['V'-'A']=5;vals['X'-'A']=10;vals['L'-'A']=50;vals['C'-'A']=100;vals['D'-'A']=500;vals['M'-'A']=1000;int res=0;for(int i=0;s[i];i++){int v=vals[s[i]-'A'];if(i<strlen(s)-1&&v<vals[s[i+1]-'A'])res-=v;else res+=v;}return res;}",
      source: " Roman to integer",
    },
    {
      text: "int climbStairs(int n){int a=1,b=1;for(int i=2;i<=n;i++){int c=a+b;a=b;b=c;}return b;}",
      source: " Climbing stairs (Fibonacci)",
    },
    {
      text: "vector<vector<int>> generatePascal(int n){vector<vector<int>> res;for(int i=0;i<n;i++){res.push_back(vector<int>(i+1,1));for(int j=1;j<i;j++)res[i][j]=res[i-1][j-1]+res[i-1][j];}return res;}",
      source: " Pascal's Triangle generation",
    },
    {
      text: "int minPathSum(vector<vector<int>>& grid){int m=grid.size(),n=grid[0].size();for(int i=1;i<m;i++)grid[i][0]+=grid[i-1][0];for(int j=1;j<n;j++)grid[0][j]+=grid[0][j-1];for(int i=1;i<m;i++)for(int j=1;j<n;j++)grid[i][j]+=min(grid[i-1][j],grid[i][j-1]);return grid[m-1][n-1];}",
      source: " Minimum path sum (DP)",
    },
    {
      text: "int maxProfit(vector<int>& prices){int minPrice=INT_MAX,maxProfit=0;for(int p:prices){minPrice=min(minPrice,p);maxProfit=max(maxProfit,p-minPrice);}return maxProfit;}",
      source: " Best time to buy/sell stock (one transaction)",
    },
    {
      text: "bool isValidParentheses(string s){stack<char> st;for(char c:s){if(c=='('||c=='{'||c=='[')st.push(c);else{if(st.empty())return false;char top=st.top();st.pop();if(c==')'&&top!='(')return false;if(c=='}'&&top!='{')return false;if(c==']'&&top!='[')return false;}}return st.empty();}",
      source: " Valid parentheses (stack)",
    },
    {
      text: "vector<string> fizzBuzz(int n){vector<string> res;for(int i=1;i<=n;i++){string s;if(i%3==0)s+=\"Fizz\";if(i%5==0)s+=\"Buzz\";if(s.empty())s=to_string(i);res.push_back(s);}return res;}",
      source: " FizzBuzz",
    },
    {
      text: "int singleNumber(vector<int>& nums){int r=0;for(int n:nums)r^=n;return r;}",
      source: " Find single number (XOR)",
    },
    {
      text: "vector<int> twoSum(vector<int>& nums,int target){unordered_map<int,int> mp;for(int i=0;i<nums.size();i++){int comp=target-nums[i];if(mp.count(comp))return {mp[comp],i};mp[nums[i]]=i;}return {};}",
      source: " Two sum (hashmap)",
    },
  ],
};

export default PARAGRAPHS;