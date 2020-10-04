import React from 'react';
import img1 from '../images/01.jpg';
import img2 from '../images/07.jpg';
import img3 from '../images/06.jpg';

const About = () => {
    return(
        <>
            <div className="pageTitle">
                <h1>About</h1>
            </div>
            <article className="about">
                <h2>
                    WHAT IS BUBBLE TEA?
                </h2>
                <p>
                    An incredibly unique looking beverage, Bubble tea is a Taiwanese recipe made by blending a tea base with milk, fruit and fruit juices, then adding the signature “bubbles” - yummy tapioca pearls that sit at the bottom.
                </p>
                <p>
                    These delicious fruit or tea infusions can be served either piping hot or iced cold, making a delicious and ever-so-quirky drink and snack. Bubble tea is served in transparent cups with a fat straw so that - as you sip - the tapioca balls (also known as “pearls” or “boba”) come shooting up it and can be chewed as you swallow down the delicious liquid. It’s called bubble tea both because of the tapioca balls, and the floating “bubbles” created by the vigorous shaking involved in its blending.
                </p>
                <img src={img1} alt=""></img>
                <h2>
                    WHO INVENTED BUBBLE TEA?
                </h2>
                <p>
                    There is no documented evidence about the invention of bubble tea, but as with many teas, there is a story around it! Rumour has it that the blend first appeared in Asia in the 1980s. Just visit Taiwan or Hong Kong and you can’t help but notice the unique bubble teashops on every corner. Taiwanese tea stands became very popular in the 1980s as a post-work pick me up and place to hang out. This created a certain competitive atmosphere in the tea market, and merchants started searching for and creating ever more inventive variations on their teas and beverages.
                </p>
                <img src={img2} alt=""></img>
                <p>
                    It is said that a teahouse called Chun Shui Tang in Taichung began serving Chinese tea cold – having adopted the idea from Japanese-style iced coffee. Just a few years later, Chun Shui’s product development manager, one Ms. Lin Hsiu Hui was bored at a staff meeting. On the spur of the moment, she decided to dump her Taiwanese dessert called fen yuan—a sweetened tapioca pudding—into her Assam iced tea and drink it. It was so good that they decided to add it to the menu, where it soon became the franchise’s top-selling product. Soon after seeing the success of this drink at one teahouse, concessions all over Taiwan started adding tapioca pearls and different fruit flavours to their iced teas, and so began bubble tea as we now know it!
                </p>
                <h2>
                    WHAT’S IT LIKE TO DRINK?
                </h2>
                <p>
                    Tapioca pearls, which sit at the bottom of the cup have a chewy consistency somewhere between jelly and chewing gum. You can get different flavoured pearls and they are usually black, but sometimes white or transparent, making the drink look rather similar to a passionfruit.
                </p>
                <h2>
                    WHAT DOES BUBBLE TEA TASTE LIKE?
                </h2>
                <p>
                    A sweet, cool refreshing and really delicious treat. It comes in as many flavours as there are teas and fruits, so you can pick and choose.
                </p>
                <img src={img3} alt=""></img>
                <h2>WHAT DOES IT LOOK LIKE?</h2>
                <p>
                    Served in a transparent cup to show off its bubbly qualities, bubble tea can be made in a wide range of ways. As well as using the aforementioned varieties of fruit infusions and teas, fresh fruits, crushed ice and milk are often features - a very fancy milkshake indeed. After popping all the ingredients together, it needs a thorough shake to blend it all together. James Bond would approve.
                </p>
            </article>

        </>
    )
}

export default About;