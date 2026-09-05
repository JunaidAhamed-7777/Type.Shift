const PARAGRAPHS = {
  easy: [
	//ADD ONE SPACE AT BEGINNING OF SOURCE

    {
      text: "Once there were four children named Peter, Susan, Edmund, and Lucy who were sent away from London to live in a large old house full of rooms and long quiet hallways.",
      source: " The Lion, the Witch and the Wardrobe · C.S. Lewis · Chapter 1",
      image: "/assets/easy/lionwitchwardrobe.png",
    },
	
	//!!!!!! NOTE TO SELF: DO NOT FORGET THE COMMAS AFTER TEXT AND SOURCE ALSO !!!!!!
	
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
  ],
  medium: [
	{
		text: "It was the best of times, it was the worst of times, a period filled with hope and despair, where everything seemed possible yet uncertain, and the world moved forward in ways no one could fully understand.",
		source: " A Tale of Two Cities · Charles Dickens · Book 1, Chapter 1" ,
    image: "/assets/medium/taleoftwocities.png",
	},
	
	{
		text: "Call me Ishmael. Some years ago, never mind how long precisely, I found myself drawn to the sea, seeking a sense of purpose and adventure in a world that often felt too confined.",
		source: " Moby Dick · Herman Melville · Chapter 1" ,
    image: "/assets/medium/mobydick.png",

	},
	
	{
		text: "It is a truth universally acknowledged that a single man of fortune must be in want of a wife, though the feelings and views of such a man may be quite unknown to those around him.",
		source: " Pride and Prejudice · Jane Austen · Chapter 1" ,
    image: "/assets/medium/prideandprejudice.png",
	},
	
	{
		text: "The man in black fled across the desert, and the gunslinger followed, moving steadily under the burning sun, driven by a purpose that stretched far beyond the horizon.",
		source: " The Gunslinger · Stephen King · Chapter 1" ,
    image: "/assets/medium/gunslinger.png",
	},
	//comment to commit
	{
		text: "All we have to decide is what to do with the time that is given to us, for even the smallest choices can shape the path ahead and lead us toward courage or regret.",
		source: " The Fellowship of the Ring · J.R.R. Tolkien · Book 1" ,
    image: "/assets/medium/fellowshipofthering.png",
	},
  ],
  hard: [
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


  ],
  code: [
    //IMAGE SECTION NOT NEEDED FOR CODE it looks uglygi
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
	
  ],
};

export default PARAGRAPHS;