for config in typegen/*.json; do
    npx squid-substrate-typegen $config
done