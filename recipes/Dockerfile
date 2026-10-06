FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build

WORKDIR /src

COPY . .

RUN dotnet restore

RUN dotnet publish -c Release -o /app/publish


FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final

WORKDIR /app

COPY --from=build /app/publish .

RUN mkdir -p /app/data && chown -R app:app /app/data

EXPOSE 8080

USER app

ENTRYPOINT ["dotnet", "recipes.dll"]