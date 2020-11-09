const postAlligner = (posts, user = false) => {
  const dictionary = {
    jan: 1,
    feb: 2,
    mar: 3,
    apr: 4,
    may: 5,
    jun: 6,
    jul: 7,
    aug: 8,
    sep: 9,
    oct: 10,
    nov: 11,
    dec: 12,
  };
  let activated;
  let i = 1;
  const initialInterest = [];
  const array = [];
  if (user == false) {
    posts.map((post) =>
      array.push(
        `${post.date.substring(11, 15)} +
            ${post.date.substring(5, 7)} +
            ${post.date.substring(9, 10)} +
            ${post.date.substring(17, 18)} +
            ${post.date.substring(20, 21)} +
            ${post.date.substring(23, 24)} +`
      )
    );
    array.sort(function (a, b) {
      return b - a;
    });
  }
  console.log(array);
};
postAlligner([
  {
    date: "Wed Sep 16 2020 06:59:19 GMT+0000 (UTC)",
    claps: "0",
    comments: [],
    likes: [
      "5f71fbcd34b90c44e608b573",
      "5f6869c5ca42ff0dec60dda8",
      "5f6867ffca42ff0dec60dda6",
    ],
    _id: "5f6868c3ca42ff0dec60dda7",
    imagePath:
      "https://s3.amazonaws.com/newhobbyfarms.com/wp-content/uploads/2009/02/18104250/better-barn_istock-thinkstock.jpg",
    name: "Ananya",
    userId: "5f6867ffca42ff0dec60dda6",
    subject: "Back to the saddle",
    blog:
      "Blinking in the dazzling sunshine that shone on her face, twenty-seven-year-old Nancy slowly got up from her straw bed and saw a familiar face standing in front of her. It was her friend, Kevin, from the village. He said, “Nancy, there is a horse taming competition taking place in the village today. He is the wildest horse from the forest. I thought you might wanna give it a try. You will be surprised by the reward.” “what’s the reward?” asked Nancy. “Well it is $5,000” replied Kevin. Shocked by the price she immediately went to her room got dressed and they both set off for the central square. She really needed the money. After her parent’s death she was left with nothing but a horse stable and a small farm. Thus, being brought up in the stable, taming horses came naturally to her.  Upon reaching central square, Nancy met her horse, Brownie. She thought Brownie, too, would easily come under her control as her favorite horse Peter. Only that she was wrong this time. She approached it and tried to gently strike it, but the horse geared up and finally charged towards her. in a few minutes, she was pinned to the ground.  She could hear the jeers of the crowd, as everybody thought the fight was over. She remembered her father’s words, “never let the beast see your fear. Even if you fall stand up again and put up your bravest fight.” These words ignited a new energy in her and she finally got up, and holding the reins of her horse, pulled him down and got to the saddle, establishing her win. This became the most memorable win of her life, and people remembered Nancy as NANCY-THE HORSE TAMER, for the years to come.",
    __v: 0,
  },
  {
    date: "Wed Sep 16 2020 06:59:19 GMT+0000 (UTC)",
    claps: "0",
    comments: [],
    likes: [
      "5f6867ffca42ff0dec60dda6",
      "5f6869c5ca42ff0dec60dda8",
      "5f71fbcd34b90c44e608b573",
    ],
    _id: "5f686b1fca42ff0dec60dda9",
    imagePath:
      "data:image/jpeg;base64,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",
    name: "Ananya",
    userId: "5f6867ffca42ff0dec60dda6",
    subject: "Covid 19",
    blog:
      "<p>“Onset of a new era of change, Where the world will gain immensely Where doctors will be soldiers at every step having a victory! Where every country will have an aim To get the corona vaccine” Coronavirus, a respiratory disease, started in China has taken the world by storm! However, it reminds us of “what goes around, comes around”. We exploited mother nature and it forced us to abysmally regret our misdeeds and go back to following our ancestor’s values. Lockdown, the only key, taught us lessons that education did not. “In life, things can always go wrong; So always keep your heart strong, carry on, and never give up hope - Anonymous Similarly, neither the doctors nor the people have lost hope. The doctors are saving lives at every step while people are spending quality time with their families. Dads who used to spend their whole day in the office are now in the kitchen while moms in the kitchen are the new technophiles’. Not only have people become hygiene-conscious, but they have also become more independent. The idle time is used playing chess and Ludo with opponents all across the globe and old games like dumb charades, cards, etc are endearingly revived. Health-conscious people are also engaging in making ayurvedic products at home with some help from webinars-n-seminars. India has gone digital, becoming one of the most tech-savvy countries. Be it education or having an office meeting, everything is online! People, who once fought with each other are now empathetic with each other. The many losses incurred by the pandemic have gains hidden in them. Not only have humans benefited but also the environment. Not only has India experienced a 40-50% drop in the pollution level, but the ozone layer is also healing. Scientists discovered that the largest hole in the ozone layer in the Arctic region is now closed. Marine life and land animals have averted extinction; rivers and oceans have cleaned up magically. We are closer to achieving the UN's Sustainable Development Goals. This virus has given the world the essence of a better future. Countries developed apps to test infected people near us. Technological advancements like employing drones and robots for sanitizing and cleaning the hospitals respectively is a major gain. Isolation decreased crimes like terrorism and illegal marketing. A positive mindset and strong immunity is the key to a Corona-free-world</p>",
    __v: 0,
  },
  {
    date: "Mon Nov 02 2020 16:30:20 GMT+0000 (UTC)",
    claps: "0",
    comments: [],
    likes: ["", "5f6869c5ca42ff0dec60dda8", "5f6867ffca42ff0dec60dda6"],
    _id: "5fa384bc67f1d215d632a204",
    imagePath:
      "https://images.squarespace-cdn.com/content/v1/5c34764c297114ca20d6777b/1570587850507-GEL1WFMD1GXWVBL04FZO/ke17ZwdGBToddI8pDm48kPqQfq0L3n3wpHIsRapTfg8UqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYxCRW4BPu10St3TBAUQYVKczo5Zn4xktlpMsMj-QlHXeMfNK6GwvtVkYEWiR8XAPyD3GfLCe_DXOSC_YcAacWL_/Swa19-H.jpg",
    userId: "5fa381ef67f1d215d632a203",
    name: "Gopika",
    subject: "Tarot magic",
    blog:
      "I firmly believe the universe is trying to reach all of us through different mediums. Tarot cards are my medium of receiving messages from the universe. I get advice, warnings, appreciations from my cards. My cards talk to me. Each time my understanding of my cards are getting better. I would love to help people around the world with guidance from my tarot cards. ",
    __v: 0,
  },
]);
