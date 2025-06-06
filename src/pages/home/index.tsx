import configs from '@/configs';

const Home = () => {
    return (
        <div>
            Home
            <a href={configs.routes.ticket} target="_blank">
                BT1
            </a>
            <a href="">BT2</a>
            <a href="">BT3</a>
        </div>
    );
};

export default Home;
