let possibleWords
let currentTopWord
let currentBottomWord
let font
let pixelate

async function setup() {

    createCanvas(windowWidth, windowHeight, WEBGL)

    describe("After a red loading screen, pink text in the middle of a pink screen writing out a sentence from a programming-feelings-list")

    background("#FF3B0F")

    possibleWords = await loadFromURLIntoWords(
        "/assets/wordlist.txt"
    )

    font = await loadFont(
        'https://fonts.gstatic.com/s/epilogue/v17/O4ZRFGj5hxF0EhjimmIjuAkalnmd.ttf'
    )

    currentTopWord = random(possibleWords)
    currentBottomWord = random(possibleWords)

    pixelate = baseFilterShader().modify(() => {

        const numberOfBigPixels = uniformFloat(() => 100)

        const time = uniformFloat(() => frameCount / 150)

        getColor((inputs, canvasContent) => {

            const pixelSize = [numberOfBigPixels, numberOfBigPixels]

            const originalCoordinates = inputs.texCoord

            const wiggleAmount = [
                sin(4 * inputs.texCoord.y + time),
                sin(4 * inputs.texCoord.x + time)
            ]

            const modifiedCoordinates = floor(
                originalCoordinates * pixelSize + wiggleAmount
            ) / pixelSize

            const newColor = getTexture(canvasContent, modifiedCoordinates)
            return newColor
        })

    })
}

function draw() {
    background("#FEE8DD");

    textAlign(CENTER);
    fill("#FFA4E0");
    stroke("#FF3B0F");
    textFont(font);
    let baseSize = min(windowWidth, windowHeight) / 12;
    textSize(baseSize);

    let pacing = sin(frameCount / 300);
    textWeight(map(pacing, -1, 1, 100, 900));

    let yOffset = -windowHeight / 2 + 180;
    text(currentTopWord, 0, yOffset);
    text(currentBottomWord, 0, yOffset + 80);

    filter(pixelate);

    if (frameCount % 50 === 0) {
        currentTopWord = random(possibleWords);
        currentBottomWord = random(possibleWords);
    }
}



async function loadFromURLIntoWords(textSourceURL) {
    try {

        const fetchableURL = `https://api.allorigins.win/get?url=${encodeURIComponent(textSourceURL)}&nocache=${Date.now()}`
        const response = await fetch(fetchableURL)
        const sharedText = await response.text()
        const pageText = JSON.parse(sharedText).contents
        const cleanedText = pageText.replace(/\s+/g, ' ').trim()
        return cleanedText.split(' ')

    } catch {

        return ["learning + teaching",
            "resolving deltas",
            "softer",
            "serenity of the tabs",
            "nearly right but not quite",
            "building",
            "i surrender",
            "infinite lines of code",
            "you belong",
            "V●ᴥ●V",
            "missing semicolon on line 23",
            "community of my kind",
            "<head></head><body></body>",
            "yikes!",
            "now draw the rest of the 𐂅",
            "error!",
            "let it grow",
            "shared imagined context",
            "softer",
            "detached head state",
            "I ♡ laptop",
            "debigging with my mind",
            "energy drink goblin",
            "teach me",
            "compressing objects",
            "ego death",
            "why does it work?",
            "coding praxis",
            "never did this before",
            "softer",
            "٩(╬ʘ益ʘ╬)۶",
            "let me merge or i'll cry",
            "shhh! little treat is talking",
            "compiling, I hope",
            "snack overflow",
            "intersectional",
            "works on my machine",
            "no fucking thanks",
            "good at googling",
            "unbothered. moisturized. happy",
            "softer",
            "a computer can never find out",
            "I'm trying to grow",
            "index of indexes",
            "thinking about programming",
            "effort instead of result",
            "the why of it all",
            "[❃, ❊, ✲, ✿, ⚘]",
            "your cloud is drinking my river",
            "Enumerating objects",
            "strength in numbers",
            "wrong kind of cookie",
            "women in hypertext",
            "(｡╯︵╰｡)",
            "feeling unreal",
            "softer",
            "anthropocene post modernism",
            "cringe but free",
            "looping through a list",
            "machines of loving grace",
            "unlimited screen time",
            "ima heal this pattern",
            "compute cuter",
            "deeply embarassed",
            "whoami",
            "softer",
            "another world is possible",
            "when do i stop pretending",
            "mood poisoning",
            "feminism(s)",
            "⟢ are made under pressure",
            "ok, computer",
            "the problem isn't the problem",
            "( ˘⌣˘)♡(˘⌣˘ )",
            "everything already exists",
            "weaving a web",
            "information != knowledge",
            "how would you feel",
            "divine and unlimited powers",
            "vibe code feels",
            "⏾",
            "bless this mess",
            "thriving flourishing in my lane",
            "we need you here",
            "tech debt",
            "softer",
            "everything happens so much",
            "alive internet theory",
            "pink for feminism",
            "on my puter",
            "cyberspace is the place",
            "not good enough for imposter syndrome",
            "software gardening",
            "cyborg manifesto",
            "ཐི༏ཋྀ󠀮",
            "my job is internet",
            "we accept her, one of us",
            "call a friend",
            "what does it take to bloom",
            "no dumb question"]

    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}