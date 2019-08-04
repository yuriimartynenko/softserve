<ul>
    {arrayOfMessageObjects.map(({ id, ...message }) => (
        <Message key={id} {...message} />
    ))}
</ul>

