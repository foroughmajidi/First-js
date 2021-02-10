
function Comments() {
    this.records = [
        {
            id: '1',
            text: 'Great welcoming experience to the Dominican. We used Otium for the airport transport- we were to the resort in 20 minutes. Ralphy has been our concierge for the first half of the stay, he been very helpful- always able to pull through for anything we request',
            username: 'Jake W',
            imageurl: 'https://media-cdn.tripadvisor.com/media/photo-l/01/2e/70/9e/avatar069.jpg',
            date: 'January 2020',
            point: 11,
            liked: false
        },
        {
            id: '2',
            text: 'We travelled as a group of 13 ages 18 to 80 and this resort was enjoyed by all. We’ve been fortunate to travel to many resorts in Punta Cana but the Grand was by far the best',
            username: 'Andrea C',
            imageurl: 'https://media-cdn.tripadvisor.com/media/photo-l/01/2e/70/55/avatar028.jpg',
            date: 'Jan 2020',
            point: 14,
            liked: false

        },
        {
            id: '3',
            text: 'The Hotel opened 1-1,5 hs ago. Everything is new and very clean. Even the cheapest rooms are very spacious (77square meters and room and dinning area with sofa bed are diivided by a sliding door).',
            username: 'sergiogiaco',
            imageurl: 'https://media-cdn.tripadvisor.com/media/photo-l/01/2e/70/74/avatar056.jpg',
            date: 'Dec 2020',
            point: 11,
            liked: false

        }
    ];

    this.like = function (record) {


        const index = this.records.indexOf(record);
        if (this.records[index].liked == false) {
            this.records[index].liked = true;
            this.records[index].point++;
        }

    };


    this.dislike = function (record) {
        const index = this.records.indexOf(record);
        if (this.records[index].liked == true) {
            this.records[index].liked = false;
            this.records[index].point--;
        }


    };

    this.delete = function (record) {
        const index = this.records.indexOf(record);
        if (index !== -1) {
            this.records.splice(index, 1)
        }
    };

}

function ElementBuilder(tag) {
    this.element = document.createElement(tag);
    this.text = function (text) {
        this.element.innerText = text;
        return this;
    };



    this.setStyle = function (name, value) {
        this.element.style[name] = value;
        return this;
    };

    this.url = function (url) {
        this.element.src = url;
        return this;
    };


    this.appendTo = function (parent) {
        if (parent instanceof ElementBuilder) {
            parent.build().appendChild(this.element);
        } else {
            parent.appendChild(this.element);
        }

        return this;
    };

    this.build = function () {
        return this.element;
    };



    this.onclick = function (fn) {

        this.element.onclick = fn;
        return this;
    };


}

const builder = {
    create: function (tag) {
        return new ElementBuilder(tag)
    }
}

function Painter(container) {

    let comments = new Comments();
    this.container = container;

    function load() {
        root.innerHTML = "";
        const listContainer = builder
            .create('div')
            .setStyle('margin-top', '40px')
            .appendTo(root)
            .build();


        comments.records.forEach(record => {

            const box = builder
                .create('div')
                .setStyle('width', '700px')
                .setStyle('background-color', '#ece6f2')
                .setStyle('height', 'max-content')
                .setStyle('display', 'flex')
                .setStyle('position', 'relative')
                .setStyle('flex-direction', 'column')
                .setStyle('margin', '23px auto')
                .setStyle('box-shadow', '0px 7px 15px #aaaa9f')
                .setStyle('border-radius', '12px')
                .appendTo(listContainer)
                .build();

            const title = builder
                .create('div')
                .setStyle('width', 'inherit')
                .setStyle('height', '400')
                .setStyle('display', 'flex')
                .setStyle('flex-direction', 'row')
                .setStyle('margin', '10px 10px')
                .appendTo(box)
                .build();

            const text = builder
                .create('div')
                .setStyle('width', '95%')
                .setStyle('margin', '20px 10px')
                .setStyle('position', 'relative')
                .text(record.text)
                .appendTo(box)
                .build();


            const remove = builder
                .create('button')
                .setStyle('width', '14px')
                .setStyle('height', '14px')
                .setStyle('margin', '10px 10px')
                .setStyle('position', 'absolute')
                .setStyle('right', '12px')
                .setStyle('text-align', 'center')
                .setStyle('background-color', '#A1B5D8')
                .setStyle('border', 'none')
                .setStyle('padding', '0px 2px')
                .setStyle('cursor', 'pointer')
                .text('x')
                .appendTo(box)
                .onclick(() => {
                    comments.delete(record);
                    load();
                })

                .build();

            const date = builder
                .create('div')
                .setStyle('position', 'absolute')
                .setStyle('right', '-10px')
                .setStyle('bottom', '-14px')
                .setStyle('color', 'gray')
                .text(record.date)
                .appendTo(text)
                .build();



            const box_2 = builder
                .create('div')
                .setStyle('width', '50%')
                .setStyle('display', 'flex')
                .setStyle('flex-direction', 'row')
                .setStyle('line-height', '55px')
                .appendTo(title)
                .build();

            const imageBox = builder
                .create('div')
                .setStyle('margin', '0px 10px')
                .setStyle('line-height', '50px')
                .appendTo(box_2)
                .build();

            const image = builder
                .create('img')
                .url(record.imageurl)
                .setStyle('width', '50px')
                .setStyle('height', '50px')
                .setStyle('border-radius', ' 50%')
                .setStyle('line-height', '50px')
                .appendTo(imageBox)
                .build();

            const userName = builder
                .create('div')
                .setStyle('margin', '0px 20px')
                .setStyle('line-height', '50px')
                .text(record.username)
                .appendTo(box_2)
                .build();


            const box_3 = builder
                .create('div')
                .setStyle('display', 'flex')
                .setStyle('flex-direction', ' row')
                .setStyle('margin', '0px 0px')
                .setStyle('width', '45%')
                .setStyle('justify-content', 'flex-end')
                .setStyle('line-height', '55px')
                .appendTo(title)
                .build();


            const points = builder
                .create('div')
                .text(record.point)
                .appendTo(box_3)
                .build();

            const box_4 = builder
                .create('div')
                .setStyle('display', 'flex')
                .setStyle('flex-direction', ' row')
                .appendTo(box_3)
                .build();


            const like = builder
                .create('div')
                .text('👍')
                .setStyle('margin', '0px 0px')
                .setStyle('cursor', 'pointer')
                .onclick(() => {

                    comments.like(record);

                    load();
                })
                .appendTo(box_4);


            const dislike = builder
                .create('div')
                .text('👎')
                .setStyle('margin', '0px 0px')
                .setStyle('cursor', 'pointer')
                .onclick(() => {
                    comments.dislike(record);
                    load();
                })
                .appendTo(box_4);




        })

    }
    this.render = function () {

        load();

    }
}


const container = document.getElementById('root');
const app = new Painter(container);
app.render();